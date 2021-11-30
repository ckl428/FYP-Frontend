import React from 'react'
import { View, Text, StyleSheet,ScrollView,SafeAreaView,TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';


export default function Setting({ navigation }) {
  const [ticketName,setTicketName] = useState('');

    return (
      <ScrollView style={[localStyles.container]}>
      <Text style={[localStyles.header]}>CRUD PAGE(Test)</Text>
      <View style={[localStyles.secondContainer]}>
     
      <TouchableOpacity onPress={() => navigation.navigate('AddTicket')} style={localStyles.button}>
      <Text style={localStyles.buttonText}>Add Ticket</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={localStyles.button}>
      <Text style={localStyles.buttonText}>Logout</Text>
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
  