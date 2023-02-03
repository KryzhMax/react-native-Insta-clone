import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Registration from "../Screens/RegistrationScreen";
import Login from "../Screens/LoginScreen";
import Home from "../Screens/Home";

const MainStack = createStackNavigator();

export default function useRoute(isAuth) {
  return (
    <MainStack.Navigator initialRouteName="Login">
      {!isAuth ? (
        <MainStack.Group>
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
        </MainStack.Group>
      ) : (
        <MainStack.Group>
          <MainStack.Screen
            name="Home"
            component={Home}
            // children={() => {
            //   return <Home />;
            // }}
            options={{
              headerShown: false,
            }}
          />
        </MainStack.Group>
      )}
    </MainStack.Navigator>
  );
}
