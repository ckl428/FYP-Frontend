import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Intro from "../pages/Intro";
import Tab_Navigator from "./Tab_Navigator";
import AddTicket from "../screens/AddTicket";
import Detail from "../screens/Detail";
import MyOrder from "../screens/MyOrder";
import OrderTicket from "../screens/OrderTicket";
import GuestOrder from "../screens/GuestOrder";
import Receipt from "../screens/Receipt";
import UpdateOrder from "../screens/UpdateOrder";
import UpdateOrderForm from "../screens/UpdateOrderForm";
import DeleteOrder from "../screens/DeleteOrder";
import Bookmark from "../screens/Bookmark"





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
  const myOrderComponent = (navigation,route) => (
    <MyOrder navigation={navigation.navigation} route={navigation.route}/>
  );
  const orderTicketComponent = (navigation,route) => (
    <OrderTicket navigation={navigation.navigation} route={navigation.route}/>
  );
  const guestOrderComponent = (navigation,route) => (
    <GuestOrder navigation={navigation.navigation} route={navigation.route}/>
  );
  const receiptComponent = (navigation,route) => (
    <Receipt navigation={navigation.navigation} route={navigation.route}/>
  );
  const updateOrderComponent = (navigation,route) => (
    <UpdateOrder navigation={navigation.navigation} route={navigation.route}/>
  );
  const updateOrderFormComponent = (navigation,route) => (
    <UpdateOrderForm navigation={navigation.navigation} route={navigation.route}/>
  );
  const deleteOrderComponent = (navigation,route) => (
    <DeleteOrder navigation={navigation.navigation} route={navigation.route}/>
  );
  const bookMarkComponent = (navigation,route) => (
    <Bookmark navigation={navigation.navigation} route={navigation.route}/>
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
        <Stack.Screen
          name="MyOrder"
          component={myOrderComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderTicket"
          component={orderTicketComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GuestOrder"
          component={guestOrderComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Receipt"
          component={receiptComponent}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="UpdateOrder"
          component={updateOrderComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateOrderForm"
          component={updateOrderFormComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DeleteOrder"
          component={deleteOrderComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bookmark"
          component={bookMarkComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App_Navigator;
