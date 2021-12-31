import React from 'react'
import { View, Text, StyleSheet,FlatList,ScrollView,Image, Alert,Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import { useRoute,useNavigation } from '@react-navigation/native';
import Card from '../layout/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker'

export default function Detail({ route,navigation }) {
    const baseUrl = Platform.OS === 'android' ? 'http://192.168.0.105:3000' : 'http://localhost:3000';
    const [user,setUser] = useState('')
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const fetchTicket = () =>{
      fetch(baseUrl+'/api/ticket/getTicket')
          .then((response) => response.json())
          .then((json) => console.log(''))
          .catch((error) => console.error(error))
          .finally(() => console.log('Name data'));
    }
    
    useEffect(() => {
        AsyncStorage.getItem('userName').then((value)=>{
            setUser(value)
            console.log('saved user', user)
          })
        fetchTicket()
      }, []);
    const { _id,name,price,start,dest,company,image,quota} = route.params;
    //console.log('image', image)

    const orderTicket = () =>{
       if(user)
       alert('Order success')
       else
       alert('Login first')
    }
    
    return (
       
        <View style={{flex:1, backgroundColor:'#fff', padding: 20, marginVertical: 50,marginHorizontal: 16, }}>
            <Text style={localStyles.text}>Details Screen</Text>
            <Card>
              <Image
                  style={localStyles.image}
                  source={{
                  uri: image,
                  }}
            />
              <Text style = {localStyles.contents}>Name: {name}</Text>
              <Text style = {localStyles.contents}>Price: {price}</Text>
              <Text style = {localStyles.contents}>Start Airport: {start}</Text>
              <Text style = {localStyles.contents}>Destination Airport: {dest}</Text>
              <Text style = {localStyles.contents}>Flight Company: {company}</Text>
              <Text style = {localStyles.contents}>Quota: {quota}</Text>
            </Card>
      
            <TouchableOpacity onPress={() => Alert.alert("Confirmation","Confirm order this ticket?",
            [
                { text: "Yes", onPress: () => orderTicket() },
                { text: "No",onPress: () => alert("Order canceled"), style: "cancel"}
                
            ]
    )} style={localStyles.button}>
                <Text style={localStyles.buttonText}>Order</Text>
            </TouchableOpacity>

           
        </View>
    )
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
      fontSize:18,
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
      padding: 10,
      borderRadius: 5,
      margin: '5%',
    },
    buttonText: {
      fontSize: 24,
      color: '#fff',
      textAlign: 'center'
    },
    image:{
      width: '100%',
      height: 150,
    },
  });