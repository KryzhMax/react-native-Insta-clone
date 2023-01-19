import React from "react";
import { TouchableOpacity, View } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

const COLORS = {
  orange: "#FF6C00",
  white: "#000",
};

const lineProps = {
  strokeOpacity: 1,
  strokeWidth: 1,
};

export default function LogoutBtn({ size /*onPress*/ }) {
  return (
    <TouchableOpacity /*onPress={onPress}*/>
      <View style={{ width: size, height: size }}>
        <Svg
          width={size}
          height={size}
          viewBox="0 0 25 25"
          fill={COLORS.white}
          {...lineProps}
          stroke={COLORS.orange}
        >
          <Circle cx="12.5" cy="12.5" r="12" />
          <Path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z"
          />
        </Svg>
      </View>
    </TouchableOpacity>
  );
}
