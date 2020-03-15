import React, { Fragment } from 'react'
import {View, ScrollView, Text, Dimensions, StyleSheet,TouchableOpacity} from 'react-native'
const _ = require("lodash")

import {sort_spotkanie_by_date} from '../../utils'
import * as Font from 'expo-font';
import { AppContext } from '../../contexts/app-context';

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const OBECNOSC_COLOR = 'green'
const ODROBIONE_COLOR = 'yellow'
const NIEOBECNOSC_COLOR = 'grey'

export default class ObecnoscPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bierzmowancy: [],
            isDataFetched: false,
            isFontLoaded: false
        }
    }

    fetchBierzmowancy = () => {
        this.setState({bierzmowancy:[
            {id:1,name:"Grzegorz Piwowarczyk",animatorId:2,nieobecne:[2,3],odrobione:[1,4,5]},
            {id:2,name:"Grzegorz Piwowarczyk",animatorId:2,nieobecne:[1,2,3],odrobione:[4,5]},
            {id:3,name:"Grzegorz Piwowarczyk",animatorId:2,nieobecne:[2,3],odrobione:[4,5]},
            {id:4,name:"Grzegorz Piwowarczyk",animatorId:2,nieobecne:[1,2,3],odrobione:[4,5]},
            {id:5,name:"Grzegorz Piwowarczyk",animatorId:2,nieobecne:[1,2,3],odrobione:[4,5]},
            {id:6,name:"Grzegorz Piwowarczyk",animatorId:2,nieobecne:[2,3],odrobione:[4,5]},
            {id:7,name:"Grzegorz Piwowarczyk",animatorId:2,nieobecne:[1,2,3],odrobione:[4,5]}
        ]})
        this.setState({isDataFetched:true})
    }

    loadFont = async () =>
    {
        await Font.loadAsync({
            'vinchand':require('../../assets/fonts/vinchand.ttf')
        })
        this.setState({isFontLoaded:true})
    }

    changeObecnosc = async (bierzmowaniecId, switchType) => {
        let valueChanged = false
        let spotkanie = this.context.editting.spotkanieID
        let newBierzmowancy = _.cloneDeep(this.state.bierzmowancy)
        //console.log(newBierzmowancy)
        newBierzmowancy.forEach((b, index) => {
            if (bierzmowaniecId === b.id) {
                switch (switchType) {
                    case 'obecny':
                        console.log("w obecny.")
                        console.log(spotkanie)
                        console.log(b.odrobione.includes(spotkanie))
                        if (b.nieobecne.includes(spotkanie) || b.odrobione.includes(spotkanie)) {
                            console.log("dalej")
                            _.pull(newBierzmowancy[index].nieobecne,spotkanie)
                            _.pull(newBierzmowancy[index].odrobione,spotkanie)
                            valueChanged = true
                        }
                        break;
                    case 'odrobione':
                        if (!b.odrobione.includes(spotkanie)) {
                            _.pull(newBierzmowancy[index].nieobecne,spotkanie)
                            newBierzmowancy[index].odrobione.push(spotkanie)
                            //newBierzmowancy[index].odrobione = _.sortBy(newBierzmowancy.odrobione)
                            valueChanged = true
                        }
                        break;
                    case 'nieobecny':
                        if(!b.nieobecne.includes(spotkanie)) {
                            _.pull(newBierzmowancy[index].odrobione,spotkanie)
                            newBierzmowancy[index].nieobecne.push(spotkanie)
                            //newBierzmowancy[index].nieobecne = _.sortBy(newBierzmowancy.nieobecne)
                            valueChanged = true
                        }
                        break;
                
                    default:
                        break;
                }
            }
        });
        if(valueChanged) {
            this.setState({bierzmowancy:newBierzmowancy})
        }
    } 

    componentDidMount() {
        this.loadFont()
        this.fetchBierzmowancy()
    }

    render() {
        return (
            this.state.isFontLoaded && this.state.isDataFetched ?
            <View>
                <TitleComponent title={this.context.editting.title}/>
                <ScrollView>
                    <View style={styles.listContainer}>
                    {
                        this.state.bierzmowancy.map(bierzmowaniec =>
                        <BierzmowaniecTab 
                        spotkanie={this.context.editting.spotkanieID}
                        press = {this.changeObecnosc} 
                        bierzmowaniec={bierzmowaniec} key={bierzmowaniec.id}
                        />)
                    }
                    </View>
                </ScrollView>
            </View>
            :
            <Text>Lołding....</Text>
        )
    }
}
ObecnoscPage.contextType = AppContext;


