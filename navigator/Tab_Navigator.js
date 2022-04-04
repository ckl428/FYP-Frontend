import * as React from 'react';
import { Image } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import Bookmark from '../screens/Bookmark';


const homeComponent = (navigation) => (
  <Home navigation={navigation.navigation}/>
);

const settingComponent = (navigation) => (
  <Setting navigation={navigation.navigation}/>
);





  
 
  const Tab = createBottomTabNavigator();
  
  export default function Tab_Navigator() {
    return (
        <Tab.Navigator >
          <Tab.Screen name="Home" component={homeComponent} 
          options={{tabBarIcon:() => (<Image source={require("../assets/homeicon.png")} style={{width: 30, height: 30}} />)}}/>
          <Tab.Screen name="Setting" component={settingComponent} 
          options={{tabBarIcon:() => (<Image source={require("../assets/setting.png")} style={{width: 30, height: 30}} />)}}/>
          
        </Tab.Navigator>
    );
  }