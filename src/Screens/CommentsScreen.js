import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  SafeAreaView,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../Component";

export default function CommentsScreen({ route }) {
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");
  const [photo, setPhoto] = useState(null);

  console.log("comments", comments);

  useEffect(() => {
    if (route.params) {
      setPhoto(route.params);
    }

    // if (comments)
    //   setComments((prevComments) => [...prevComments, comments.val]);
  }, [route.params]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
          <Image source={{ uri: photo }} style={styles.postImg} />
          <SafeAreaView style={styles.postsList}>
            <FlatList
              data={comments}
              keyExtractor={(_, idx) => idx.toString()}
              renderItem={({ item }) => (
                // console.log("1111111111", item?.val)
                <View style={styles.postItemContainer}>
                  {/* <Image source={{ uri: item.photo }} style={styles.postImg} /> */}
                  <View /*comment box */>
                    <Text>{item?.val}</Text>
                  </View>
                  <Text>Date of comment</Text>
                </View>
              )}
            />
          </SafeAreaView>
          <View>
            <TextInput
              name="comment"
              style={styles.input}
              placeholder={"Leave a comment"}
              placeholderTextColor={"#bdbdbd"}
              value={value}
              onChangeText={(val) =>
                setValue((prevState) => ({
                  ...prevState,
                  val,
                }))
              }
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                // console.log(value);
                setComments((prevComments) => [...prevComments, value]);
              }}
            >
              <Feather name="arrow-up" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
