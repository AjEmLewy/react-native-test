import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Dimensions, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './components/LoginPage/login-page';
import MainPage from './components/MainPage/main-page';
import SpotkaniaPage from './components/SpotkaniaPage/spotkania-page'
import {UserContext} from "./contexts/user-context"

const Stack = createStackNavigator();

export default class App extends React.Component {

  
  logUser = (meh) => {
    this.setState({loggedUser:meh})
  }

  state = {
    loggedUser: 0,
    logUser: this.logUser
  }

  // Zmień to i tak żeby Login był tylko jeśli userId=0.
  render() {
    return ( 
      this.state.loggedUser ?
      <NavigationContainer>
        <UserContext.Provider value={this.state}>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainPage} />
          </Stack.Navigator>
        </UserContext.Provider>
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
