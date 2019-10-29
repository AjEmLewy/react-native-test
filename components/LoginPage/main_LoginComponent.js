import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NativeModulesProxy } from '@unimodules/core';

import MyImage from './logoComponent'
import FormComponent from './formComponent'

export default class LoginPage extends React.Component{
    render() {
      return(
        <View style={styles.mainContainer}>
          <View style={styles.logoPart}>
            <MyImage/>
          </View>
          <View style={styles.formPart}>
            <FormComponent/>
          </View>
          <View style={styles.footerPart}>
            <Text>Kopirajt baj mi</Text>
          </View>
        </View>
      )
    }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    backgroundColor: '#acdeaf',
    alignItems: 'stretch'
  },
  logoPart: {
    flex:5,
    backgroundColor: '#76B5EC',
  },
  formPart: {
    flex:10,
    backgroundColor: '#9ECBF1'
  },
  footerPart: {
    backgroundColor: '#76B5EC',
    flex:2
  }
})