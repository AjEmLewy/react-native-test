import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NativeModulesProxy } from '@unimodules/core';

export default class MyLogo extends React.Component{
    render() {
        let im_source = require('../../assets/logo.jpg')
        return (<Image source = {im_source} style ={styles.logo}/>)
    }
}


const styles = StyleSheet.create({
  logo: {
    margin:'auto',
    width: 64,
    height: 64,
  }
})