import React from 'react'
import { baseUrl } from '../global_url';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet,FlatList,ScrollView,Image, SafeAreaView, } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect,useRef } from 'react';
import Card from '../layout/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLottieView from 'lottie-react-native';
import SelectDropdown from 'react-native-select-dropdown'
import {Picker} from '@react-native-picker/picker';






export default function Home({ navigation }) {
  const [user,setUser] = useState('')
  const [userId,setUserId] = useState('')
  const [data,setData] = useState([]);
  const [search,setSearch] = useState('');
  const [selectedMethod,setSelectedMethod] = useState('Keywords')
  const [loading,setLoading] = useState(true)
  const dropdownRef = useRef({}); 
  
    useEffect(() => {
      AsyncStorage.getItem('userName').then((value)=>{
        setUser(value)
        console.log('saved user', user)
      })
      AsyncStorage.getItem('userId').then((value)=>{
        setUserId(value)
        console.log('saved user id', userId)
      })
     
      fetchTicket()
    }, []);
  
    useFocusEffect(
      React.useCallback(() => {
        fetchTicket()
      }, [])
    );


  const fetchTicket = () =>{
    fetch(baseUrl+'/api/ticket/getTicket')
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

  const country = data.map(country => country.name);
  

  
  const filteredData = 
  search?data.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())):data
  //countryFilter?data.filter((item)=>item.name.toLowerCase().includes(countryFilter.toLowerCase())):data
  const currentUser = user?user:"Guest"
  let content  = 
  <FlatList
    style={{}}
    data={filteredData}
    keyExtractor={item => item._id}
    refreshing={true}
    renderItem={({ item }) => (
    <Card>
      <TouchableOpacity onPress={()=>{
      navigation.navigate('Detail', {
      _id: item._id,
      paramUserId:userId,
      deptName: item.deptName,
      name: item.name,
      price: item.price,
      start:item.start,
      dest:item.dest,
      duration:item.duration,
      company:item.company,
      image: item.image,
      quota:item.quota,
      departureTime:item.departureTime,
      arrivalTime:item.arrivalTime,
    });
  }}
  >
  <View style={{flexDirection:"row", justifyContent:'space-between'}}>
    <View>
    
    
    <Image
        source={getSource(item.deptName)}
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


let keywordsSearch =  
<View style={{flexDirection:'row', }}>
 
  <TextInput 
  placeholder='Where you want to go?'
  placeholderTextColor="#b3cddf" 
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
  
  

  let regionSearch =   
  <View style={{flexDirection:'row', }}>
      <SelectDropdown
  data={[... new Set(country)]}
  defaultButtonText='All'
  ref={dropdownRef} 
  onSelect={(selectedItem, index) => {
  
  setSearch(selectedItem);
  
  }}
/>
        <View style={{flexDirection:'row',marginLeft: 'auto',  marginHorizontal:4,
            marginVertical:6}}>
              <TouchableOpacity onPress={()=>{
                dropdownRef.current.reset()
                setSearch('')
              }}>
        <Text>X</Text>
        </TouchableOpacity>
        </View>
        </View>
  
  return (
       
        <SafeAreaView style={{flex:1, backgroundColor:'#fff', padding: 20, marginVertical: 50,marginHorizontal: 16, }}>
        
        <Text style={localStyles.text}>Welcome Back, {currentUser}</Text>
        <Card>
        <View style={{}}>
        <Text>Search By:</Text>
           <Picker
            selectedValue={selectedMethod}
            onValueChange={(itemValue, itemIndex) =>
            setSelectedMethod(itemValue)
            }>
            <Picker.Item label="Keywords" value="Keywords" />
            <Picker.Item label="Region" value="Region" />
            </Picker>
          
          </View>
       
        </Card>
        
        <Card>
        
        {selectedMethod=='Keywords'?keywordsSearch:regionSearch}
        
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
  