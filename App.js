import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Dimensions, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './components/LoginPage/login-page';
import MainPage from './components/MainPage/main-page';
import SpotkaniaPage from './components/SpotkaniaPage/spotkania-page'
import ObecnoscPage from './components/ObecnoscPage/obecnosc-page'
import {AppContext} from "./contexts/app-context"

const Stack = createStackNavigator();

export default class App extends React.Component {

  
  logUser = (meh) => {
    this.setState({loggedUser:meh})
  }

  setEditting = (id, date, groupID, title) => {
    this.setState({editting: {spotkanieID:id,date:date,groupID:groupID,title:title}})
  }

  state = {
    loggedUserID: 1,
    logUser: this.logUser,
    editting: {
      spotkanieID: 1,
      date: "",
      groupID: 1,
      title:"ciekawe."
    }
  }

  // Zmień to i tak żeby Login był tylko jeśli userId=0.
  render() {
    return ( 
      this.state.loggedUserID ?
      <NavigationContainer>
        <AppContext.Provider value={this.state}>
          <Stack.Navigator initialRouteName="Obecnosc">
            <Stack.Screen name="Main" component={MainPage} />
            <Stack.Screen name="MyGroup" component={SpotkaniaPage} />
            <Stack.Screen name="Obecnosc" component={ObecnoscPage} />
          </Stack.Navigator>
        </AppContext.Provider>
      </NavigationContainer>
      :
      <LoginPage/>
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
