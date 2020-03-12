import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

import MyImage from './logo-component'
import FormComponent from './form-component'

export default class LoginPage extends React.Component{

    render() {
      return(
        <View style={styles.mainContainer}>
          <View style={styles.logoPart}>
            <MyImage/>
          </View>
          <View style={styles.formPart}>
            <FormComponent />
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
    justifyContent: 'center',
    alignContent: 'center',
    alignItems:'center',
    flex:5,
    backgroundColor: '#76B5EC',
  },
  formPart: {
    flex:10,
    alignItems:'center',
    backgroundColor: '#9ECBF1'
  },
  footerPart: {
    backgroundColor: '#76B5EC',
    flex:2
  }
})