import React from 'react'
import { View, Text, StyleSheet,FlatList,ScrollView,Image, SafeAreaView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import Card from '../layout/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';





export default function Home({ navigation }) {
  
  const [user,setUser] = useState('')
  const [data,setData] = useState([]);
  const [search,setSearch] = useState('');
  const [loading,setLoading] = useState(true)
 

  
 

    useEffect(() => {
      
      AsyncStorage.getItem('userName').then((value)=>{
        setUser(value)
        console.log('saved user', user)
      })
     
      fetchTicket()
      
    }, []);

  const baseUrl = Platform.OS === 'android' ? 'http://192.168.0.105:3000' : 'http://localhost:3000';
  const fetchTicket = () =>{
    fetch(baseUrl+'/api/ticket/getTicket')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }
 
  const filteredData = search?data.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
  :data

  const currentUser = user?user:"Guest"
  //console.log('Filter', filteredData)
  //console.log('Name data after fetch')
  //const filteredData = data? data.filter(data.dest.toLowerCase().includes(search.toLowerCase())) : data;
  
  //<Button onPress={() => 
  //navigation.navigate('nameComponentInStack', {screen: 'ScreenName', params: {paramName: paramValue}})}
  let content  = 
  <FlatList
    style={{}}
    data={filteredData}
    keyExtractor={item => item._id}
    renderItem={({ item }) => (
    <Card>
      <TouchableOpacity onPress={()=>{
      navigation.navigate('Detail', {
      _id: item._id,
      name: item.name,
      price: item.price,
      start:item.start,
      dest:item.dest,
      company:item.company,
      image: item.image,
      quota:item.quota,
    });
  }}
  >
  <Image
  style={localStyles.image}
  source={{
  uri: item.image,
  }}
  />
  <Text style={localStyles.contents}>{item.start} ------- {item.dest}</Text>
</TouchableOpacity>
</Card>
)}
/>
  
  return (
       
        <SafeAreaView style={{flex:1, backgroundColor:'#fff', padding: 20, marginVertical: 50,marginHorizontal: 16, }}>
         
        
    
        <Text style={localStyles.text}>Hello {currentUser}</Text>

        <Card>
        <View style={{flexDirection:'row', }}>
        <TextInput 
        placeholder='Where you want to go?'
        keyboardType="default"
        onChangeText={search => setSearch(search)} 
        defaultValue={search}
        ></TextInput>
        <View style={{flexDirection:'row',marginLeft: 'auto',  marginHorizontal:4,
            marginVertical:6}}>
              <TouchableOpacity onPress={()=>{
                setSearch('')
              }}>
        <Text>X</Text>
        </TouchableOpacity>
        </View>
        
        </View>
        </Card>
        
        {loading?<AnimatedLottieView source={require('../loading.json')} autoPlay loop/>:content}
       


       
      
              
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
  