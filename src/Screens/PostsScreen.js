import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PostsScreen({ route, navigation }) {
  //   console.log("route.params", route.params);
  const [posts, setPosts] = useState([]);
  //   console.log(route.params);
  //   const { photo, state } = route.params;

  useEffect(() => {
    if (route.params) {
      setPosts((prevPosts) => [...prevPosts, [route.params]]);
    }
  }, [route.params]);

  console.log("posts", posts);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 32, marginHorizontal: 16 }}>
            <Image
              source={{ uri: item[0].photo }}
              style={{
                width: 343,
                height: 240,
                marginBottom: 8,
              }}
            />
            <Text
              style={{
                marginBottom: 8,
                fontFamily: "Roboto-Bold",
                fontSize: 16,
                LineHeight: 19,
              }}
            >
              {item[0].state.name}
            </Text>
            <Text style={{ marginLeft: "auto" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("CommentsScreen")}
              >
                <Text>
                  <Feather
                    //   style={{ position: "absolute" }}
                    name="message-circle"
                    size={24}
                    color="#bdbdbd"
                  />
                </Text>
              </TouchableOpacity>
              <Feather name="map-pin" size={24} color="#BDBDBD" />{" "}
              <TouchableOpacity
                onPress={() => navigation.navigate("MapScreen")}
              >
                <Text
                  style={{
                    marginBottom: 8,
                    fontFamily: "Roboto-Reg",
                    textDecorationLine: "underline",
                    fontSize: 16,
                    LineHeight: 19,
                  }}
                >
                  {item[0].state.location}
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
        )}
        keyExtractor={(_, idx) => idx.toString()}
      />
    </SafeAreaView>
  );
}
