import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../Component";

export default function PostsScreen({ route, navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevPosts) => [...prevPosts, route.params]);
    }
  }, [route.params]);

  return (
    <>
      <View style={styles.avatarBox}>
        <Image
          style={styles.avatar}
          source={require("../../src/assets/img/User.jpg")}
        />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.avatarPrimaryText}>Natali Romanova</Text>
          <Text style={styles.avatarSecondaryText}>email@example.com</Text>
        </View>
      </View>
      <SafeAreaView style={styles.postsList}>
        <FlatList
          data={posts}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            // console.log("item.photo", item.photo)
            <View style={styles.postItemContainer}>
              <Image source={{ uri: item.photo }} style={styles.postImg} />
              <Text style={styles.postTitle}>{item.state.name}</Text>
              <Text>
                <Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CommentsScreen", item.photo)
                    }
                  >
                    <Text>
                      <Feather
                        name="message-circle"
                        size={18}
                        color="#bdbdbd"
                      />
                      {"  "}
                      <Text style={{ ...styles.counter }}>0</Text>
                    </Text>
                  </TouchableOpacity>
                </Text>
                {"     "}
                <Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("MapScreen", {
                        screen: "MapScreen",
                        params: {
                          latitude: item.state.location.latitude,
                          longitude: item.state.location.longitude,
                        },
                      })
                    }
                  >
                    <Text>
                      <Feather name="map-pin" size={18} color="#BDBDBD" />
                      {"  "}
                      <Text style={styles.postLocation}>
                        {item.state.location.place}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </Text>
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}
