import React, { useState } from "react";
import { Text, SafeAreaView, FlatList } from "react-native";

export default function PostsScreen() {
  const COURSES = [
    {
      id: "45k6-j54k-4jth",
      title: "HTML",
    },
    {
      id: "4116-jfk5-43rh",
      title: "JavaScript",
    },
    {
      id: "4d16-5tt5-4j55",
      title: "React",
    },
    {
      id: "LG16-ant5-0J25",
      title: "React Native",
    },
    {
      id: "45k6-j54k-4jth",
      title: "HTML",
    },
    {
      id: "4116-jfk5-43rh",
      title: "JavaScript",
    },
    {
      id: "4d16-5tt5-4j55",
      title: "React",
    },
    {
      id: "LG16-ant5-0J25",
      title: "React Native",
    },
    {
      id: "45k6-j54k-4jth",
      title: "HTML",
    },
    {
      id: "4116-jfk5-43rh",
      title: "JavaScript",
    },
    {
      id: "4d16-5tt5-4j55",
      title: "React",
    },
    {
      id: "LG16-ant5-0J25",
      title: "React Native",
    },
    {
      id: "45k6-j54k-4jth",
      title: "HTML",
    },
    {
      id: "4116-jfk5-43rh",
      title: "JavaScript",
    },
    {
      id: "4d16-5tt5-4j55",
      title: "React",
    },
    {
      id: "LG16-ant5-0J25",
      title: "React Native",
    },
    {
      id: "45k6-j54k-4jth",
      title: "HTML",
    },
    {
      id: "4116-jfk5-43rh",
      title: "JavaScript",
    },
    {
      id: "4d16-5tt5-4j55",
      title: "React",
    },
    {
      id: "LG16-ant5-0J25",
      title: "React Native",
    },
  ];

  const [courses, setCourses] = useState(COURSES);

  return (
    //   ---------------What is SafeAreaView?--------------
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <FlatList
        data={courses}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </SafeAreaView>
  );
}
