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
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Registration from "./Screens/RegistrationScreen";
import { styles } from "./Component";
import Button from "./utils/Button";

const background = require("./assets/img/background.jpeg");
const initState = {
  name: "",
  email: "",
  password: "",
};

export default function App() {
  const [state, setState] = useState(initState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [inputFocus, setInputFocus] = useState(false);

  const [fontsLoaded] = useFonts({
    "Roboto-Reg": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    const onChange = () => {
      const windowWidth = Dimensions.get("window").width;
      // const windowHeight = Dimensions.get("window").height;
      setScreenWidth(windowWidth);
      // console.log("width", windowWidth);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // const [isReady, setIsReady] = useState(false);

  const onRegister = () => {
    Alert.alert(
      "Credentials",
      `${state.name} + ${state.email} + ${state.password}`
    );
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initState);
  };

  const onDismiss = () => {
    setIsShowKeyboard(false);
    setInputFocus(false);
    Keyboard.dismiss();
    // setState(initState);
  };

  const onInputFocus = () => {
    setInputFocus(true);
    setIsShowKeyboard(true);
  };

  return (
    // <Registration
    //   dimensions={screenWidth}
    //   isShowKeyboard={isShowKeyboard}
    //   setIsShowKeyboard={setIsShowKeyboard}
    //   onDismiss={onDismiss}
    // />

    <View style={styles.container} onLayout={onLayoutRootView}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <ImageBackground source={background} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? -180 : 0,
                width: screenWidth,
              }}
            >
              <View style={styles.box}>
                <View style={styles.avatarBox}>
                  <Image style={styles.avatar} />
                  <Button style={styles.addBtn} size={25} />
                </View>
                <View style={styles.formHeaderContainer}>
                  <Text style={styles.formHeaderText}>Registration</Text>
                </View>

                <TextInput
                  placeholder="Username"
                  placeholderTextColor="#BDBDBD"
                  value={state.name}
                  onChangeText={
                    (val) =>
                      setState((prevState) => ({ ...prevState, name: val }))
                    // formHandler(val)
                  }
                  onFocus={onInputFocus}
                  // onFocus={() => setIsShowKeyboard(true)}
                  style={
                    inputFocus ? [styles.input, styles.focus] : styles.input
                  }
                  textAlign={"center"}
                />
                <TextInput
                  placeholder="Email"
                  value={state.email}
                  // onChangeText={(val) => formHandler(val)}
                  onChangeText={(val) =>
                    setState((prevState) => ({ ...prevState, email: val }))
                  }
                  onFocus={onInputFocus}
                  // onFocus={() => setIsShowKeyboard(true)}
                  style={
                    inputFocus ? [styles.input, styles.focus] : styles.input
                  }
                  textAlign={"center"}
                />
                <TextInput
                  placeholder="Password"
                  value={state.password}
                  secureTextEntry={true}
                  // onChangeText={(val) => formHandler(val)}
                  onChangeText={(val) =>
                    setState((prevState) => ({ ...prevState, password: val }))
                  }
                  onFocus={onInputFocus}
                  // onFocus={() => setIsShowKeyboard(true)}
                  style={
                    inputFocus ? [styles.input, styles.focus] : styles.input
                  }
                  textAlign={"center"}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={onRegister}
              >
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
              <Text style={styles.signInText}>
                Already have an account? Sign In
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}
