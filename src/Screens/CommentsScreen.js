import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  // TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Platform,
  SafeAreaView,
  FlatList,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { selectName, selectPhoto } from "../redux/auth/authSelectors";
import { addComments, getAllComments } from "../redux/posts/postsOperations";
import { styles } from "../Component";
import { postsSelector } from "../redux/posts/postsSelectors";

export default function CommentsScreen({ route }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");
  const [post, setPost] = useState({});

  const userNameRef = useSelector(selectName);
  const postsRef = useSelector(postsSelector);
  const userAvatarRef = useSelector(selectPhoto);
  const dispatch = useDispatch();

  useEffect(() => {
    const { photo, id, userId } = route.params;
    if (route.params) {
      const post = postsRef.find((post) => post.id === route.params.id);
      setPost({ photo: photo, postId: id, userId: userId });
      dispatch(getAllComments({ postId: id }));

      setComments(post.comments);
    }

    // onCommentSend();
  }, [route.params, dispatch]);

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

  const onCommentSend = () => {
    const user = {
      userId: post.userId,
      userNameRef: userNameRef,
      userUri: userAvatarRef,
    };
    if (value) {
      dispatch(
        addComments({ postId: post.postId, comment: value, user: user })
      );
      dispatch(getAllComments({ postId: post.postId }));
    }
    onDismiss();
    setValue("");
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", marginTop: 32 }}>
      <Image source={{ uri: post.photo }} style={styles.postImg} />
      <FlatList
        style={{ ...styles.postsList }}
        data={comments}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: userAvatarRef }}
              style={{ ...styles.avatar, width: 28, height: 28 }}
              onLongPress={onDismiss}
            />

            <View style={styles.commentItemContainer}>
              <View>
                <Text style={styles.commentsText}>{item?.comment}</Text>
                <Text style={styles.commentsDate}>{item.date}</Text>
              </View>
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
              borderColor: inputFocus ? "#FF6C00" : "rgba(0, 0, 0, 0.3)",
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
            onPress={onCommentSend}
          >
            <Feather
              name="arrow-up"
              size={24}
              color={inputFocus ? "#FF6C00" : "#000"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
