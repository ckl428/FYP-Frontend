import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Intro from "../pages/Intro";
import Tab_Navigator from "./Tab_Navigator";
import AddTicket from "../screens/AddTicket";
import Detail from "../screens/Detail";




function App_Navigator() {

  
  //Declare components first
  const Stack = createStackNavigator();
  const loginComponent = (navigation) => (
    <Login navigation={navigation.navigation}/>
  );
  const createComponent = (navigation) => (
    <Register navigation={navigation.navigation} />
  );
  const introComponent = (navigation) => (
    <Intro navigation={navigation.navigation} />
  );
  const tabComponent = (navigation) => (
    <Tab_Navigator navigation={navigation.navigation}/>
  );
  const addTicketComponent = (navigation) => (
    <AddTicket navigation={navigation.navigation}/>
  );
  const detailComponent = (navigation,route) => (
    <Detail navigation={navigation.navigation} route={navigation.route}/>
  );

 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={loginComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={createComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Intro"
          component={introComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tab_Navigator"
          component={tabComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddTicket"
          component={addTicketComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Detail"
          component={detailComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App_Navigator;
