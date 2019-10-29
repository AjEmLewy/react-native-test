import React from 'react';
import { StyleSheet, Text,View } from 'react-native';
import {MyImage} from './LoginPageContainers'

export default function App() {
  return (
    <View style = {styles.container}>
      <MyImage />
      <Text> I just called to say I love you!</Text>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8DAEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
