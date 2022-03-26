import React from 'react'
import { View, Text, Button, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image,ScrollView,Alert,Modal} from 'react-native';
import { useState, useEffect } from 'react';
import Card from '../layout/Card';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { WebView } from 'react-native-webview';

export default function OrderTicket({ route,navigation }) {
    const { _id,user,paramUserId,name,price,start,dest,duration,company,image,quota,departureTime,arrivalTime} = route.params;
    const [custName, setCustName] = useState('');
    const [selectedGender, setSelectedGender] = useState('Male');
    const [passport, setPassport] = useState('');
    const [airClass, setAirClass] = useState('Economy Class');
    const [meal, setMeal] = useState('No Meal');
    const [departureDate, setDepartureDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [status,setStatus] = useState('Pending');

    
    const showDatePicker = () => {
    setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
    var dateObj = JSON.stringify(date);
    
    console.log("A date has been picked: ", dateObj.substring(1,11));
    setDepartureDate(dateObj.substring(1,11))
    hideDatePicker();
    };

    const getPrice = (obj) =>{
      if(obj == 'Meal 1')
        return 20;
      else if (obj == 'Meal 2')
        return 25;

      if(obj == 'Economy Class')
        return 1;
      else if(obj == 'Business Class')
        return 1.5;
      else if (obj == 'First Class')
        return 2;
      
      else
        return 0;
    }

   

   
   
  
    const baseUrl = 'http://192.168.0.105:3000'

    const orderTicket = async () =>{
        console.log('selected passport', passport)
        console.log('selected depart date', departureDate)
        console.log('selected depart time', departureTime)
        console.log('selected ticketID',_id)
        const url = baseUrl+'/api/ticket/orderTicket'
        await fetch(url,{
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-type':'application/json'
          },
          body: JSON.stringify({
            _id:_id,
            user:(user?user:'Guest'),
            userId:(paramUserId?paramUserId:'Guest'),
            customerName:custName,
            passport:passport,
            departureDate:departureDate,
            departureTime:departureTime,
            arrivalTime:arrivalTime,
            name:name,
            price:price,
            total:total,
            start:start,
            dest:dest,
            duration:duration,
            company:company,
            image:image,
            quota:quota,
            meal:meal,
            airClass:airClass,
            gender:selectedGender,
          })
        }
        )
        .then((response) => response.text())
        .then((responseText) => { 
          alert(responseText);
          if(responseText=='Add Order Success')
            navigation.navigate('Receipt',{
              _id:_id,
            user:(user?user:'Guest'),
            userId:(paramUserId?paramUserId:'Guest'),
            customerName:custName,
            passport:passport,
            departureDate:departureDate,
            departureTime:departureTime,
            arrivalTime:arrivalTime,
            name:name,
            price:price,
            total:total,
            start:start,
            dest:dest,
            duration:duration,
            company:company,
            image:image,
            quota:quota,
            meal:meal,
            airClass:airClass,
            gender:selectedGender,
            })
          })
        .catch((error) => { console.warn(error); });
         }
   

    const checkInput = () => {
      if(custName&&selectedGender&&departureDate&&airClass&&meal){
        console.log('All fields ok')
        setShowModal(true)
      }
      else{
        alert('Please input all fields')
        return;
      }
    }
    let total = price*getPrice(airClass)+getPrice(meal)

    const handleResponse = (data) => {
      checkInput()
      //HTML title
      if(data.title === 'success'){
        setShowModal(false);
        console.log('Payment success')
        orderTicket()
      }
      else if(data.title ==='cancel'){
        setShowModal(false);
        alert('Payment cancel')
      }
    }
    return (
      //Custoemr name, 
      <ScrollView style={[localStyles.container]}>
          <Text style={[localStyles.header]}>Place your order</Text>
          <View style={[localStyles.secondContainer]}>
          <SafeAreaView >
            <Card>
            <TextInput placeholder="Name"
              onChangeText={custName => setCustName(custName)} defaultValue={custName}
              placeholderTextColor="#b3cddf"
            >
            </TextInput>
            </Card>
            
            <Card>
           <Picker
            selectedValue={selectedGender}
            onValueChange={(itemValue, itemIndex) =>
            setSelectedGender(itemValue)
            }>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            </Picker>
            </Card>
            <Card>
            <TextInput placeholder="Passport Number"
              onChangeText={passport => setPassport(passport)} defaultValue={passport}
              placeholderTextColor="#b3cddf"
            >
            </TextInput>
            </Card>
            <Card>
            <Button title="Select Date" onPress={showDatePicker} />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <Text>Departure Date: {departureDate?departureDate:'Choose Your Date First'}</Text>
            <Text>Departure Time: {departureTime}</Text>
            <Text>Arrival Time: {arrivalTime}</Text>
            </Card>
          
            <Card>
           <Picker
            selectedValue={airClass}
            onValueChange={(itemValue, itemIndex) =>
            setAirClass(itemValue)
            }>
            <Picker.Item label="Economy Class" value="Economy Class" />
            <Picker.Item label="Business Class" value="Business Class" />
            <Picker.Item label="First Class" value="First Class" />
            </Picker>
            </Card>

            <Card>
           <Picker
            selectedValue={meal}
            onValueChange={(itemValue, itemIndex) =>
            setMeal(itemValue)
            }>
            <Picker.Item label="No Meal" value="No Meal" />
            <Picker.Item label="Meal 1" value="Meal 1" />
            <Picker.Item label="Meal 2" value="Meal 2" />
            </Picker>
            </Card>
            
            <Card>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text>Class Type:</Text>
              <Text>{airClass}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text>Ticket Price:</Text>
              <Text>${price*getPrice(airClass)}</Text>
              </View>
              
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text>Meal Price:</Text>
              <Text>${getPrice(meal)?getPrice(meal):0}</Text>
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text>Member Discount:</Text>
              <Text>${user?total-total*0.9:0}</Text>
              </View>
              <View style={{borderBottomColor: 'black', borderBottomWidth: 1,}}/>

              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text>Total:</Text>
              <Text>${user?total*0.9:total}</Text>
              </View>
              
            </Card>
           
          
          </SafeAreaView>
          
         <View>
           <Modal 
           visible={showModal}
           onRequestClose={()=>setShowModal(false)}>
             <WebView
             source={{uri:baseUrl}}
             onNavigationStateChange={data=>handleResponse(data)}
             injectedJavaScript={`
             document.getElementById('ticketPrice').value=${price*getPrice(airClass)};
             document.getElementById('mealPrice').value=${getPrice(meal)?getPrice(meal):0};
             document.getElementById('memberPrice').value=${user?total-total*0.9:0};
             document.f1.submit();
             `}
             />
           </Modal>

           <TouchableOpacity onPress={() => checkInput()} style={localStyles.button}>
           <Image
            source={require('../assets/paypal.png')}
            style={{width:260,height:50}}
            />
            
            </TouchableOpacity>
            
         </View>
          
          
          <TouchableOpacity onPress={() => navigation.goBack()} style={localStyles.button}>
          <Text style={localStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>
          </View>
  
      </ScrollView>
    )
  }
  const localStyles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: '#ECF0F1',
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
      borderRadius:5,
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