import { LogBox } from "react-native";
// Ignore log notification by message:
LogBox.ignoreLogs(["Warning: ..."]);
// Ignore all log notifications:
LogBox.ignoreAllLogs();
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React, { useState, useEffect, useCallback } from "react";
import { Provider } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, auth } from "./src/firebase/config";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import useRoute from "./src/hooks/useRoute";
import { store } from "./src/redux/store";
import { selectIsAuth } from "./src/redux/auth/authSelectors";
import { onAuthStateChange } from "./src/redux/auth/authOperations";

export default function App() {
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector(selectIsAuth);
  // auth.onAuthStateChanged((user) => setUser(user));

  const [fontsLoaded] = useFonts({
    "Roboto-Reg": require("./src/assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./src/assets/fonts/Roboto/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    dispatch(onAuthStateChange());
  }, []);

  const routing = useRoute(user);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <NavigationContainer onLayout={onLayoutRootView}>
          {routing}
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}
