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
  Image,
  //   Pressable,
} from "react-native";
// import DropShadow from "react-native-drop-shadow";
import { styles } from "../Component";
import Button from "../utils/Button";
import { background, registrationInputs, regInitState } from "./variables";

export default function Registration({
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
  const [state, setState] = useState(regInitState);

  const onRegister = () => {
    Alert.alert(
      "Credentials",
      `${state.name} + ${state.email} + ${state.password}`
    );
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(regInitState);
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
                <View style={styles.avatarBox}>
                  <Image style={styles.avatar} />
                  <Button style={styles.addBtn} size={25} />
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
                Already have an account? Sign In
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
}
