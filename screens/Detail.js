import React from 'react'
import { View, Text, StyleSheet,FlatList,ScrollView,Image, Alert,Button,TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import Card from '../layout/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { baseUrl } from '../global_url';


export default function Detail({ route,navigation }) {

 

    const [user,setUser] = useState('')
    const [userId, setUserId] = useState('')
    const [role, setRole] = useState('')
    const [showUpdate,setShowUpdate] = useState(false)
    const [updateDeptName,setUpdateDeptName] = useState(deptName)
    const [updateCountry,setUpdateCountry] = useState(name)
    const [updatePrice,setUpdatePrice] = useState(price)
    const [updateStart,setUpdateStart] = useState(start)
    const [updateDestination,setUpdateDestation] = useState(dest)
    const [updateDepartureTime,setUpdateDepartureTime] = useState(departureTime)
    const [updateArrivalTime,setUpdateArrivalTime] = useState(arrivalTime)
    const [updateCompany,setUpdateCompany] = useState(company)
    const [updateQuota,setUpdateQuota] = useState(quota)
    const [ticketDepartureTime, setTicketDepartureTime] = useState(departureTime)
    const [ticketArrivalTime, setTicketArrivalTime] = useState(arrivalTime)
    const [isDepartureVisible, setDepartureVisibility] = useState(false);
    const [isArrivalVisible, setArrivalVisibility] = useState(false);

    
  
    const showDeparturePicker = () => {
      setDepartureVisibility(true);
    };
  
    const hideDeparturePicker = () => {
      setDepartureVisibility(false);
    };
  
    const showArrivalPicker = () => {
      setArrivalVisibility(true);
    };
  
    const hideArrivalPicker = () => {
      setArrivalVisibility(false);
    };
    const handleDeparture = async (time) => {
      var trimTime =  JSON.stringify(time).substring(12,17)
      
       setUpdateDepartureTime(trimTime)
        console.log("Departure time has been picked: ", ticketDepartureTime);
      hideDeparturePicker();
    };
  
    const handleArrival = async (time) => {
      var trimTime =  JSON.stringify(time).substring(12,17)
      
       setUpdateArrivalTime(trimTime)
        console.log("Arrival time has been picked: ", ticketArrivalTime);
      hideArrivalPicker();
    };
    

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
        console.log('Role', role)
      }, []);
    
    const { _id,deptName,name,price,start,dest,duration,company,image,quota,departureTime,arrivalTime} = route.params;
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
        deptName:deptName,
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
    const confirmUpdate = () =>{
      Alert.alert("Confirmation","Confirm update this ticket?",
     [
         { text: "Yes", onPress: () => updateTicket() },
         { text: "No",onPress: () => alert("Update canceled"), style: "cancel"}
         
     ]
      )
    }
    let dur = ''
    let totalHour = ''
    const getDuration = () =>{

      let departHour = updateDepartureTime||departureTime
      let trimDepartHour =  departHour.substring(0,2)
      let arrivalHour = updateArrivalTime||arrivalTime
      let trimArrivalHour = arrivalHour.substring(0,2)
      
      totalHour = trimArrivalHour-trimDepartHour
      //let totalMin = arrivalMin-departMin
      if(totalHour<0)
      totalHour*=-1
      if(arrivalHour<=departHour)
      totalHour=24-totalHour
      //if(totalMin<0)
      //totalMin*=-1
  
      dur = totalHour + " Hours"
      return dur
    }
    const handleCancel = () =>{
      if(role=='admin')
        setShowUpdate(false)
      else
        navigation.goBack();
    }
    const updateTicket = async () =>{
        const url = baseUrl+'/api/ticket/updateTicket'
        await fetch(url,{
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
          },
          body: JSON.stringify({
            _id:_id,
            deptName:updateDeptName||deptName,
            name:updateCountry||name,
            price:updatePrice||price,
            start:updateStart||start,
            dest:updateDestination||dest,
            duration:getDuration()||duration,
            departureTime:updateDepartureTime||departureTime,
            arrivalTime:updateArrivalTime||arrivalTime,
            company:updateCompany||company,
            quota:parseInt(updateQuota)||quota,
          })
        }
        )
        .then((response) => response.text())
        .then((responseText) => { 
           alert('Update Success')
          if(responseText=='Update Success')
            navigation.replace('Tab_Navigator')
          })
        .catch((error) => { console.warn(error); });
         }
   
     let place = <TouchableOpacity onPress={() => placeOrder()} style={localStyles.button}>
     <Text style={localStyles.buttonText}>Place Order</Text>
 </TouchableOpacity>
     let addCart = <TouchableOpacity onPress={() => alert('Bookmarked')} style={localStyles.button}>
     <Text style={localStyles.buttonText}>Bookmark</Text>
     </TouchableOpacity>

     let textData = <Card>
     {/**Ticket data */}
     <Text style = {localStyles.contents}>Departure: {deptName}</Text>
     <Text style = {localStyles.contents}>Arrival: {name}</Text>
     <Text style = {localStyles.contents}>Price: ${price}</Text>
     <Text style = {localStyles.contents}>Start Airport: {start}</Text>
     <Text style = {localStyles.contents}>Destination Airport: {dest}</Text>
     <Text style = {localStyles.contents}>Departure Time: {departureTime}</Text>
     <Text style = {localStyles.contents}>Arrival Time: {arrivalTime}</Text>
     <Text style = {localStyles.contents}>Duration: {duration}</Text>
     <Text style = {localStyles.contents}>Flight Company: {company}</Text>
     <Text style = {localStyles.contents}>Quota: {quota}</Text>
   </Card>

   let updateData = 
     <ScrollView>
            <Card>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>Departure: </Text>
            <TextInput 
              onChangeText={updateDeptName => setUpdateDeptName(updateDeptName)} defaultValue={deptName}
              placeholderTextColor="#000000"
            >
            </TextInput>
            </View>
            </Card>

            <Card>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>Arrival: </Text>
            <TextInput 
              onChangeText={updateCountry => setUpdateCountry(updateCountry)} defaultValue={name}
              placeholderTextColor="#000000"
            >
            </TextInput>
            </View>
            </Card>
           
            <Card>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>Price: </Text>
            <TextInput 
              onChangeText={updatePrice => setUpdatePrice(updatePrice)} defaultValue={JSON.stringify(price)}
              placeholderTextColor="#000000"
            >
            </TextInput>
            </View>
            </Card>

            <Card>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>Start Airport: </Text>
            <TextInput 
              onChangeText={updateStart => setUpdateStart(updateStart)} defaultValue={start}
              placeholderTextColor="#000000"
            >
            </TextInput>
            </View>
            </Card>

            <Card>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>Destination Airport: </Text>
            <TextInput 
              onChangeText={updateDestination => setUpdateDestation(updateDestination)} defaultValue={dest}
              placeholderTextColor="#000000"
            >
            </TextInput>
            </View>
            </Card>

        <Card>
        <View>
        <Button title="Select Departure Time" onPress={showDeparturePicker} />
        <DateTimePickerModal
        isVisible={isDepartureVisible}
        mode="time"
        onConfirm={handleDeparture}
        onCancel={hideDeparturePicker}
        />
        <Text>{updateDepartureTime?"Departure Time: " + updateDepartureTime:"Departure Time: " + departureTime}</Text>
        </View>
        </Card>

          <Card>
          <View>
          <Button title="Select Arrival Time" onPress={showArrivalPicker} />
          <DateTimePickerModal
          isVisible={isArrivalVisible}
          mode="time"
          onConfirm={handleArrival}
          onCancel={hideArrivalPicker}
          />
          <Text>{updateArrivalTime?"Arrival Time: " + updateArrivalTime:"Arrival Time: " + arrivalTime}</Text>
          </View>
          </Card>
          <Card>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>Duration: {getDuration()||duration}</Text>
            </View>
          </Card>

          <Card>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>Company: </Text>
            <TextInput 
              onChangeText={updateCompany => setUpdateCompany(updateCompany)} defaultValue={company}
              placeholderTextColor="#000000"
            >
            </TextInput>
            </View>
            </Card>

            <Card>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text>Quota: </Text>
            <TextInput placeholder="Input Quota"
              onChangeText={updateQuota => setUpdateQuota(updateQuota)} defaultValue={quota+''}
              placeholderTextColor="#000000"
            >
            </TextInput>
            </View>
            </Card>
            
     </ScrollView>
    

     let comfirmButton = <TouchableOpacity onPress={() => confirmUpdate()} style={localStyles.button}>
    <Text style={localStyles.buttonText}>Confirm Update</Text>
    </TouchableOpacity>

     let updateButton = <TouchableOpacity onPress={() => setShowUpdate(true)} style={localStyles.button}>
     <Text style={localStyles.buttonText}>Update</Text>
     </TouchableOpacity>
     let cancelButton = <TouchableOpacity onPress={() => handleCancel()} style={localStyles.button}>
     <Text style={localStyles.buttonText}>Cancel</Text>
     </TouchableOpacity>

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
            
           
            {showUpdate?updateData:textData}
            {showUpdate?null:place}
            {showUpdate?null:addCart}
            {showUpdate?comfirmButton:null}
            {showUpdate||role!='admin'?null:updateButton}
            {showUpdate||role!='admin'?cancelButton:null}
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
    },
  });