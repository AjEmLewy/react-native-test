import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import LoginPage from './components/LoginPage/main_LoginComponent';
// or any pure javascript modules available in npm

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginPage/>
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
