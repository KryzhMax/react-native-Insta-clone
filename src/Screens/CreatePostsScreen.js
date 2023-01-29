import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  Keyboard,
  TextInput,
  // Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
// import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// import { uploadPhotoToServer } from "../firebase/uploadPhoto";
import { createPostInitState, createPostInputs } from "./variables";
import { selectUserId } from "../redux/auth/authSelectors";
// import { uploadCommentToServer } from "../firebase/firestore";
import { uploadDataToServer } from "../redux/auth/authOperations";
import { styles } from "../Component";

export default function CreatePostsScreen({ navigation }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(createPostInitState);
  const [location, setLocation] = useState({});

  const userIdRef = useSelector(selectUserId);
  const dispatch = useDispatch();
  //   const [screenWidth, setScreenWidth] = useState(
  //     Dimensions.get("window").width
  //   );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");

      let location = await Location.getCurrentPositionAsync({});

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setLocation(coords);
    })();

    //   ------------------ НЕ УВЕРЕН, что это надо -----------
    // const onChange = () => {
    //   const windowWidth = Dimensions.get("window").width;
    //   // const windowHeight = Dimensions.get("window").height;
    //   setScreenWidth(windowWidth);
    // };
    // const subscription = Dimensions.addEventListener("change", onChange);
    // return () => {
    //   subscription.remove();
    // };
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

  const onChangeText = (val, input) => {
    setState((prevState) => ({
      ...prevState,
      [input]: val,
    }));

    if (input === "name") {
      if (state.location && val && photo) {
        setIsDisabled(false);
      }
    } else {
      if (state.name && photo) {
        setIsDisabled(false);
      }
    }
    if (!val) {
      setIsDisabled(true);
    }
  };

  const getLocation = async () => {
    const picturePlace = await Location.reverseGeocodeAsync(location);
    const placePosition = {
      ...location,
      place: `${picturePlace[0].region}, ${picturePlace[0].country}`,
    };

    onChangeText(placePosition, "location");
  };

  const takePicture = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      setPhoto(uri);
      getLocation();

      //   setTimeout(() => {
      //     const asset = MediaLibrary.createAssetAsync(uri);
      //   }, 2000);
    }
  };

  const onPost = () => {
    if (state.name && state.location && photo) {
      setIsDisabled(true);

      const post = {
        title: state.name,
        location: state.location,
        photo: photo,
        userId: userIdRef,
      };

      dispatch(uploadDataToServer(post));

      navigation.navigate("NestedScreen", {
        screen: "PostsScreen",
        params: { photo, state },
        // params: { photo, post },
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
              onChangeText("", "location");
              setIsDisabled(true);
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
                  value={state[name]?.place}
                  onChangeText={(val) => onChangeText(val, [name])}
                />
              )
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                ...styles.publishBtn,
                marginTop: 16,
                backgroundColor: isDisabled ? "#F6F6F6" : "#FF6C00",
              }}
              onPress={onPost}
              disabled={isDisabled}
            >
              <Text
                style={{
                  ...styles.btnText,
                  color: isDisabled ? "#bdbdbd" : "#fff",
                }}
              >
                Publish
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
