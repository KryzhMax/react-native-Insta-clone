import React, { useState, useEffect, useCallback } from "react";
import {
  Dimensions,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
  Image,
  // Button,
  //   Pressable,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
// import DropShadow from "react-native-drop-shadow";
import { styles } from "../Component";
import AddButton from "../utils/Button";
import { background, registrationInputs, regInitState } from "./variables";

export default function Registration({ navigation }) {
  // {
  // screenWidth,
  // isShowKeyboard,
  // setIsShowKeyboard,
  // onDismiss,
  // onInputFocus,
  // //   inputFocus,
  // onLayoutRootView: onLayout,
  // }
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [inputFocus, setInputFocus] = useState(false);
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(4);
  const [shadowRadius, setShadowRadius] = useState(4);
  const [shadowOpacity, setShadowOpacity] = useState(0.25);
  const [state, setState] = useState(regInitState);

  useEffect(() => {
    const onChange = () => {
      const windowWidth = Dimensions.get("window").width;
      // const windowHeight = Dimensions.get("window").height;
      setScreenWidth(windowWidth);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const [fontsLoaded] = useFonts({
    "Roboto-Reg": require("../assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onDismiss = () => {
    setIsShowKeyboard(false);
    setInputFocus(false);
    Keyboard.dismiss();
  };

  const onInputFocus = () => {
    setIsShowKeyboard(true);
  };

  const onRegister = () => {
    // Alert.alert(
    //   "Credentials",
    //   `${state.name} + ${state.email} + ${state.password}`
    // );
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(regInitState);

    if (state.name && state.email && state.password) {
      navigation.navigate("Home");
    } else {
      Alert.alert("Credentials", "Please fill out all fields!");
    }
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <ImageBackground source={background} style={styles.image}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? -90 : 0,
                width: screenWidth,
              }}
            >
              <View style={styles.box}>
                <View style={styles.avatarBox}>
                  <Image style={styles.avatar} />
                  <AddButton style={styles.addBtn} size={25} />
                </View>
                <View style={styles.formHeaderContainer}>
                  <Text style={styles.formHeaderText}>Registration</Text>
                </View>
                {registrationInputs.map(
                  ({ type, name, placeholderTextColor, placeholder }) => (
                    <TextInput
                      key={type}
                      placeholder={placeholder}
                      placeholderTextColor={placeholderTextColor}
                      value={state[name]}
                      secureTextEntry={type === "password" ? true : false}
                      onChangeText={(val) =>
                        setState((prevState) => ({
                          ...prevState,
                          [name]: val,
                        }))
                      }
                      onFocus={onInputFocus}
                      style={[
                        styles.input,
                        {
                          shadowOffset: {
                            width: shadowOffsetWidth,
                            height: shadowOffsetHeight,
                          },
                          shadowOpacity,
                          shadowRadius,
                        },
                      ]}
                    />
                  )
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={onRegister}
              >
                <Text style={styles.btnText}>Register</Text>
              </TouchableOpacity>
              <Text style={styles.signInText}>
                Already have an account?{" "}
                <Text
                  onPress={() => navigation.navigate("Login")}
                  style={styles.signInText}
                >
                  Sign In
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}
