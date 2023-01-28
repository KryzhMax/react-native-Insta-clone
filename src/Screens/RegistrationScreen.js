import React, { useState, useEffect } from "react";
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
  //   Pressable,
} from "react-native";
import { useDispatch } from "react-redux";
import { authRegisterUser } from "../redux/auth/authOperations";
// import DropShadow from "react-native-drop-shadow";
import { styles } from "../Component";
import AddButton from "../utils/Button";
import { background, registrationInputs, regInitState } from "./variables";

export default function Registration({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [inputFocus, setInputFocus] = useState(false);
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(null);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(4);
  const [shadowRadius, setShadowRadius] = useState(4);
  const [shadowOpacity, setShadowOpacity] = useState(0.25);
  const [state, setState] = useState(regInitState);
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

  const onInputFocus = () => {
    setIsShowKeyboard(true);
  };

  const onRegister = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    dispatch(authRegisterUser(state));
    // console.log("RegState", state);
    setState(regInitState);

    if (state.name && state.email && state.password) {
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
                marginBottom: isShowKeyboard ? -90 : 0,
                width: screenWidth,
              }}
            >
              <View style={styles.box}>
                <View style={styles.avatarBox}>
                  <Image
                    style={styles.avatar}
                    source={require("../../src/assets/img/User.jpg")}
                  />
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
                          [name]: val.toLocaleLowerCase(),
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
                  style={styles.linkText}
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
