import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../Component";

export default function CreatePostsScreen() {
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      setPhoto(uri);
      await MediaLibrary.createAssetAsync(uri);
    }
  };

  return (
    <View style={styles.cameraContainer}>
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
          <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
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
          onPress={() => {
            setType(
              type === CameraType.back ? CameraType.front : CameraType.back
            );
          }}
        >
          {/* <Text style={styles.flipText}> Flip camera </Text> */}
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
        style={{ marginTop: 8, marginLeft: 16 }}
        onPress={() => {
          setPhoto("");
        }}
      >
        <Text style={styles.sendBtn}>Make another photo</Text>
      </TouchableOpacity>
      <View>
        <TextInput></TextInput>
        <TextInput></TextInput>
      </View>
    </View>
  );
}

// import React from "react";
// import {
//   View,
//   Text,
//   Button,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
//   TouchableHighlight,
// } from "react-native";

// export default function CreatePostsScreen() {
//   const onPressButton = () => {
//     alert("You tapped the button!");
//   };

//   const onLongPress = () => {
//     alert("Long press activated!");
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Button onPress={onPressButton} title="Press Me" />
//       <TouchableWithoutFeedback onLongPress={onLongPress}>
//         <Text>TouchableWithoutFeedback</Text>
//       </TouchableWithoutFeedback>
//       <TouchableOpacity onLongPress={onLongPress}>
//         <Text>TouchableOpacity</Text>
//       </TouchableOpacity>
//       <TouchableHighlight onLongPress={onLongPress}>
//         <Text>TouchableHighlight</Text>
//       </TouchableHighlight>
//     </View>
//   );
// }
