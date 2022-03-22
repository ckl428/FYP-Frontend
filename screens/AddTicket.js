import React from 'react'
import { View, Text, StyleSheet,ScrollView,SafeAreaView,TextInput,Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import Card from '../layout/Card';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { duration } from 'moment';

export default function AddTicket({ navigation }) {
  const [ticketName,setTicketName] = useState('');
  const [ticketPrice,setTicketPrice] = useState('');
  const [ticketStart,setTicketStart] = useState('');
  const [ticketDest,setTicketDest] = useState('');
  const [ticketCom,setTicketCom] = useState('');
  const [ticketQuota,setTicketQuota] = useState('');
  const [ticketDepartureTime, setTicketDepartureTime] = useState('')
  const [ticketArrivalTime, setTicketArrivalTime] = useState('')
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
    
     setTicketDepartureTime(trimTime)
      console.log("Departure time has been picked: ", ticketDepartureTime);
    hideDeparturePicker();
  };

  const handleArrival = async (time) => {
    var trimTime =  JSON.stringify(time).substring(12,17)
    
     setTicketArrivalTime(trimTime)
      console.log("Arrival time has been picked: ", ticketArrivalTime);
    hideArrivalPicker();
  };
  const baseUrl = 'http://192.168.0.105:3000'




  const addTicket = async () => {
    
    console.log('Departure time',ticketDepartureTime)
    const url = baseUrl+'/api/ticket/addTicket'
    await fetch(url,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        name:ticketName,
        price:ticketPrice,
        start:ticketStart,
        dest:ticketDest,
        departureTime:ticketDepartureTime,
        arrivalTime:ticketArrivalTime,
        duration:totalHour.toString() + ' Hours',
        company:ticketCom,
        quota:ticketQuota,
      })
    }
    )
    .then((response) => response.text())
    .then((responseText) => { 
      alert(responseText);
      if(responseText=='Add Ticket Success'){
      fetchTicket();
      navigation.replace('Tab_Navigator');
      }
    })
    .catch((error) => { console.warn(error); });
  }
  const fetchTicket = () =>{
    fetch(baseUrl+'/api/ticket/getTicket')
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.error(error))
        .finally(() => console.log('success'));
  }
  let dur = ''
  let totalHour = ''
  const getDuration = () =>{
    let departHour = ticketDepartureTime.substring(0,2)
    let departMin = ticketDepartureTime.substring(3,5)
    let arrivalHour = ticketArrivalTime.substring(0,2)
    let arrivalMin = ticketArrivalTime.substring(3,5)
    totalHour = arrivalHour-departHour
    let totalMin = arrivalMin-departMin
    if(totalHour<0)
    totalHour*=-1
    if(totalMin<0)
    totalMin*=-1

    dur = "Duration: " + totalHour + " Hour " + totalMin + " Minutes"
    return dur
  }

    return (
      <ScrollView style={[localStyles.container]}>
      <Text style={[localStyles.header]}>Add new Ticket</Text>
      <View style={[localStyles.secondContainer]}>
      <SafeAreaView >
        <Card>
        <TextInput placeholder="Destination Name"
          onChangeText={ticketName => setTicketName(ticketName)} defaultValue={ticketName}
          placeholderTextColor="#b3cddf"
        >
           </TextInput>
        </Card>
        
       <Card>
        <TextInput  placeholder="Ticket Price"
          onChangeText={ticketPrice => setTicketPrice(ticketPrice)} defaultValue={ticketPrice}
          placeholderTextColor="#b3cddf"
        >
        </TextInput>
        </Card>
        <Card>
        <TextInput  placeholder="Start Airport"
          onChangeText={ticketStart => setTicketStart(ticketStart)} defaultValue={ticketStart}
          placeholderTextColor="#b3cddf"
        >
        </TextInput>
        </Card>
        <Card>
        <TextInput  placeholder="Destination Airport"
          onChangeText={ticketDest => setTicketDest(ticketDest)} defaultValue={ticketDest}
          placeholderTextColor="#b3cddf"
        >
        </TextInput>
        </Card>
        
        <Card>
        <TextInput  placeholder="Company"
          onChangeText={ticketCom => setTicketCom(ticketCom)} defaultValue={ticketCom}
          placeholderTextColor="#b3cddf"
        >
        </TextInput>
        </Card>

        <Card>
        <TextInput  placeholder="Quota"
          onChangeText={ticketQuota => setTicketQuota(ticketQuota)} defaultValue={ticketQuota}
          placeholderTextColor="#b3cddf"
        >
        </TextInput>
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
        <Text>{ticketDepartureTime?"Departure Time " + ticketDepartureTime:null}</Text>
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
        <Text>{ticketArrivalTime?"Arrival Time " + ticketArrivalTime:null}</Text>
        </View>
        </Card>
        <Card>
        <Text>{getDuration()? getDuration():"Duration:"}</Text>
        </Card>
        
      </SafeAreaView>
    
      <TouchableOpacity onPress={() => addTicket()} style={localStyles.button}>
      <Text style={localStyles.buttonText}>Add</Text>
        </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.button}>
      <Text style={localStyles.buttonText}>Back</Text>
    </TouchableOpacity>

      </View>

  </ScrollView>

        
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
      padding: 10,
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
  