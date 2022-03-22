import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import Cart from '../screens/Cart';


const homeComponent = (navigation) => (
  <Home navigation={navigation.navigation}/>
);

const settingComponent = (navigation) => (
  <Setting navigation={navigation.navigation}/>
);

const cartComponent = (navigation) => (
  <Cart navigation={navigation.navigation}/>
);



  
 
  const Tab = createBottomTabNavigator();
  
  export default function Tab_Navigator() {
    return (
        <Tab.Navigator >
          <Tab.Screen name="Home" component={homeComponent} />
          <Tab.Screen name="Shopping Cart" component={cartComponent} />
          <Tab.Screen name="Setting" component={settingComponent} />
          
        </Tab.Navigator>
    );
  }