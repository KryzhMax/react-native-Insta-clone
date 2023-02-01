import React, { useState, useEffect, createRef } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { authRegisterUser } from "../redux/auth/authOperations";
// import DropShadow from "react-native-drop-shadow";
import { styles } from "../Component";
import AddButton from "../utils/Button";
import {
  background,
  registrationInputs,
  regInitState,
  switchToNextInput,
} from "./variables";

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
  const [isPassword, setIsPassword] = useState(true);
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

  const switchPassword = () => {
    setIsPassword(!isPassword);
  };

  const onInputFocus = () => {
    setIsShowKeyboard(true);
  };

  const onPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      canceled: false,
    });

    if (!result.canceled) {
      setState((prevState) => ({
        ...prevState,
        avatar: result.assets[0].uri,
      }));
    }
  };

  const onRegister = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    dispatch(authRegisterUser(state));
    setState(regInitState);

    const validEmail = state.email.match(/\S+@\S+\.\S+/);
    const validPass = state.password.length >= 6;

    if (state.name && validEmail && validPass && state.avatar) {
      navigation.navigate("Home");
    } else {
      Alert.alert(
        "Credentials: ",
        "Password should be min 6 symbols and email should be valid"
      );
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
                <View style={styles.avatarBoxReg}>
                  <Image
                    style={styles.avatarReg}
                    source={{ uri: state.avatar }}
                  />
                  <AddButton
                    onPress={onPress}
                    style={styles.addBtn}
                    size={25}
                  />
                </View>
                <View style={styles.formHeaderContainer}>
                  <Text style={styles.formHeaderText}>Registration</Text>
                </View>
                {registrationInputs.map(
                  ({ type, name, placeholderTextColor, placeholder }) => (
                    <View>
                      <TextInput
                        key={type}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        value={state[name]}
                        secureTextEntry={
                          type === "password" ? isPassword : false
                        }
                        onChangeText={(val) =>
                          setState((prevState) => ({
                            ...prevState,
                            [name]: val.toLowerCase(),
                          }))
                        }
                        onSubmitEditing={() =>
                          type === "name"
                            ? switchToNextInput(refInputEmail)
                            : type === "email"
                            ? switchToNextInput(refInputPassword)
                            : onRegister
                        }
                        onFocus={() => onInputFocus()}
                        ref={
                          type === "name"
                            ? null
                            : type === "email"
                            ? refInputEmail
                            : type === "password"
                            ? refInputPassword
                            : null
                        }
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
                      {type === "password" && (
                        <Ionicons
                          style={{ position: "absolute", top: 8, right: 10 }}
                          name={
                            isPassword
                              ? "ios-eye-outline"
                              : "ios-eye-off-outline"
                          }
                          size={24}
                          color="#bdbdbd"
                          onPress={() => switchPassword()}
                        />
                      )}
                    </View>
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
