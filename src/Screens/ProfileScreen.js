import { useState, useEffect, Component } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { Feather, EvilIcons, FontAwesome5 } from "@expo/vector-icons";

import { postsSelector } from "../redux/posts/postsSelectors";
import {
  selectUserId,
  selectName,
  // selectPhoto,
} from "../redux/auth/authSelectors";
import { styles } from "../Component";
import { onLogOut } from "../hooks/useLogout";

export default function ProfileScreen({ navigation }) {
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectName);
  // const userPhoto = useSelector(selectPhoto);
  const posts = useSelector(postsSelector);

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  const getOwnerPosts = () => {
    return posts.filter((post) => post.id === userId);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/img/background.jpeg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.postItemContainer}>
          <View /*style={styles.logout}*/>
            <Feather
              onPress={onLogOut}
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={styles.logout}
            />
          </View>
          <Text style={styles.avatarPrimaryText}>{userName}</Text>
          <View style={styles.avatarBox}>
            {/* <Image source={{ uri: userPhoto }} style={styles.avatar} /> */}
            {/* -------------переиспользовать AddButton------------- */}
            <TouchableOpacity
              style={styles.addBtn}
              activeOpacity={0.7}
              accessibilityLabel="add avatar"
            >
              <View style={{ backgroundColor: "#FFFFFF", borderRadius: 50 }}>
                {!userPhoto ? (
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                ) : (
                  <AntDesign name="closecircleo" size={24} color="#BDBDBD" />
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
                  marginBottom: 20,
                }}
              >
                <Image
                  source={{ uri: item.photo }}
                  style={{
                    ...styles.postImg,
                    // width: windowWidth - 16 * 2,
                  }}
                />
                <Text style={styles.postTitle}>{item.title}</Text>
                <View style={styles.linksContainer}>
                  <View /*style={styles.wrap}*/>
                    <TouchableOpacity
                      // style={styles.link}
                      activeOpacity={0.7}
                      onPress={() => {
                        navigation.navigate("CommentsScreen", {
                          photo: item.photo,
                          id: item.id,
                        });
                      }}
                    >
                      <FontAwesome5
                        name="comment-dots"
                        size={25}
                        color="#FF6C00"
                      />
                      <Text style={{ ...styles.counter, marginLeft: 6 }}>
                        {item.comments.length}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      // style={{ ...styles.link, marginLeft: 25 }}
                      activeOpacity={0.7}
                      onPress={() => {
                        console.log("like");
                      }}
                    >
                      <EvilIcons name="like" size={35} color="#FF6C00" />
                      <Text style={styles.counter}>0</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    // style={styles.link}
                    activeOpacity={0.7}
                    onPress={() => {
                      navigation.navigate("MapScreen", {
                        screen: "MapScreen",
                        params: {
                          latitude: item.location.latitude,
                          longitude: item.location.longitude,
                          place: item.location.place,
                        },
                      });
                    }}
                  >
                    <Feather name="map-pin" size={18} color="#BDBDBD" />
                    <Text style={styles.postLocation}>
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
