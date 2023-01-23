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

const avatar = require("../assets/img/User.jpg");

export default function CommentsScreen({ route }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [photo, setPhoto] = useState(null);

  console.log("comments", comments);

  useEffect(() => {
    if (route.params) {
      setPhoto(route.params);
    }

    // if (comments)
    //   setComments((prevComments) => [...prevComments, comments.val]);
  }, [route.params]);

  const onInputFocus = () => {
    setIsShowKeyboard(true);
    setInputFocus(true);
  };

  const onDismiss = () => {
    setIsShowKeyboard(false);
    setInputFocus(false);
    Keyboard.dismiss();
  };

  const getDate = () => {
    const date = new Date();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateString =
      date.getDate() +
      " " +
      monthNames[date.getMonth()] +
      " " +
      date.getFullYear() +
      " | " +
      date.getHours() +
      ":" +
      ("00" + date.getMinutes()).slice(-2);

    return dateString;
  };

  return (
    <TouchableWithoutFeedback onPress={onDismiss}>
      <SafeAreaView style={{ flex: 1, alignItems: "center", marginTop: 32 }}>
        <Image source={{ uri: photo }} style={styles.postImg} />
        <FlatList
          style={styles.postsList}
          data={comments}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row" }}>
              <Image
                source={avatar}
                style={{ ...styles.avatar, width: 28, height: 28 }}
              />
              <View style={styles.commentItemContainer}>
                <Text style={styles.commentsText}>{item?.comment}</Text>
                <Text style={styles.commentsDate}>{item.date}</Text>
              </View>
            </View>
          )}
        />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
          <View
            style={{
              ...styles.createPostInputContainer,
              marginBottom: isShowKeyboard ? 135 : 16,
            }}
          >
            <TextInput
              name="comment"
              style={{
                ...styles.commentInput,
                backgroundColor: inputFocus ? "#f6f6f6" : "#e8e8e8",
                borderColor: inputFocus ? "tomato" : "rgba(0, 0, 0, 0.3)",
              }}
              placeholder={"Leave a comment"}
              placeholderTextColor={"#bdbdbd"}
              value={value}
              onFocus={onInputFocus}
              onChangeText={(val) =>
                setValue((prevState) => ({
                  ...prevState,
                  comment: val,
                  date: getDate(),
                }))
              }
            />
            <TouchableOpacity
              style={styles.commentInputIcon}
              activeOpacity={0.7}
              onPress={() => {
                // console.log(value);
                setComments((prevComments) => [...prevComments, value]);
                onDismiss();
              }}
            >
              <Feather name="arrow-up" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
