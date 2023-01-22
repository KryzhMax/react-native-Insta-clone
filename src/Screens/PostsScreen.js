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
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <FlatList
        data={posts}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 32, marginHorizontal: 16 }}>
            <Image
              source={{ uri: item.photo }}
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
              {item.state.name}
            </Text>
            <Text>
              <Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CommentsScreen")}
                >
                  <Text>
                    <Feather name="message-circle" size={18} color="#bdbdbd" />
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
                    <Text
                      style={{
                        fontFamily: "Roboto-Reg",
                        textDecorationLine: "underline",
                        fontSize: 16,
                        lineHeight: 19,
                      }}
                    >
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
  );
}
