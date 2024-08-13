import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { resetAndNavigate } from "../../utils/NavigationUtil";
import Lottie from "lottie-react-native";
import CenteredLogo from "../../components/global/CenteredLogo";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import Anim from "../../assets/animations/confirm.json";
import CustomText from "../../components/global/CustomText";
import { FONTS } from "../../constants/Fonts";

const AccountProtectedScreen = () => {
  useEffect(() => {
    resetAndNavigate("HomeScreen")
  }, []);
  return (
    <CustomSafeAreaView>
      <CenteredLogo/>
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <Lottie
        autoPlay
        source={Anim}
        speed={0.9}
        loop={false}
        style={styles.animation}
        />
        <CustomText fontFamily={FONTS.Bold}>Account Protected</CustomText>
      </View>
    </View>
    </CustomSafeAreaView>
  );
};

export default AccountProtectedScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  animationContainer: {
    height: 280,
    width: 280,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: "100%",
    height:120
  },
});
