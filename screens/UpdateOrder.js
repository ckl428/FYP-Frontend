import React from 'react'
import { View, Text, StyleSheet,ScrollView,SafeAreaView,TextInput, Alert,FlatList,Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from '../layout/Card';
import {Picker} from '@react-native-picker/picker';

export default function UpdateOrder({ navigation,route }) {
  const [ticketName,setTicketName] = useState('');
  const [user,setUser] = useState('')
  const [userId,setUserId] = useState('')
  const [role,setRole] = useState('')
  const [data,setData] = useState('');
  const [method,setMethod] = useState('')
  const [passport,setPassport] = useState('');
  const [record,setRecord] = useState('')

  
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
        fetchMember()
        console.log('Passport',passport)
 }, []);
 
 const baseUrl = 'http://192.168.0.105:3000';

 const fetchMember = () =>{
   fetch(baseUrl+'/api/user/getUser')
       .then((response) => response.json())
       .then((json) => setData(json))
       .catch((error) => console.error(error))
       .finally(() => console.log('Member Data', data));
 }
 const getGuestOrder = async () =>{
    console.log('passport', passport)
    if(!passport){
        alert('Type your passport first')
        return;
    }
    const fetchURL = baseUrl+'/api/ticket/getGuestOrder/'+passport
    await fetch(fetchURL)
        .then((response) => response.json())
        .then((json) => setRecord(json))
        .catch((error) => console.error(error))
        .finally(() => console.log('record',record))
  }

  
 let content  = 


 <FlatList
 style={{}}
 data={data}
 keyExtractor={item => item._id}
 refreshing={true}
 
 renderItem={({ item }) => (
 
    <TouchableOpacity onPress={()=>{alert('Hello')}}>
    <Card>
        <Text>Member Name: {item.name}</Text>
        <Text>Member Email: {item.email}</Text>
    </Card>
    </TouchableOpacity>
 )}
 />

 let passportSearch = <SafeAreaView>

 <Card>
 <SafeAreaView >
  <TextInput  placeholder="Type your passport here"
     onChangeText={passport => setPassport(passport)} defaultValue={passport}
     placeholderTextColor="#b3cddf" >
   </TextInput>
 </SafeAreaView>

 </Card>
 <TouchableOpacity onPress={() => getGuestOrder()} style={localStyles.button}>
 <Text style={localStyles.buttonText}>Find your order</Text>
 </TouchableOpacity>

 <FlatList
style={{}}
data={record}
keyExtractor={item => item._id}
refreshing={true}

renderItem={({ item }) => (
<Card>
  <TouchableOpacity onPress={()=>{
  navigation.navigate('UpdateOrderForm',{
    _id: item._id,
    paramUserId:userId,
    name: item.name,
    customerName:item.customerName,
    pPassport:item.passport,
    price: item.price,
    start:item.start,
    dest:item.dest,
    duration:item.duration,
    company:item.company,
    quota:item.quota,
    departureTime:item.departureTime,
    arrivalTime:item.arrivalTime,
    pDepartureDate:item.departureDate,
    pAirClass:item.airClass,
    pMeal:item.meal,
    pGender:item.gender,

  })
}}
>
<View style={{flexDirection:"row", justifyContent:'space-between'}}>
<View>
<Image
        source={require('../assets/Images/Flag/HongKong.png')}
        style={{width:40,height:22.5}}
/>
<Text style={localStyles.contents}>{item.start}</Text>
<Text style={localStyles.contents}>{item.departureTime}</Text>
</View>
<View>
<Image
    source={require('../assets/airplane.png')}
    style={{width:50,height:40}}
  />
<Text>{item.duration}</Text>
</View>

<View>
<Image
        source={getSource(item.name)}
        style={{width:40,height:22.5}}
/>
<Text style={localStyles.contents}>{item.dest}</Text>
<Text style={localStyles.contents}>{item.arrivalTime}</Text>
</View>

</View>

</TouchableOpacity>
</Card>
)}
/>
 </SafeAreaView>
 

  
  
    return (
      <SafeAreaView style={[localStyles.container]}>
      
      <Text style={[localStyles.header]}>Update Order Record</Text>
      <View style={[localStyles.secondContainer]}>
      
      
      <Text>Find order by:</Text>
        <Card>
           <Picker
            selectedValue={method}
            onValueChange={(itemValue, itemIndex) =>
            setMethod(itemValue)
            }>
            <Picker.Item label="Member" value="Member" />
            <Picker.Item label="Passport" value="Passport" />
            </Picker>
        </Card>

        {method=='Member'?content:passportSearch}
        
            
        
      
      <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.button}>
        <Text style={localStyles.buttonText}>Back</Text>
      </TouchableOpacity>
      
      
      </View>

  </SafeAreaView>

        
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