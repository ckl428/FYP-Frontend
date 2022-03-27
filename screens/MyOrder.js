import React from 'react'
import { View, Text, StyleSheet,FlatList,ScrollView,Image, SafeAreaView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import Card from '../layout/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import { baseUrl } from '../global_url';
export default function MyOrder({ navigation,route }) {
    const [user,setUser] = useState('')
    const [userId,setUserId] = useState('')
    const [data,setData] = useState([]);
    const {pUserId}  = route.params;
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
        fetchOrder()
      }, []);
    

      const fetchOrder = async () =>{
        console.log('before id', pUserId)
        const fetchURL = baseUrl+'/api/ticket/getOrder/'+pUserId
        await fetch(fetchURL)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
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
      data={data}
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
        <SafeAreaView style={{flex:1, backgroundColor:'#fff', padding: 20, marginVertical: 50,marginHorizontal: 16, }}>
         <Text style={localStyles.text}>My Order</Text>
        
        
        {loading?<AnimatedLottieView source={require('../loading.json')} autoPlay loop/>:content}    
        <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.button}>
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
      padding: 20,
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
