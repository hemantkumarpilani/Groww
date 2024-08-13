import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import TouchableText from "../auth/TouchableText";
import { FONTS } from "../../constants/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../constants/Colors";

interface RoundOTPInputProps {
  otpValues: any;
  error?: string | null;
  loading: boolean;
  onForgotPin: () => void;
}

const RoundOTPInput: React.FC<RoundOTPInputProps> = ({
  loading,
  onForgotPin,
  otpValues,
  error,
}) => {
  const { colors } = useTheme();

  const [animatedValues] = useState(() =>
    Array.from({ length: otpValues.length }, () => new Animated.Value(1))
  );

  const [shakeAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (loading) {
      startAnimation();
    } else {
      resetAnimation();
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      shake();
    }
  }, [error]);

  const startAnimation = () => {
    Animated.loop(
      Animated.stagger(
        100,
        animatedValues.map((value) =>
          Animated.sequence([
            Animated.timing(value, {
              toValue: 0.8,
              duration: 100,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(value, {
              toValue: 1,
              duration: 100,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ])
        )
      )
    ).start();
  };

  const resetAnimation = () => {
    animatedValues.forEach((value) => value.setValue(1));
  };

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]);
  };
  return (
    <>
      <View style={styles.container}>
        {otpValues?.map((text: string, index: number) => {
          return (
            <Animated.View
              key={index}
              style={[
                styles.inputBox,
                {
                  borderColor: colors.text,
                  borderWidth: 2,
                  backgroundColor:
                    otpValues[index] !== "" ? colors.text : "transparent",
                  transform: [
                    { translateX: shakeAnimation },
                    { scale: animatedValues[index] },
                  ],
                  borderRadius: 40,
                },
              ]}
            ></Animated.View>
          );
        })}
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableText
          firstText={'Forgot Pin'}
          onPress={()=>onForgotPin()}
          style={{fontFamily : FONTS.Regular}}
          />
        </View>
      )}
    </>
  );
};

export default RoundOTPInput;

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:'center',
    marginVertical:20,
    alignSelf:'center',
    width:"50%"
  },
  inputBox: {
    width: RFValue(15),
    height:RFValue(15),
    alignItems:'center'
  },
  errorContainer:{
    flexDirection:"row",
    alignItems:'center',
    marginVertical:3,
    gap:5,
    textAlign:'center',
    alignSelf:"center"
  },
  errorText:{
    color : Colors.errorColor,
    fontSize: RFValue(11),
    fontFamily:FONTS.Regular
  }
});
