import * as React from 'react';
import {View, Dimensions, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';


import LoginPage from './components/LoginPage/main_LoginComponent';
import MainPage from './components/MainPage/mainPage';
import SpotkaniaPage from './components/SpotkaniaPage/spotkaniaPage'


export default class App extends React.Component {
  state = {
    animatorzy:[],
    myId:1
  }
  getAnimatoris = async () => {
    resp = await fetch("http://192.168.100.4:2000/animatorzy")
    respJson = await resp.json()
    this.setState({'animatorzy': respJson})
  }

  componentDidMount() {
    this.getAnimatoris()
  }

  render() {
    return (
      <View style={styles.container}>
        <SpotkaniaPage/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FFFFFF',
  }
});
