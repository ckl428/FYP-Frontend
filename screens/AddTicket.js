import React from 'react'
import { View, Text, StyleSheet,ScrollView,SafeAreaView,TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';


export default function AddTicket({ navigation }) {
  const [ticketName,setTicketName] = useState('');
  const [ticketPrice,setTicketPrice] = useState('');
  const baseUrl = Platform.OS === 'android' ? 'http://192.168.0.105:3000' : 'http://localhost:3000';
  const addTicket = async () => {
    
    const url = baseUrl+'/api/ticket/addTicket'
    await fetch(url,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        name:ticketName,
        price:ticketPrice
      })
    }
    )
    .then((response) => response.text())
    .then((responseText) => { 
      alert(responseText);
      if(responseText=='Add Ticket Success')
      navigation.navigate("Home");})
    .catch((error) => { console.warn(error); });
  }

    return (
      <ScrollView style={[localStyles.container]}>
      <Text style={[localStyles.header]}>Add new Ticket</Text>
      <View style={[localStyles.secondContainer]}>
      <SafeAreaView >
        <TextInput style={[localStyles.input]} placeholder="Ticket Name"
          onChangeText={ticketName => setTicketName(ticketName)} defaultValue={ticketName}
          placeholderTextColor="#b3cddf"
        >
        </TextInput>
        <TextInput style={[localStyles.input]} placeholder="Ticket Price"
          onChangeText={ticketPrice => setTicketPrice(ticketPrice)} defaultValue={ticketPrice}
          placeholderTextColor="#b3cddf"
        >
        </TextInput>
        
      </SafeAreaView>
    
      <TouchableOpacity onPress={() => addTicket()} style={localStyles.button}>
      <Text style={localStyles.buttonText}>Add</Text>
        </TouchableOpacity>
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
  