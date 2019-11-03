import React from 'react';
import { StyleSheet, Text, View, Picker, TextInput, Button } from 'react-native';

export default class FormComponent extends React.Component
{
  state = {
    animator: '',
    password: '',
    buttonTitle: 'Logee in'
  }

  onLogIn = () => 
  {
    this.setState({buttonTitle:'ss'})
  }
  render(){
    return (
      this.props.animatorzy.length > 0?
      <View style={styles.mainContainer}>
        <PickerComponent animatorzy = {this.props.animatorzy}/>
        <View style={{flex:1}}>
          <InputPassword onChangeText = {this.props.onChangeText}/>
        </View>
        <ButtonComponent title = {this.state.buttonTitle} onPressLogin = {this.onLogIn}/>
      </View>
      : <Text>Waiting for data. Check internet connection.</Text>
    )
  }
}

class PickerComponent extends React.Component
{
  state = {
    animator:this.props.animatorzy.length>0? this.props.animatorzy[1].id : null 
  }

  valueChanged = (itemValue, itemPosition) => {
    this.setState({animator:itemValue})
  }

  render() { 
     return (
     <View style={{flex:1, justifyContent: 'center',
     alignContent: 'center',
     alignItems:'center'}}>
        <Picker 
        selectedValue={this.state.animator}
        style={styles.picker}
        onValueChange={this.valueChanged} 
        >
          {this.props.animatorzy.map( (anim) => 
             <Picker.Item key={anim.id} label={anim.imie} value={anim.id}/>
          )}
        </Picker>
      </View>
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
    onSubmitEditing={(nativeEvent) =>{console.log(nativeEvent.text)}}
    onChangeText = {this.props.onChangeText}
    style={styles.inputText}
    />)
  }
}

class ButtonComponent extends React.Component {
  render(){
    return(
      <Button title={this.props.title} onPress = {this.props.onPressLogin}/>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex:1,
    flexDirection:'column',
  },
  picker: {
    textAlign:'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems:'center',
    alignSelf: 'center',
    width:170,
    height:25,
    backgroundColor: 'white'
  },
  inputText: {
    backgroundColor:'white',
    borderWidth:2,
    borderColor: 'black',
    width:170,
    height:30,
    textAlign:'center',
  }
})