import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";
import CustomTabBar from "../common/CustomTabBar";

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
      //   ---------------tabBarOptions deprecated------find analogue---------
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Posts",
          iconName: "grid",
          headerStyle: {
            // backgroundColor: "#f4511e",
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#e5e5e5",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "Roboto-Reg",
            lineHeight: 22,
            fontSize: 20,
          },
          headerRight: () => (
            <Feather
              onPress={() => alert("Imagine you've logged out!")}
              name="log-out"
              size={24}
              color="#BDBDBD"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{ title: "Create post", iconName: "plus" }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: "Profile", iconName: "user" }}
      />
    </Tabs.Navigator>
  );
}
