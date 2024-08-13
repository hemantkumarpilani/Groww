import { Animated, Easing, StyleSheet, Text, View, useColorScheme } from "react-native";
import React, { useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "@react-navigation/native";

const DotLoading = () => {
  const theme = useColorScheme()
  const [animatedValue] = useState(
    Array.from({ length: 4 }, () => new Animated.Value(1))
  );

  useEffect(() => {
    startAnimation();
    return () => resetAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.stagger(
        100,
        animatedValue.map((val) =>
          Animated.sequence([
            Animated.timing(val, {
              toValue: 0.5,
              duration: 200,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(val, {
              toValue: 1,
              duration: 200,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ])
        )
      )
    ).start();
  };

  const resetAnimation = () => {
    animatedValue.forEach((value) => value.setValue(1));
  };
  return (
    <View style={styles.container}>
      {animatedValue?.map((animatedValue, index) => {
        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                transform: [{ scale: animatedValue }],
                marginRight: index !== 3 ? 10 : 0,
                borderColor: theme === 'dark' ? 'white' : 'black'
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default DotLoading;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      dot: {
        borderWidth:1,
        width: RFValue(15),
        height: RFValue(15),
        borderRadius: 55,
      },
});
