import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../Component";

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={options.iconName}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBar}
          >
            <View
              style={{
                ...styles.icons,
                backgroundColor: isFocused ? "tomato" : "white",
              }}
            >
              <Feather
                style={{ color: isFocused ? "white" : "grey" }}
                name={options.iconName}
                size={24}
              />
              {/* <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label}
            </Text> */}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
