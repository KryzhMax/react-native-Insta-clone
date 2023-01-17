import React, { useState } from "react";
import {
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
  //   Pressable,
} from "react-native";
// import DropShadow from "react-native-drop-shadow";
import { styles } from "../Component";
import { background, registrationInputs, loginInitState } from "./variables";

export default function LogIn({
  screenWidth,
  isShowKeyboard,
  setIsShowKeyboard,
  onDismiss,
  onInputFocus,
  //   inputFocus,
}) {
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(4);
  const [shadowRadius, setShadowRadius] = useState(4);
  const [shadowOpacity, setShadowOpacity] = useState(0.25);
  const [state, setState] = useState(loginInitState);

  const onLogin = () => {
    Alert.alert("Credentials", `${state.email} + ${state.password}`);
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(loginInitState);
  };

  return (
    <View style={styles.container}>
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
                Don't have an account? Sign Up
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}
