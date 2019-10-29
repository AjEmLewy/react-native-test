import React from 'react';
import { StyleSheet, Text,View, Image } from 'react-native';
import { NativeModulesProxy } from '@unimodules/core';

class MyImage extends React.Component{
    render() {
        let im_source = require('./assets/logo.jpg')
        return (<Image source = {im_source} style ={{width:64, height:64}}/>)
    }
}

module.exports = {MyImage}