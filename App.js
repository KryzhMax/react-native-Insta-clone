import React /*{ useState, useEffect, useCallback }*/ from "react";
// import { /*Dimensions, Keyboard,*/ Button } from "react-native";
// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import Registration from "./src/Screens/RegistrationScreen";
import Login from "./src/Screens/LoginScreen";
import Home from "./src/Screens/Home";

const MainStack = createStackNavigator();

export default function App() {
  // --------------------------------------------------------------ДУБЛИРОВАНИЕ КОДА
  // const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [screenWidth, setScreenWidth] = useState(
  //   Dimensions.get("window").width
  // );
  // const [inputFocus, setInputFocus] = useState(false);

  // useEffect(() => {
  //   const onChange = () => {
  //     const windowWidth = Dimensions.get("window").width;
  //     // const windowHeight = Dimensions.get("window").height;
  //     setScreenWidth(windowWidth);
  //   };
  //   const subscription = Dimensions.addEventListener("change", onChange);
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  // const [fontsLoaded] = useFonts({
  //   "Roboto-Reg": require("./src/assets/fonts/Roboto/Roboto-Regular.ttf"),
  //   "Roboto-Bold": require("./src/assets/fonts/Roboto/Roboto-Bold.ttf"),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

  // const onDismiss = () => {
  //   setIsShowKeyboard(false);
  //   setInputFocus(false);
  //   Keyboard.dismiss();
  // };

  // const onInputFocus = () => {
  //   setIsShowKeyboard(true);
  // };
  // ------------------------------------------------ДУБЛИРОВАНИЕ КОДА

  // const props = {
  //   screenWidth: screenWidth,
  //   isShowKeyboard: isShowKeyboard,
  //   keyboard: setIsShowKeyboard,
  //   dismiss: onDismiss(),
  //   input: onInputFocus(),
  //   inputFocusing: inputFocus,
  //   onLayout: onLayoutRootView(),
  // };

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Registration">
        <MainStack.Screen
          name="Registration"
          component={
            Registration
            // <Registration
            //   screenWidth={screenWidth}
            //   isShowKeyboard={isShowKeyboard}
            //   setIsShowKeyboard={setIsShowKeyboard}
            //   onDismiss={onDismiss}
            //   onInputFocus={onInputFocus}
            //   inputFocus={inputFocus}
            //   onLayout={onLayoutRootView}
            // />
          }
          options={{ title: "" }}
        />
        {/* <MainStack.Screen
          name="Login">
          {(props) => <Login {...props} />}
        </MainStack.Screen> */}
        <MainStack.Screen
          name="Login"
          component={Login}
          options={{ title: "" }}
          // <Login
          //   screenWidth={screenWidth}
          //   isShowKeyboard={isShowKeyboard}
          //   setIsShowKeyboard={setIsShowKeyboard}
          //   onDismiss={onDismiss}
          //   onInputFocus={onInputFocus}
          //   inputFocus={inputFocus}
          //   onLayout={onLayoutRootView}
          // />
          // options={props}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home screen",
            headerStyle: {
              // backgroundColor: "#f4511e",
              backgroundColor: "#fff",
            },
            headerTintColor: "#fff",
            // headerTitleStyle: {
            //   fontWeight: "bold",
            //   fontSize: 20,
            // },
            headerRight: () => (
              <Feather
                onPress={() => alert("Imagine you've logged out!")}
                name="log-out"
                size={24}
                color="#BDBDBD"
              />
            ),
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
