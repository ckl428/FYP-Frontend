
// import React in our code
import * as React from 'react';
import { useState } from 'react';
//import AppIntroSlider to use it
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';


function Intro({navigation,route}){
  const [showRealApp, setShowRealApp] = useState(false);
  const onDone = () => {
    setShowRealApp(true);
    navigation.navigate('Tab_Navigator');
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Text style={styles.introTextStyle}>{item.text}</Text>
        <Image style={styles.introImageStyle} source={item.image} />
       
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.buttonText}>CONTINUE</Text>
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={styles.buttonText}>LET'S START</Text>
      </View>
    );
  };

  return (
    <>
      { (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          renderNextButton={_renderNextButton}
          renderDoneButton={_renderDoneButton}
          onDone={onDone}
          bottomButton={true}
          dotStyle={{backgroundColor: '#B3CDDF'}}
          activeDotStyle={{backgroundColor:'#145f95'}}
        />
      )}
    </>
  );
}

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
    color:'black',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color:'black',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
    color:'black',
  },
  introImageStyle: {
    width: 300,
    height: 300,
    marginBottom:'50%'
    
  },
  introTextStyle: {
    marginBottom: '20%',
    color: '#145F95',
    fontSize: 18,
    textAlign: 'center',
    marginTop:'5%',
    marginLeft:'10%',
    marginRight:'10%'
  },
  introTitleStyle: {
    fontSize: 45,
    color: '#145F95',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop:'20%'
  },
  buttonCircle: {
    width: '100%',
    height:50,
    backgroundColor: '#145F95',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonText:{
    color:'white',
    fontSize: 25,
    fontWeight: 'bold',
  }
});

const slides = [
  {
    key: 's1',
    text: 'Browse different ticket here',
    title: 'Ticket',
    image: require('../assets/intro1.png'),
    backgroundColor: '#fff',
  },
  
  {
    key: 's2',
    title: 'Air Ticket',
    text: 'Start your journey here',
    image: require('../assets/intro2.png'),
    backgroundColor: '#ffff',
  },
 
  {
    key: 's3',
    title: 'Concert ticket',
    text: 'Enjoy the live show',
    image: require('../assets/intro3.png'),
    backgroundColor: '#ffff',
  },
/*
  {
    key: 's4',
    title: 'Prescription',
    text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offcia deserunt',
    image: require('./assets/intro4.png'),
    backgroundColor: '#ffff',
  },
  {
    key: 's5',
    title: 'Shop',
    text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui offcia deserunt',
    image: require('./assets/intro5.png'),
    backgroundColor: '#ffff',
  },
  */

];
