import React from 'react';
import { StyleSheet, Text, View, Image, Picker, TextInput } from 'react-native';

export default class FormComponent extends React.Component
{
  render(){
    return (
      <View style={styles.mainContainer}>
        <PickerComponent/>
        <Text style={styles.text}>Password:</Text>
        <InputPassword/>
      </View>
    )
  }
}

class PickerComponent extends React.Component
{
  state = {
    animator:'Maciej'
  }

  valueChanged = (itemValue, itemPosition) => {
    this.setState({animator:itemValue})
  }

  render() { 
     return (
      <Picker 
        selectedValue={this.state.animator}
        style={styles.picker}
        onValueChange={this.valueChanged}
      >
      <Picker.Item label='Lukas' value='luki'/>
      <Picker.Item label='Maciej' value='Maciej'/>

       </Picker>
     )
  }
}

class InputPassword extends React.Component
{
  state= {
    password:''
  }

  render() {
    return (<TextInput
    secureTextEntry
    autoCompleteType={'off'}
    onSubmitEditing=(nativeEvent) =>{console.log(nativeEvent.text)}
    style={styles.inputText}
    />)
  }

}


const styles = StyleSheet.create({
  mainContainer: {
    flex:0.5,
    flexDirection:'column',
    margin:'auto',
    justifyContent: 'space-evenly',
    
  },
  picker: {
    textAlign:'center',
    width:170,
    height:25
  },
  text: {
    textAlign:'center'
  },
  inputText: {
    backgroundColor:'white',
    borderWidth:2,
    borderColor: 'black',
    width:170,
    height:30,
    textAlign:'center',
    type: 'password'
  }
})