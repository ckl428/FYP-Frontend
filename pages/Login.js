import * as React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { registerRootComponent } from 'expo';
import { Platform, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Login({ navigation }) {
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const baseUrl = Platform.OS === 'android' ? 'http://192.168.0.105:3000' : 'http://localhost:3000';
 
  const login = async () => {
    const url = baseUrl+'/api/user/login'
    await fetch(url,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        email:email,
        password:password
      })
    }).then((response) => response.text())
    .then((responseText) => { 
      
      //console.log(JSON.parse(responseText))
      //let user = JSON.parse(responseText)
        //alert('Login success')
        //let user = JSON.stringify(response.text)

    if(responseText == '"email" is not allowed to be empty'){
      alert(responseText)
      return
    }
    if(responseText == '"email" length must be at least 6 characters long'){
      alert(responseText)
      return
    }
    if(responseText == '"email" must be a valid email'){
      alert(responseText)
      return
    }
    if(responseText == '"password" length must be at least 6 characters long'){
      alert(responseText)
      return
    }
    if(responseText == 'No such user'){
      alert(responseText)
      return
    }
    if(responseText == 'Invalid password'){
      alert(responseText)
      return
    }
    else{
      alert(responseText)
      let user = JSON.parse(responseText)
      AsyncStorage.setItem('userName',user.name)
      alert('Login success '+ user.name)
      navigation.navigate('Intro')
    }
    })
    .catch((error) => { console.warn(error); });
  }
  
  const goRegister = () =>{
    setEmail('');
    setPassword('');
    navigation.navigate('Register')
  }

  return (

    <ScrollView style={[localStyles.container]}>
        <Text style={[localStyles.header]}>Ticket Booking System</Text>
        <View style={[localStyles.secondContainer]}>
        <SafeAreaView >

        <TextInput style={[localStyles.input]} placeholder="Email"
            onChangeText={email => setEmail(email)} defaultValue={email}
            placeholderTextColor="#b3cddf"
        >
          </TextInput>
          <TextInput secureTextEntry style={[localStyles.input]} placeholder="Password"
            onChangeText={password => setPassword(password)} defaultValue={password}
            placeholderTextColor="#b3cddf" >
          </TextInput>
        </SafeAreaView>
        <TouchableOpacity onPress={() => goRegister()} style={localStyles.button}>
        <Text style={localStyles.buttonText}>Go to Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => login()} style={localStyles.button}>
        <Text style={localStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Intro')} style={localStyles.button}>
        <Text style={localStyles.buttonText}>Test</Text>
        </TouchableOpacity>
        </View>

    </ScrollView>
  )
}
const localStyles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#ECF0F1',
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    margin: '10%',
    marginTop: '15%',
    color: '#145f95',
    fontWeight: 'bold'
  },
  title: {
    color: '#145F95',
    textAlign: 'center',
    margin: '10%',
    fontSize: 24,
    fontWeight: 'bold',
  },
  secondContainer: {
    backgroundColor: '#FFFFFF',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
    padding: '5%',
  },
  input: {
    fontSize: 24,
    marginBottom: '5%',
    borderWidth: 1,
    borderColor: '#b3cddf',
    padding: '5%',
  },
  create: {
    backgroundColor: "#fff",
    margin: '5%',
  },
  createText: {
    fontSize: 24,
    color: '#145f95',
    textAlign: 'center',
  },
  button: {
    backgroundColor: "#145F95",
    padding: 20,
    borderRadius: 5,
    margin: '5%',
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center'
  },
});

export default Login

