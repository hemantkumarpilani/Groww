import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import CustomText from "./CustomText";
import { FONTS } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";
import TouchableRipple from "react-native-material-ripple";

interface CustomButtonProps {
  text: string;
  loading: boolean;
  disabled: boolean;
  onPress: () => void;
}

const CustomButton: FC<CustomButtonProps> = ({
  text,
  loading,
  disabled,
  onPress,
}) => {
  const { colors } = useTheme();
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (loading) {
      animatedValue.setValue(0);
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ).start();
    } else {
      animatedValue.stopAnimation();
    }
  }, [loading, animatedValue]);
  return (
    <TouchableRipple
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.btn,
        { backgroundColor: loading || disabled ? colors.card : colors.primary },
      ]}
    >
      <CustomText fontFamily={FONTS.Bold} variant="h6" style={{color: 'white'}}>
        {text}
      </CustomText>
      {loading && (
        <Animated.View
          style={[
            {
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-400, 400],
                  }),
                },
              ],
            },
            styles.loadingIndicator,
          ]}
        />
      )}
    </TouchableRipple>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    padding: 14,
    width: "100%",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  loadingIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: Colors.profit,
    width: "100%",
  },
});
