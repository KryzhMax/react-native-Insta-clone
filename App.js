import { LogBox } from "react-native";
// Ignore log notification by message:
LogBox.ignoreLogs(["Warning: ..."]);
// Ignore all log notifications:
LogBox.ignoreAllLogs();
import React, { useState, useEffect, useCallback } from "react";
import { Provider, useSelector } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import useRoute from "./src/hooks/useRoute";
import { store } from "./src/redux/store";
import { app } from "./src/firebase/config";
// import { selectIsAuth } from "./src/redux/auth/authSelectors";

export default function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/firebase.User
  //     const uid = user.uid;
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //   }
  // });
  auth.onAuthStateChanged((user) => setUser(user));

  // const isAuth = useSelector(selectIsAuth);
  const routing = useRoute(user);

  const [fontsLoaded] = useFonts({
    "Roboto-Reg": require("./src/assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer onLayout={onLayoutRootView}>
        {routing}
      </NavigationContainer>
    </Provider>
  );
}
