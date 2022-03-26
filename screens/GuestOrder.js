import React from 'react'
import { View, Text, StyleSheet,ScrollView,FlatList,SafeAreaView,TextInput, Alert,Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import AnimatedLottieView from 'lottie-react-native';
import Card from '../layout/Card';
import moment from 'moment';
export default function GuestOrder({navigation,route}) {
const [record,setRecord] = useState('');
const [passport, setPassport] = useState('');


const baseUrl = 'http://192.168.0.105:3000'
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

let content  = 

<FlatList
style={{}}
data={record}
keyExtractor={item => item._id}
refreshing={true}

renderItem={({ item }) => (
<Card>
  <TouchableOpacity onPress={()=>{
  alert('Hello')
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

<View style={{borderBottomColor: 'black', borderBottomWidth: 1,}}/>
 <Text>Customer: {item.customerName}</Text>
 <Text>Gender: {item.gender}</Text>
 <Text>Passport: {item.passport}</Text>

</TouchableOpacity>
</Card>
)}
/>
  return (
   
    <SafeAreaView style={{flex: 1}}>
        <Text style={[localStyles.header]}>Check your Order Here</Text>
        <Card>
        <SafeAreaView >
         
         <Card>
         <TextInput style={[localStyles.input]} placeholder="Type your passport here"
            onChangeText={passport => setPassport(passport)} defaultValue={passport}
            placeholderTextColor="#b3cddf" >
          </TextInput>
         </Card>
        
        </SafeAreaView>
        <TouchableOpacity onPress={() => getGuestOrder()} style={localStyles.button}>
        <Text style={localStyles.buttonText}>Find your order</Text>
        </TouchableOpacity>

        
        {content} 
        
          
       
        <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.button}>
        <Text style={localStyles.buttonText}>Back</Text>
      </TouchableOpacity>
        </Card>

        </SafeAreaView>
   
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
      padding: 5,
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
      borderRadius:6
    },
  });