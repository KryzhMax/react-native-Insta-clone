import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  Keyboard,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { createPostInitState, createPostInputs } from "./variables";
import { styles } from "../Component";

export default function CreatePostsScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(createPostInitState);
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    //   ------------------ НЕ УВЕРЕН, что это надо -----------
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

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onDismiss = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const takePicture = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      setPhoto(uri);
      let location = await Location.getCurrentPositionAsync({});

      //   setTimeout(() => {
      //     const asset = MediaLibrary.createAssetAsync(uri);
      //   }, 2000);
    }
  };

  const onPost = () => {
    if (state.name && state.location && photo) {
      navigation.navigate("NestedScreen", {
        screen: "PostsScreen",
        params: { photo, state },
      });
    } else {
      Alert.alert("Credentials", "Please fill out all fields to make a post!");
    }
  };

  const setCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  return (
    <View style={styles.cameraContainer}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
          <Camera
            style={styles.camera}
            type={type}
            // zoom={0}
            ref={(ref) => {
              setCamera(ref);
            }}
          >
            {photo && (
              <View
                style={styles.photoPreviewContainer}
                onPress={() => {
                  /*Открывать в полном размере в галерее*/
                }}
              >
                <Image source={{ uri: photo }} style={styles.preview} />
              </View>
            )}
            <View style={styles.photoView}>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={takePicture}
              >
                <View style={styles.takePhotoOut}>
                  <Feather
                    name="camera"
                    size={24}
                    color="rgba(255, 255, 255, 0.3)"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.flipContainer}
              onPress={setCameraType}
            >
              <MaterialIcons
                name={
                  Platform.OS === "android"
                    ? "flip-camera-android"
                    : "flip-camera-ios"
                }
                size={30}
                color="white"
                style={styles.flipText}
              />
            </TouchableOpacity>
          </Camera>
          <TouchableOpacity
            style={styles.reBtnContainer}
            onPress={() => {
              setPhoto("");
              //   MediaLibrary.deleteAlbumsAsync(albums, assetRemove);
            }}
          >
            <Text style={styles.reBtn}>Make another photo</Text>
          </TouchableOpacity>
          <View style={styles.createPostInputContainer}>
            {createPostInputs.map(
              ({ name, placeholderTextColor, placeholder }) => (
                <TextInput
                  style={styles.createPostInput}
                  key={name}
                  placeholder={placeholder}
                  placeholderTextColor={placeholderTextColor}
                  value={state[name]}
                  onChangeText={(val) =>
                    setState((prevState) => ({
                      ...prevState,
                      [name]: val,
                    }))
                  }
                />
              )
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ ...styles.btn, marginTop: 16 }}
              onPress={onPost}
              //   disabled={!state.name && !state.location && true}
              //   --------Try this ---------
              disabled={!state && true}
            >
              <Text style={styles.btnText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
