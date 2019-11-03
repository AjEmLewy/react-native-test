import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

import MyImage from './logoComponent'
import FormComponent from './formComponent'

export default class LoginPage extends React.Component{
    state = {
      anim_id:{},
      password:''
    }

    onPasswordTextChange = (text) =>
    {
      this.setState({password:text})
    }

    render() {
      return(
        <View style={styles.mainContainer}>
          <View style={styles.logoPart}>
            <MyImage/>
          </View>
          <View style={styles.formPart}>
            <FormComponent animatorzy = {this.props.animatorzy} onChangeText={this.onPasswordTextChange}/>
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