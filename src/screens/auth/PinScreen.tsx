import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { navigate } from "../../utils/NavigationUtil";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CustomText from "../../components/global/CustomText";
import { FONTS } from "../../constants/Fonts";

const PinScreen = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [otpError, setOtpError] = useState<string | null>(null);
  const handlePressNumber = (number: number | string) => {
    if (focusedIndex < otpValues.length) {
      const newOtpValues = [...otpValues];
      newOtpValues[focusedIndex] = number.toString();
      setOtpError(null);
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex + 1);
    }

    const handlePressBackSpace = () => {
      if (focusedIndex > 0) {
        const newOtpValues = [...otpValues];
        newOtpValues[focusedIndex - 1] = "";
        setOtpValues(newOtpValues);
        setFocusedIndex(focusedIndex - 1);
      }
    };

    const handlePressCheckMark = () => {
      let valid = false;
      const isNotEmpty = otpValues?.map((i) => {
        if (i == "") {
          valid = true;
          setOtpError("Enter all PIN");
        }
      });
      if (!valid) {
        navigate("ConfirmPinScreen", {
          pin: otpValues.toString(),
        });
      }
    };
  };
  return (
    <CustomSafeAreaView>
      <CustomText
        variant="h5"
        fontFamily={FONTS.Medium}
        style={styles.mainContainer}
      >
        Set up Groww PIN
      </CustomText>
      <CustomText style={styles.subText}>
        To keep your finances secure, we will ask for this PIN everytime you
        open the app
      </CustomText>
    </CustomSafeAreaView>
  );
};

export default PinScreen;

const styles = StyleSheet.create({
  mainContainer: {},
  subText: {},
});
