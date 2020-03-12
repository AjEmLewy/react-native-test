import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Dimensions, StyleSheet, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';

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
      <NavigationContainer>
        <View style={styles.container}>
          <SpotkaniaPage/>
        </View>
      </NavigationContainer>
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
