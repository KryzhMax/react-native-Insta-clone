import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../Component";

export default function CustomTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions?.tabBarStyle?.display === "none") {
    return null;
  }

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
                shadowOffset: isFocused
                  ? {
                      width: 2,
                      height: 4,
                    }
                  : {
                      width: 0,
                      height: 0,
                    },
                shadowOpacity: isFocused ? 0.25 : 0,
                shadowRadius: isFocused ? 4 : 0,
              }}
            >
              <Feather
                style={{ color: isFocused ? "#fff" : "rgba(0,0,0, 0.8" }}
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
