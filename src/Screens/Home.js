import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import CustomTabBar from "../common/CustomTabBar";
import NestedScreen from "./NestedScreen";
import { styles } from "../Component";
import PostsScreen from "./PostsScreen";
import MapScreen from "./MapScreen";

const Tabs = createBottomTabNavigator();

export default function Home(
  {
    /*navigation*/
  }
) {
  return (
    <Tabs.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="ProfileScreen"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Tabs.Screen
        name="NestedScreen"
        // component={PostsScreen}
        component={MapScreen}
        options={{
          //   headerTitleAlign: "center",
          title: "Posts",
          iconName: "grid",
          headerStyle: { ...styles.headerStyle },

          headerRight: () => (
            <Feather
              onPress={() => alert("Imagine you've logged out!")}
              name="log-out"
              size={24}
              color="#BDBDBD"
              style={styles.logout}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Create post",
          iconName: "plus",
          headerStyle: { ...styles.headerStyle },
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          iconName: "user",
          headerStyle: { ...styles.headerStyle },
        }}
      />
    </Tabs.Navigator>
  );
}
