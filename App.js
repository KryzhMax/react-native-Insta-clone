import { LogBox, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCallback } from "react";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { store } from "./src/redux/store";
import Routing from "./src/components/Routing";

// Ignore log notification by message:
LogBox.ignoreLogs(["Warning: ..."]);
// Ignore all log notifications:
LogBox.ignoreAllLogs();

export default function App() {
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
    // <GestureHandlerRootView>
    <Provider store={store}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Routing />
      </View>
    </Provider>
    // </GestureHandlerRootView>
  );
}
