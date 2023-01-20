import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Registration from "../Screens/RegistrationScreen";
import Login from "../Screens/LoginScreen";
import Home from "../Screens/Home";

const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function useRoute(isAuth) {
  return (
    <MainStack.Navigator initialRouteName="Login">
      {isAuth ? (
        <>
          <MainStack.Screen
            name="Registration"
            component={Registration}
            options={{ title: "", headerShown: false }}
          />
          <MainStack.Screen
            name="Login"
            component={Login}
            options={{ title: "", headerShown: false }}
          />
        </>
      ) : (
        <>
          <MainStack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </MainStack.Navigator>
  );
}
