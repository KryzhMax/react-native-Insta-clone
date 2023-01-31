import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import CustomTabBar from "../common/CustomTabBar";
import NestedScreen from "./NestedScreen";
import { styles } from "../Component";
import { onLogOut } from "../hooks/useLogout";

const Tabs = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <Tabs.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      initialRouteName="ProfileScreen"
      screenOptions={{
        // tabBarActiveTintColor: "white",
        // tabBarInactiveTintColor: "gray",
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
        component={NestedScreen}
        options={({ route }) => {
          const activeRoute = getFocusedRouteNameFromRoute(route);
          return {
            //   headerTitleAlign: "center",
            title: "Posts",
            iconName: "grid",
            headerStyle: { ...styles.headerStyle },
            headerRight: () => (
              <Feather
                onPress={onLogOut}
                name="log-out"
                size={24}
                color="#BDBDBD"
                style={styles.logout}
              />
            ),
            headerShown:
              activeRoute === "MapScreen" || activeRoute === "CommentsScreen"
                ? false
                : true,
          };
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Create post",
          iconName: "plus",
          headerStyle: { ...styles.headerStyle },
          tabBarStyle: { display: "none" },
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color="#BDBDBD"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("NestedScreen", { screen: "PostsScreen" });
              }}
            />
          ),
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
