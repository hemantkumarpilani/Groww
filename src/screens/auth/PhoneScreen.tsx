import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { navigate } from "../../utils/NavigationUtil";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import CustomText from "../../components/global/CustomText";
import { FONTS } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";
import OtpTimer from "../../components/auth/OtpTimer";
import CustomButton from "../../components/global/CustomButton";
import { GlobalStyles } from "../../styles/GlobalStyles";

const PhoneScreen = () => {
  const { colors } = useTheme();
  const theme = useColorScheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleSendOtp = () => {
    // logic to send otp
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      setOtpError("Wrong OTP, 2 attempts remaining");
      return;
    }
    navigate("PersonalDetailScreen");
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={10}
      behavior="padding"
      style={styles.keyboardContainer}
    >
      <CustomSafeAreaView>
        <CustomText
          variant="h4"
          fontFamily={FONTS.Medium}
          style={styles.mainContainer}
        >
          {otpSent ? "Verify your mobile number" : "Enter mobile number"}
        </CustomText>

        {otpSent ? (
          <View style={styles.numberConatiner}>
            <CustomText variant="h8">
              Enter the OTP sent to +91 {phoneNumber}
            </CustomText>
            <Icon
              color={Colors.profit}
              name="pencil"
              size={RFValue(12)}
              onPress={() => {
                setOtpSent(false);
              }}
            />
          </View>
        ) : (
          <CustomText variant="h8">
            Mobile number is required to invest in India
          </CustomText>
        )}

        {!otpSent ? (
          <View style={styles.phoneContainer}>
            <CustomText
              variant="h5"
              fontFamily={FONTS.NumberSemiBold}
              style={{ fontWeight: "bold" }}
            >
              +91
            </CustomText>
            <TextInput
              focusable={true}
              autoFocus={true}
              keyboardType="number-pad"
              placeholder="999999999"
              maxLength={10}
              style={[styles.textInput, { color: colors.text }]}
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
                setOtpError("");
              }}
            />
          </View>
        ) : (
          <>
            <View style={styles.phoneContainer}>
              <TextInput
                focusable={true}
                autoFocus={true}
                keyboardType="phone-pad"
                placeholder="OTP"
                maxLength={6}
                style={[styles.textInput, { color: colors.text }]}
                value={otp}
                onChangeText={(text) => {
                  setOtp(text);
                }}
              />
            </View>

            <View style={styles.otpTimeContainer}>
              <TouchableOpacity
                style={{
                  backgroundColor: theme == "dark" ? colors.card : "#ccc",
                  padding: 8,
                  borderRadius: 5,
                }}
              >
                <OtpTimer
                  type="OTP"
                  onPress={() => {}}
                  style={{
                    fontSize: RFValue(10),
                    color: colors.text,
                    opacity: 0.8,
                    fontFamily: FONTS.Regular,
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: theme === "dark" ? colors.card : "#ccc",
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <CustomText
                  style={{
                    fontSize: RFValue(10),
                    color: colors.text,
                    opacity: 0.8,
                    fontFamily: FONTS.Regular,
                  }}
                >Get OTP via call</CustomText>
              </TouchableOpacity>
              <TouchableOpacity></TouchableOpacity>
            </View>
          </>
        )}

        <View style={styles.btnConatiner}>
            {otpError && (
              <View style={styles.errorConatiner}>
                <CustomText variant="h7" fontFamily={FONTS.Medium}>Wrong OTP, 2 attempts remaing</CustomText>

              </View>
            )}
        </View>
      </CustomSafeAreaView>
      <View style={GlobalStyles.bottomBtn}>
      <CustomButton
            text={otpSent ? "VERIFY" : "SEND OTP"}
            onPress={otpSent ? handleVerifyOtp : handleSendOtp}
            loading={false}
            disabled={false}
            />
      </View>
      
    </KeyboardAvoidingView>
  );
};

export default PhoneScreen;

const styles = StyleSheet.create({
  errorConatiner:{
    backgroundColor:'rgba(255,0,0,0.2)',
    padding:10,
    justifyContent:'center',
    borderRadius:4,
    alignItems:'center',
    marginVertical:20
  },
  btnConatiner:{
    justifyContent:"flex-end",
  },
  textInput:{
    width:"90%",
    fontWeight:"bold",
    fontSize:RFValue(15)
  },
  phoneContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:8,
    marginTop:30,
    paddingLeft:3
  },
  keyboardContainer:{
    flex:1
  },
  mainContainer:{
    marginVertical:10
  },
  numberConatiner:{
    flexDirection:'row',
    alignItems:"center",
    gap:4
  },
  otpTimeContainer:{
    flexDirection:"row",
    alignItems:"center",
    gap:30,
    marginTop:30
  }
});
