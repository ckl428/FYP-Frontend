import React from 'react'
import { View, Text, Button, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export default function Register({ navigation }) {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status,setStatus] = useState('');

  const baseUrl = 'http://192.168.0.105:3000'
 
  const signIn = async () => {
    
    const url = baseUrl+'/api/user/register'
    await fetch(url,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        name:name,
        email:email,
        password:password
      })
    }
    )
    .then((response) => response.text())
    .then((responseText) => { 
      alert(responseText);
      if(responseText=='Register success')
      navigation.goBack();})
    .catch((error) => { console.warn(error); });
  }
  return (

    <ScrollView style={[localStyles.container]}>
        <Text style={[localStyles.header]}>Create Your Account</Text>
        <View style={[localStyles.secondContainer]}>
        <SafeAreaView >
          <TextInput style={[localStyles.input]} placeholder="Name"
            onChangeText={name => setName(name)} defaultValue={name}
            placeholderTextColor="#b3cddf"
          >
          </TextInput>
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
        <TouchableOpacity onPress={() => signIn()} style={localStyles.button}>
        <Text style={localStyles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.button}>
        <Text style={localStyles.buttonText}>Back to Login</Text>
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




