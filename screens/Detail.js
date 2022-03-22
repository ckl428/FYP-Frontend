import React from 'react'
import { View, Text, StyleSheet,FlatList,ScrollView,Image, Alert,Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import Card from '../layout/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Detail({ route,navigation }) {

    const baseUrl = 'http://192.168.0.105:3000'

    const [user,setUser] = useState('')
    const [userId, setUserId] = useState('')
    const [role, setRole] = useState('')
    const fetchTicket = () =>{
      fetch(baseUrl+'/api/ticket/getTicket')
          .then((response) => response.json())
          .then((json) => console.log(''))
          .catch((error) => console.error(error))
          .finally(() => console.log('Name data'));
    }
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
    const getSource = (name) =>{
      switch(name){
        case "Hong Kong":
          return require('../assets/Images/Flag/HongKong.png')
        case "China":
          return require('../assets/Images/Flag/China.png')
        case "Japan":
          return require('../assets/Images/Flag/Japan.png')
        case "Dubai":
          return require('../assets/Images/Flag/Dubai.png')
        case "South Korea":
          return require('../assets/Images/Flag/SouthKorea.png')
      }
    }

    useEffect(() => {
        getUserInfo()
        fetchTicket()
      }, []);
    
    const { _id,name,price,start,dest,duration,company,image,quota,departureTime,arrivalTime} = route.params;
    //console.log('image', image)

    const deleteTicket = async () =>{
    const url = baseUrl+'/api/ticket/deleteTicket'
    await fetch(url,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        _id:_id
      })
    }
    )
    .then((response) => response.text())
    .then((responseText) => { 
      alert(responseText);
      if(responseText=='Delete success'){
        navigation.replace('Tab_Navigator')
      }
      })
    .catch((error) => { console.warn(error); });
     }
     const placeOrder = () =>{
      
        navigation.navigate('OrderTicket', {
        _id: _id,
        user:user,
        paramUserId:userId,
        name: name,
        price: price,
        start:start,
        dest:dest,
        duration:duration,
        company:company,
        image: image,
        quota:quota,
        departureTime:departureTime,
        arrivalTime:arrivalTime,
      });
    
     }
   

     let removeTicket = <TouchableOpacity onPress={() => Alert.alert("Confirmation","Confirm delete this ticket?",
     [
         { text: "Yes", onPress: () => deleteTicket() },
         { text: "No",onPress: () => alert("Delete canceled"), style: "cancel"}
         
     ]
      )} style={localStyles.button}>
         <Text style={localStyles.buttonText}>Delete</Text>
     </TouchableOpacity>
    return (
       
        <View style={{flex:1, backgroundColor:'#fff', padding: 20, marginVertical: 50,marginHorizontal: 16, }}>
            <Text style={localStyles.text}>Details Screen</Text>
            
            <Card>
            <View style={{flexDirection:"row", justifyContent:'space-between'}}>
            <View>
    
    
            <Image
              source={require('../assets/Images/Flag/HongKong.png')}
              style={{width:40,height:22.5}}
            />
            <Text style={localStyles.contents}>{start}</Text>
            <Text style={localStyles.contents}>{departureTime}</Text>
    
            </View>
            <View>
            <Image
                source={require('../assets/airplane.png')}
                style={{width:50,height:40}}
              />
            <Text>{duration}</Text>
          </View>
   
          <View>
          <Image
              source={getSource(name)}
              style={{width:40,height:22.5}}
          />
          <Text style={localStyles.contents}>{dest}</Text>
          <Text style={localStyles.contents}>{arrivalTime}</Text>
          </View>
    
        </View>
            </Card>
            <Card>
              {/**Ticket data */}
              <Text style = {localStyles.contents}>Counrty: {name}</Text>
              <Text style = {localStyles.contents}>Price: ${price}</Text>
              <Text style = {localStyles.contents}>Start Airport: {start}</Text>
              <Text style = {localStyles.contents}>Destination Airport: {dest}</Text>
              <Text style = {localStyles.contents}>Departure Time: {departureTime}</Text>
              <Text style = {localStyles.contents}>Arrival Time: {arrivalTime}</Text>
              <Text style = {localStyles.contents}>Duration: {duration} Hours</Text>
              <Text style = {localStyles.contents}>Flight Company: {company}</Text>
              <Text style = {localStyles.contents}>Quota: {quota}</Text>
            
              
            </Card>
            
      
            
            <TouchableOpacity onPress={() => placeOrder()} style={localStyles.button}>
                <Text style={localStyles.buttonText}>Place Order</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Add to cart')} style={localStyles.button}>
                <Text style={localStyles.buttonText}>Add to cart</Text>
            </TouchableOpacity>

            {role=='admin'?removeTicket:null}
            

           
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
      fontSize:16,
        color:'#000000'
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