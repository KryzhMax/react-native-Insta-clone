import React from "react";
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

export default function CreatePostsScreen() {
  const onPressButton = () => {
    alert("You tapped the button!");
  };

  const onLongPress = () => {
    alert("Long press activated!");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={onPressButton} title="Press Me" />
      <TouchableWithoutFeedback onLongPress={onLongPress}>
        <Text>TouchableWithoutFeedback</Text>
      </TouchableWithoutFeedback>
      <TouchableOpacity onLongPress={onLongPress}>
        <Text>TouchableOpacity</Text>
      </TouchableOpacity>
      <TouchableHighlight onLongPress={onLongPress}>
        <Text>TouchableHighlight</Text>
      </TouchableHighlight>
    </View>
  );
}
