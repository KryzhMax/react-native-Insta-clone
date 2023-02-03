import React, { useState, useEffect, createRef } from "react";
import {
  Dimensions,
  Keyboard,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
// import DropShadow from "react-native-drop-shadow";
import { authSignInUser } from "../redux/auth/authOperations";
import {
  background,
  registrationInputs,
  loginInitState,
  switchToNextInput,
} from "./variables";
import { styles } from "../Component";

export default function Login({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [inputFocus, setInputFocus] = useState(false);
  const [isPassword, setIsPassword] = useState(true);

  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(4);
  const [shadowRadius, setShadowRadius] = useState(4);
  const [shadowOpacity, setShadowOpacity] = useState(0.25);
  const [state, setState] = useState(loginInitState);

  const dispatch = useDispatch();

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

  const onDismiss = () => {
    setIsShowKeyboard(false);
    setInputFocus(false);
    Keyboard.dismiss();
  };

  const refInputEmail = createRef();
  const refInputPassword = createRef();

  const onInputFocus = () => {
    setIsShowKeyboard(true);
  };

  const onLogin = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    setState(loginInitState);

    if (state.email && state.password) {
      navigation.navigate("Home");
    } else {
      Alert.alert("Credentials", "Please fill out all fields!");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <ImageBackground source={background} style={styles.image}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? -10 : 0,
                width: screenWidth,
              }}
            >
              <View style={styles.box}>
                <View style={styles.formHeaderContainer}>
                  <Text style={styles.formHeaderText}>Log in</Text>
                </View>
                {registrationInputs
                  .slice(1, 3)
                  .map(({ type, name, placeholderTextColor, placeholder }) => (
                    <TextInput
                      key={type}
                      placeholder={placeholder}
                      placeholderTextColor={placeholderTextColor}
                      value={state[name]}
                      secureTextEntry={type === "password" ? isPassword : false}
                      onChangeText={(val) =>
                        setState((prevState) => ({
                          ...prevState,
                          [name]: type === "email" ? val.toLowerCase() : val,
                        }))
                      }
                      onSubmitEditing={() =>
                        type === "email"
                          ? switchToNextInput(refInputPassword)
                          : onLogin
                      }
                      onFocus={() => onInputFocus()}
                      ref={type === "email" ? refInputEmail : refInputPassword}
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
                  ))}
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={onLogin}
              >
                <Text style={styles.btnText}>Log in</Text>
              </TouchableOpacity>
              <Text style={styles.signInText}>
                Don't have an account?{" "}
                <Text
                  onPress={() => navigation.navigate("Registration")}
                  style={styles.linkText}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}

import { useIsFocused } from "@react-navigation/native";

// ...
// -----------ФУНКЦИЯ НА ШЕДОУ-----------
// function Profile() {
//   const isFocused = useIsFocused();

//   return <Text>{isFocused ? "focused" : "unfocused"}</Text>;
// }