class TitleComponent extends React.Component {

    render() {
        return(
            <Text>{this.props.title}</Text>
        )
    }
}

class BierzmowaniecTab extends React.Component {
    constructor(props) {
        super(props)
        this.obecnosc ='obecny'
    }

    shouldComponentUpdate(nextProps){
        //TODO: implement it. using lodash maybe
        return true
    }

    getObecnosc = () => {
        if (this.props.bierzmowaniec.nieobecne.includes(this.props.spotkanie))
            this.obecnosc = 'nieobecny'
        else if (this.props.bierzmowaniec.odrobione.includes(this.props.spotkanie))
            this.obecnosc = 'odrobione'
        else 
            this.obecnosc = 'obecny'
    }

    render() {
        this.getObecnosc()
        return (
            <View style = {[styles.bierzmowaniecContainer, styles[this.obecnosc]]}>
                <View style = {styles.nazwiskoTextContainer}>
                    <Text style={styles.vText}>{this.props.bierzmowaniec.name}</Text>
                </View>
                <View style ={styles.buttonsContainer}>
                    <Button style={[styles.obecnyButton, styles.button]} id={this.props.bierzmowaniec.id} 
                        press = {this.props.press} title={"obecny"}/>
                    <Button style={[styles.odrobioneButton, styles.button]} id={this.props.bierzmowaniec.id}
                        press = {this.props.press} title={"odrobione"}/>
                    <Button style={[styles.nieobecnyButton, styles.button]} id={this.props.bierzmowaniec.id} 
                        press = {this.props.press} title={"nieobecny"}/>
                </View>
            </View>
        )
    }
}

class Button extends React.Component {


    render(){
        return(
            <TouchableOpacity 
            onPress = {() => {this.props.press(this.props.id, this.props.title)}}
            style={this.props.style}>
                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        )
        
    }
}

const styles = StyleSheet.create({
    listContainer: {
        display:"flex",
        flex:1,
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent:"flex-start",
        alignItems:"center",
        backgroundColor: '#76B5EC'
    },
    bierzmowaniecContainer: {
        borderColor: 'gold',
        borderRadius: windowWidth/20,
        borderWidth: 2,
        marginTop: windowHeight/48,
        marginBottom: windowHeight/48,
        width: windowWidth * 0.9,
        height: windowHeight * 0.15,
        display: 'flex',
        flexDirection:'row'
    },
    nazwiskoTextContainer:{
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonsContainer:{
        flex:1,
        flexDirection:'column',
        alignItems:"stretch",
        alignContent:"stretch",
    },

    vText: {
        fontSize:windowHeight*0.04,
        fontFamily:'vinchand'
    },

    obecny: {
        backgroundColor: OBECNOSC_COLOR,
    },
    nieobecny: {
        backgroundColor: NIEOBECNOSC_COLOR,
    },
    odrobione: {
        backgroundColor: ODROBIONE_COLOR,
    },
    button : {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        flex:1,
        alignContent:'center',
        alignItems:'center',
        marginBottom:2,
        marginTop: 2
    },
    obecnyButton : {
        backgroundColor: OBECNOSC_COLOR,
        borderTopRightRadius: windowWidth/20,
    },
    nieobecnyButton : {
        backgroundColor: NIEOBECNOSC_COLOR,
        borderBottomRightRadius: windowWidth/20,
    },
    odrobioneButton : {
        backgroundColor: ODROBIONE_COLOR,
    }
    })