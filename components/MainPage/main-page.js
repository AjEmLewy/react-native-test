import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import * as Font from 'expo-font';

const window = Dimensions.get('window')

export default class MainPage extends React.Component
{
    render() {
        return(
            <View style={{flex:0.5, }}>
                <TouchableOpacity onPress={() => this.context.logUser("sss")}><Text>PRESS THISSS</Text></TouchableOpacity>
                <Text>{this.context.loggedUser}</Text>
                <EditMyGroupComponent />
                <EditOtherGroup/>
                <StatisticsComponent/>
            </View>
        )
    }
}

class EditMyGroupComponent extends React.Component
{
    render() 
    {
        return(
            <MyButtonComponent title="Moja Grupa" onButtonPress={() => console.log('Moja Grupa')}/>
        )
    }
}


class EditOtherGroup extends React.Component
{
    render()
    {
        return(
            <MyButtonComponent title="Inne grupy" onButtonPress={()=> console.log("Pozostałe Grupy")}/>
        )
    }
}

class StatisticsComponent extends React.Component
{
    render()
    {
        return(
            <MyButtonComponent title="Statystyki" onButtonPress={()=>console.log("statistics")}/>
        )
    }
}



class MyButtonComponent extends React.Component
{
    state = {
        fontLoaded:false
    }

    async componentDidMount()
    {
        await Font.loadAsync({
            'vinchand':require('../../assets/fonts/vinchand.ttf')
        })
        this.setState({fontLoaded:true})
    }
    render()
    {
        return(
            this.state.fontLoaded?
            <TouchableOpacity 
            style={styles.myButton}
            onPress={this.props.onButtonPress}>
                <Text style={styles.buttonText}>{this.props.title}</Text>
            </TouchableOpacity> : null
        )
    }
}


const styles = StyleSheet.create({
    myButton:{
        height: window.height*0.1,
        backgroundColor:'#00bcd4',
        marginBottom:20,
        marginTop:20,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText:{
        fontSize:window.height*0.07,
        fontFamily:'vinchand'
    }
})