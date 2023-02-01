import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { postsSelector } from "../redux/posts/postsSelectors";
import {
  selectName,
  selectEmail,
  selectPhoto,
} from "../redux/auth/authSelectors";
import { getPosts } from "../redux/posts/postsOperations";
import { styles } from "../Component";

export default function PostsScreen({ navigation }) {
  const postsRef = useSelector(postsSelector);
  const userNameRef = useSelector(selectName);
  const userEmailRef = useSelector(selectEmail);
  const userPhotoRef = useSelector(selectPhoto);
  console.log("userPhotoRef", userPhotoRef);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <>
      <View style={styles.avatarBox}>
        <Image style={styles.avatar} source={{ uri: userPhotoRef }} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.avatarPrimaryText}>{userNameRef}</Text>
          <Text style={styles.avatarSecondaryText}>{userEmailRef}</Text>
        </View>
      </View>
      <SafeAreaView style={styles.postsList}>
        <FlatList
          data={postsRef}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={styles.postItemContainer}>
              <Image source={{ uri: item.photo }} style={styles.postImg} />
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text>
                <Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("CommentsScreen", {
                        photo: item.photo,
                        id: item.id,
                        userId: item.userId,
                      })
                    }
                  >
                    <Text>
                      <Feather
                        name="message-circle"
                        size={18}
                        color="#bdbdbd"
                      />
                      {"  "}
                      <Text style={{ ...styles.counter }}>
                        {item.comments.length}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </Text>
                {"     "}
                <Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("MapScreen", {
                        latitude: item.location.latitude,
                        longitude: item.location.longitude,
                        place: item.location.place,
                      })
                    }
                  >
                    <Text>
                      <Feather name="map-pin" size={18} color="#BDBDBD" />
                      {"  "}
                      <Text style={styles.postLocation}>
                        {item.location.place}
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
