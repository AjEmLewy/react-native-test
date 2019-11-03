import React from 'react'
import {View, ScrollView, Text, Dimensions, StyleSheet,TouchableOpacity} from 'react-native'

import {sort_spotkanie_by_date} from '../../utils'
import * as Font from 'expo-font';

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

export default class SpotkaniaPage extends React.Component
{
    animatorID=1
    state = {
        isDataFetched:false,
        isFontLoaded:false
    }
    getSpotkania = async () =>
    {
        resp = await fetch('http://192.168.100.4:2000/spotkania')
        this.spotkania = await resp.json()
        this.spotkania.sort(sort_spotkanie_by_date)
        this.setState({isDataFetched:true})
    }

    loadFont = async () =>
    {
        await Font.loadAsync({
            'vinchand':require('../../assets/fonts/vinchand.ttf')
        })
        this.setState({isFontLoaded:true})
    }

    componentDidMount()
    {
        this.getSpotkania()
        this.loadFont()
    }
    temp_spotkania = [{id: 1, title:"Bardzo długi tytuł w zasadzie",data:"2019-11-02"},
    {id: 2, title:"Bardzo długi tytuł w zasadzie",data:"2019-11-02"},
    {id: 3, title:"Bardzo długi tytuł w zasadzie",data:"2019-11-02"},
    {id: 4, title:"Bardzo długi tytuł w zasadzie",data:"2019-11-02"},
    {id: 5, title:"Bardzo długi tytuł w zasadzie",data:"2019-11-02"}]
    render() {
        return(
            this.state.isDataFetched && this.state.isFontLoaded? 
            <ScrollView>
            <View style={{flex:1, flexWrap: 'wrap', flexDirection:'row'}}>
            {this.temp_spotkania.map((spotkanie) =>
            <SpotkanieComponent key={spotkanie.id} title={spotkanie.title} date={spotkanie.data}/>
            )}
            </View></ScrollView>
            : 
            <Text>Poczekaj, dane są pobierane.</Text>
        )
    }
}

class SpotkanieComponent extends React.Component
{
    render()
    {
        return(
            <View style={{backgroundColor: '#00BCD4'}}>
                <TouchableOpacity 
                style= {styles.spotkanieButton}
                onPress = {() => console.log("xd")}
                >
                    <Text style={styles.dateText}> {this.props.date} </Text>
                    <Text style={styles.titleText}> {this.props.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    spotkanieButton: {
        width : windowWidth/2 - windowWidth/24,
        marginLeft: windowWidth/48,
        marginRight: windowWidth/48,
        height : windowHeight/6,
        backgroundColor: 'green',
        borderRadius: windowWidth/20,
        borderColor: 'gold',
        borderWidth: 2,
        alignItems:'center'
    },
    dateText:{
        fontFamily:"vinchand",
        fontSize:windowHeight*0.035,
        backgroundColor:"red"
    },
    titleText: {
        fontFamily: "vinchand",
        fontSize: windowHeight*0.035,
        textAlign: 'center'
    }
})