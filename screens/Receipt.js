import React from 'react'
import { View, Text, StyleSheet,FlatList,ScrollView,Image, SafeAreaView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import Card from '../layout/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Receipt({ navigation,route }) {
    const [asyncUser,setUser] = useState('')
    const [asyncUserId,setUserId] = useState('')
    const [data,setData] = useState([]);
    const {_id,user,userId,customerName,passport,departureDate,backDepartureDate,departureTime,arrivalTime,deptName,name,price,total,start,dest,duration,company,image,quota,meal,airClass,gender}  = route.params;
    const [loading,setLoading] = useState(true)
    
    const getUserInfo = async () =>{
        await AsyncStorage.getItem('userName').then((value)=>{
            setUser(value)
        })
        await AsyncStorage.getItem('userId').then((value)=>{
            setUserId(value)
        })
    }
    useEffect(() => {
        getUserInfo()
        console.log('Data',route.params)
      }, []);
  
      
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
      
      let ticketData =   <View>
      <Card>
         <View style={{flexDirection:"row", justifyContent:'space-between'}}>
         <View>
 
 
         <Image
           source={getSource(deptName)}
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
    
         </View>
     
     let userData = <View>
      <Card>
     {/**Ticket data */}
     <Text style = {localStyles.smallTitle}>User Data</Text>
     <View style={{borderBottomColor: 'black', borderBottomWidth: 1,}}/>
     <Text style = {localStyles.contents}>Customer Name: {customerName}</Text>
     <Text style = {localStyles.contents}>User Type: {user=='Guest'?'Guest':'Member'}</Text>
     <Text style = {localStyles.contents}>Gender: {gender}</Text>
     <Text style = {localStyles.contents}>Passport: {passport}</Text>
    </Card>
     </View>
     let ticketInfo = <View>
       <Card>
     {/**Ticket data */}
     <Text style = {localStyles.smallTitle}>Ticket Data</Text>
     <View style={{borderBottomColor: 'black', borderBottomWidth: 1,}}/>
     <Text style = {localStyles.contents}>Departure: {deptName}</Text>
     <Text style = {localStyles.contents}>Arrival: {name}</Text>
     <Text style = {localStyles.contents}>Start Airport: {start}</Text>
     <Text style = {localStyles.contents}>Destination Airport: {dest}</Text>
     <Text style = {localStyles.contents}>Departure Date: {departureDate}</Text>
     <Text style = {localStyles.contents}>Departure Time: {departureTime}</Text>
     <Text style = {localStyles.contents}>Arrival Time: {arrivalTime}</Text>
     <Text style = {localStyles.contents}>Back Departure Date: {backDepartureDate}</Text>
     <Text style = {localStyles.contents}>Duration: {duration}</Text>
     <Text style = {localStyles.contents}>Class Type: {airClass}</Text>
     <Text style = {localStyles.contents}>Meal: {meal}</Text>
     <Text style = {localStyles.contents}>Total Price: ${total}</Text>
     <Text style = {localStyles.contents}>Flight Company: {company}</Text>
    </Card>
     </View>
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff', padding: 20, marginVertical: 50,marginHorizontal: 16, }}>
         <Text style={localStyles.text}>Receipt</Text>
          
          {userData}
          {ticketData}
          {ticketInfo}
   

        
        <TouchableOpacity onPress={() => navigation.navigate('Tab_Navigator')} style={localStyles.button}>
        <Text style={localStyles.buttonText}>Back</Text>
      </TouchableOpacity>
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
        color:'#000'
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
    smallTitle: {
      color: '#145F95',
      textAlign:'left',
      fontSize: 18,
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
      borderRadius:6
    },
  });
