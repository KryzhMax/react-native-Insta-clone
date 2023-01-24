import React, { useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";
import PostsScreen from "./PostsScreen";
import { styles } from "../Component";

const Nested = createStackNavigator();

export default function NestedScreen({ navigation, route }) {
  useLayoutEffect(() => {
    const tabHiddenRoutes = ["CommentsScreen", "MapScreen"];

    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: "flex" } });
    }
  }, [navigation, route]);

  return (
    <Nested.Navigator initialRouteName="PostsScreen">
      <Nested.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Nested.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Comments",
          headerStyle: { ...styles.headerStyle },
          headerTitleAlign: "center",
          headerTitleStyle: { ...styles.headerTitleStyle },
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color="#BDBDBD"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("PostsScreen");
              }}
            />
          ),
        }}
      />
      <Nested.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Map",
          headerStyle: { ...styles.headerStyle },
          headerTitleAlign: "center",
          headerTitleStyle: { ...styles.headerTitleStyle },
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color="#BDBDBD"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("PostsScreen");
              }}
            />
          ),
        }}
      />
    </Nested.Navigator>
  );
}
