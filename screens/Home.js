import React from 'react'
import { View, Text, StyleSheet,FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';









export default function Home({ navigation }) {
  const baseUrl = Platform.OS === 'android' ? 'http://192.168.0.105:3000' : 'http://localhost:3000';
  const [name,setName] = useState('');

 

    useEffect(() => {
      fetchTicket()
    }, []);
  
  const fetchTicket = () =>{
    fetch(baseUrl+'/api/ticket/getTicket')
        .then((response) => response.json())
        .then((json) => setName(json))
        .catch((error) => console.error(error))
        .finally(() => console.log('Name data'));
  }
  
    
  
    return (
        <View style={{justifyContent:'center', alignItems:'center', marginTop:'50%' }}>
          <Text style={localStyles.text}>All Flight Tickets</Text>
              <FlatList
                data={name}
                keyExtractor={({ id ,index}) => id}
                renderItem={({ item }) => (
                <Text style={localStyles.contents}>Ticket: {item.name}, Price: {item.price}</Text>
                )}
              />
        </View>
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
    contents:{
      fontSize:24,
        color:'#ff0095'
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
  