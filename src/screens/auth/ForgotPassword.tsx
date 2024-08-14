import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { validatePasswordEntry } from "../../utils/ValidationUtils";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import BackButton from "../../components/global/BackButton";
import CustomInput from "../../components/global/CustomInput";
import OtpTimer from "../../components/auth/OtpTimer";
import { RFValue } from "react-native-responsive-fontsize";
import { GlobalStyles } from "../../styles/GlobalStyles";
import CustomText from "../../components/global/CustomText";
import CustomButton from "../../components/global/CustomButton";
import GuideLineText from "../../components/global/GuideLineText";
import { screenHeight } from "../../utils/Scaling";
import { navigate, resetAndNavigate } from "../../utils/NavigationUtil";

interface PasswordInputs {
  password: string;
  confirmpassword: string;
  otp: string;
}
const ForgotPassword = ({ route }: any) => {
  const { colors } = useTheme();
  // const dispatch = useAppDispatch()
  const [otpSent, setOtpSent] = useState(false);
  const [inputs, setInputs] = useState<PasswordInputs>({
    confirmpassword: "",
    password: "",
    otp: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>();
  const [loading, setLoading] = useState(false);

  const handleOnChange = (text: string, fieldName: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: text,
    }));
    // Clear the error when the user starts typing again
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: undefined,
    }));
  };

  const validateForm = () => {
    const newErros: { [key: string]: string | undefined } = {};
    if (!inputs.password.trim()) {
      newErros.password = "Enter new password";
    }
    if (!inputs.confirmpassword.trim()) {
      newErros.confirmpassword = "Enter confirm password";
    }
    if (
      !validatePasswordEntry(inputs.password, "test", route?.params?.email)
        .result
    ) {
      newErros.password =
        "Set a stronger password, kindly refer to guidelines below.";
    }

    if (inputs?.confirmpassword != inputs?.password) {
      newErros.confirmPassword = "Confirm password not match";
    }

    setErrors(newErros);
    return Object.keys(newErros).length === 0;
  };

  const handleUpdatePassword = () => {
    if (validateForm()) {
      setLoading(true);
      // await dispatch(
      //   SendOTP({email : route.params.email  || "", otp_type: "reset_password"})
      // )
      setTimeout(() => {
        setOtpSent(true);
        setLoading(false);
      }, 2000);
      
    }
  };

  const verifyOtp = () => {
    setLoading(true);
    // await dispatch(
    //   verifyOTP({
    //     email : route.params.email || "",
    //     otp_type : 'reset_password',
    //     data : inputs.confirmpassword,
    //     otp : inputs.otp
    //   })
    // )
    setTimeout(() => {
      resetAndNavigate("LoginScreen")
      setLoading(false);
    }, 2000);
    
  };
  return (
    <CustomSafeAreaView>
      <BackButton />
      <CustomInput
        label="NEW PASSWORD"
        placeholder="8-20 Characters"
        value={inputs?.password}
        error={errors?.password}
        onChangeText={(text) => handleOnChange(text, "password")}
        password
      />

      <CustomInput
        label="CONFIRM NEW PASSWORD"
        placeholder="8-20 Characters"
        value={inputs?.confirmpassword}
        error={errors?.confirmpassword}
        onChangeText={(text) => handleOnChange(text, "confirmpassword")}
        password
      />

      {otpSent && (
        <CustomInput
          error={errors?.otp}
          value={inputs?.otp}
          keyboardType="number-pad"
          returnKeyType="done"
          onSubmitEditing={verifyOtp}
          rightIcon={
            <OtpTimer
              style={{
                color: colors.text,
                opacity: 0.8,
                fontSize: RFValue(10),
                right: 20,
              }}
              type="email"
              onPress={() => handleUpdatePassword()}
            />
          }
          maxLength={6}
          onChangeText={(text) => handleOnChange(text, "otp")}
        />
      )}

      <View style={[GlobalStyles.bottomBtn, {top:screenHeight-170,}]}>
        {errors?.otp && (
          <View style={styles.errorContainer}>
            <CustomText variant="h7">
              Wrong OTP, 2 attempts remaining
            </CustomText>
          </View>
        )}
        <GuideLineText
        text={[
          "Password must have at least one uppercase and lowercase letter.",
          "Must contain at least one number and one special character",
          "Must not contain user's first/last name & email id",
          "Must be different from previous password"
        ]}
        />
        <CustomButton
            disabled={loading}
            loading={loading}
            text={otpSent ? "UPDATE PASSWORD" : "SEND OTP"}
            onPress={otpSent ? verifyOtp : handleUpdatePassword}
            />
      </View>
    </CustomSafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor:"rgba(255,0,0,0.2)",
    padding:10,
    justifyContent:"center",
    borderRadius:4,
    alignItems:'center'
  },
});
