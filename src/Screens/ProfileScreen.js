import { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Feather, EvilIcons } from "@expo/vector-icons";

import { postsSelector } from "../redux/posts/postsSelectors";
import {
  selectUserId,
  selectName,
  selectPhoto,
} from "../redux/auth/authSelectors";
// import { styles } from "../Component";

import { getPosts } from "../redux/posts/postsOperations";
import { onLogOut } from "../hooks/useLogout";

export default function ProfileScreen({ navigation }) {
  const [counter, setCounter] = useState(0);
  const [ava, setAva] = useState("");
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectName);
  const userPhoto = useSelector(selectPhoto);
  const posts = useSelector(postsSelector);
  const dispatch = useDispatch();
  // console.log("userPhoto", userPhoto);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    dispatch(getPosts());

    const onChange = () => {
      const windowWidth = Dimensions.get("window").width;
      setScreenWidth(windowWidth);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const getOwnerPosts = () => {
    return posts.filter((post) => post.userId === userId);
  };

  const onLikeBtn = () => {
    if (counter > 0) {
      setCounter((count) => count - 1);
    } else {
      setCounter((count) => count + 1);
    }
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
      setAva((prevState) => ({
        ...prevState,
        avatar: result.assets[0].uri,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/img/background.jpeg")}
        resizeMode="cover"
        style={styles.profileImage}
      >
        <View style={styles.postsContainer}>
          <View>
            <Feather
              onPress={onLogOut}
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={styles.logout}
            />
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <View style={styles.avatarBox}>
            <Image source={{ uri: userPhoto }} style={styles.avatar} />
            <TouchableOpacity
              style={styles.avatarBtn}
              activeOpacity={0.7}
              accessibilityLabel="add avatar"
            >
              <View style={{ backgroundColor: "#fff", borderRadius: 50 }}>
                {!userPhoto ? (
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color="#FF6C00"
                    onPress={onPress}
                  />
                ) : (
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color="#BDBDBD"
                    onPress={onPress}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            data={getOwnerPosts()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#fff",
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{ uri: item.photo }}
                  style={{
                    ...styles.photo,
                  }}
                />
                <Text style={styles.photoTitle}>{item.title}</Text>
                <View style={styles.navigationContainer}>
                  <View style={styles.wrapper}>
                    <TouchableOpacity
                      style={styles.navLink}
                      activeOpacity={0.7}
                      onPress={() => {
                        navigation.navigate("NestedScreen", {
                          screen: "CommentsScreen",
                          params: {
                            photo: item.photo,
                            id: item.id,
                          },
                        });
                      }}
                    >
                      <Feather name="message-circle" size={22} color="tomato" />
                      <Text style={{ ...styles.count, marginLeft: 6 }}>
                        {item.comments.length}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ ...styles.navLink, marginLeft: 25 }}
                      activeOpacity={0.7}
                      onPress={onLikeBtn}
                    >
                      <EvilIcons name="like" size={32} color="#FF6C00" />
                      <Text style={styles.count}>{counter}</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.navLink}
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate("NestedScreen", {
                        screen: "MapScreen",
                        params: {
                          latitude: item.location.latitude,
                          longitude: item.location.longitude,
                          place: item.location.place,
                        },
                      })
                    }
                  >
                    <Feather name="map-pin" size={18} color="#bdbdbd" />
                    <Text style={styles.locationPlace}>
                      {item.location.place}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  postsContainer: {
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 75,
    paddingHorizontal: 16,
    marginTop: 130,
  },
  avatarBox: {
    position: "absolute",
    right: "55%",
    top: 0,
    transform: [{ translateX: 60 }, { translateY: -60 }],
    width: 120,
    height: 120,
    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  avatarBtn: {
    position: "absolute",
    bottom: 15,
    left: 105,
    width: 25,
    height: 25,
  },
  userName: {
    fontSize: 30,
    fontFamily: "Roboto-Reg",
    textAlign: "center",
    color: "#212121",
    marginBottom: 26,
  },
  logout: {
    position: "absolute",
    top: -55,
    right: 16,
  },
  photo: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  photoTitle: {
    fontFamily: "Roboto-Reg",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
    marginTop: 8,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wrapper: {
    flexDirection: "row",
  },
  navLink: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontFamily: "Roboto-Reg",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationPlace: {
    fontFamily: "Roboto-Reg",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
    marginLeft: 3,
  },
});
