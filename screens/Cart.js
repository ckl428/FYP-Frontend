import React from 'react'
import { View, Text, StyleSheet,ScrollView,SafeAreaView,TextInput, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart({ navigation,route }) {
  const [ticketName,setTicketName] = useState('');
  const [user,setUser] = useState('')
  const [userId,setUserId] = useState('')
  const [role,setRole] = useState('')

  
  const getUserInfo = async () =>{
    await AsyncStorage.getItem('userName').then((value)=>{
        setUser(value)
    })
    await AsyncStorage.getItem('userId').then((value)=>{
        setUserId(value)
    })
    await AsyncStorage.getItem('role').then((value)=>{
      setRole(value)
  })
}
 useEffect(() => {
        getUserInfo()

 }, []);
 
  

  

 

  
  
    return (
      <ScrollView style={[localStyles.container]}>
      
      <Text style={[localStyles.header]}>Shopping Cart</Text>
      <View style={[localStyles.secondContainer]}>
      
      
      <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.button}>
        <Text style={localStyles.buttonText}>Back</Text>
      </TouchableOpacity>
      
      </View>

  </ScrollView>

        
      );
  }

  
  const localStyles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: '#ECF0F1',
    },
    text:{
        fontSize:24,
        color:'#14956f'
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
      padding: 10,
      borderRadius: 5,
      margin: '5%',
    },
    buttonText: {
      fontSize: 24,
      color: '#fff',
      textAlign: 'center'
    },
  });