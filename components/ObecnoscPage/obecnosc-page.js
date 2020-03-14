import React, { Fragment } from 'react'
import {View, ScrollView, Text, Dimensions, StyleSheet,TouchableOpacity} from 'react-native'

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
            {id:4,name:"Grzegorz Piwowarczyk",animatorId:2,nieobecne:[1,2,3],odrobione:[4,5]}
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

    componentDidMount() {
        this.loadFont()
        this.fetchBierzmowancy()
    }

    render() {
        return (
            <View>
                <TitleComponent title={this.context.editting.title}/>
                <ScrollView>
                    <View style={styles.listContainer}>
                    {
                        this.state.bierzmowancy.map(bierzmowaniec =>
                        <BierzmowaniecTab 
                        spotkanie={this.context.editting.spotkanieID} 
                        bierzmowaniec={bierzmowaniec} key={bierzmowaniec.id}
                        />)
                    }
                    </View>
                </ScrollView>
            </View>
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
                    <Text>{this.props.bierzmowaniec.name}</Text>
                </View>
                <View style ={styles.buttonsContainer}>
                    <Button style={styles.obecnyButton} title={"obecny"}/>
                    <Button style={styles.odrobioneButton} title={"odrobione"}/>
                    <Button style={styles.nieobecnyButton} title={"nieobecny"}/>
                </View>
            </View>
        )
    }
}

class Button extends React.Component {
    render(){
        return(
            <TouchableOpacity style={this.props.style}>
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
        alignItems:"center"
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



    obecny: {
        backgroundColor: OBECNOSC_COLOR,
    },
    nieobecny: {
        backgroundColor: NIEOBECNOSC_COLOR,
    },
    odrobione: {
        backgroundColor: ODROBIONE_COLOR,
    },

    obecnyButton : {
        backgroundColor: OBECNOSC_COLOR,
        flex:1,
        borderTopRightRadius: windowWidth/20,
        alignContent:'center',
        alignItems:'center'
    },
    nieobecnyButton : {
        backgroundColor: NIEOBECNOSC_COLOR,
        flex:1,
        borderBottomRightRadius: windowWidth/20,
        alignContent:'center',
        alignItems:'center'
    },
    odrobioneButton : {
        backgroundColor: ODROBIONE_COLOR,
        flex:1,
        alignContent:'center',
        alignItems:'center'
    }
    })