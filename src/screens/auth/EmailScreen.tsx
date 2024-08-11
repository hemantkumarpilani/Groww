import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { FC, useState } from "react";
import CustomSafeAreaView from "../../components/global/CustomSafeAreaView";
import BackButton from "../../components/global/BackButton";
import CenteredLogo from "../../components/global/CenteredLogo";
import CustomInput from "../../components/global/CustomInput";
import TouchableText from "../../components/auth/TouchableText";
import { RFValue } from "react-native-responsive-fontsize";
import CustomButton from "../../components/global/CustomButton";
import CustomText from "../../components/global/CustomText";
import { navigate } from "../../utils/NavigationUtil";
import { validateEmail } from "../../utils/ValidationUtils";
import { GlobalStyles } from "../../styles/GlobalStyles";

const EmailScreen: FC = () => {
  const [loading, setLoading] = useState(false);
  const[email, setEmail] = useState('')
  const [emailError, setEmailError] = useState("")

  const validate = ()=>{
    if(!validateEmail(email)){
      setEmailError("Please enter a valid email address")
      return false
    }
    return true;
  }

  const handleOnSubmit = ()=>{
    setLoading(true)
    setTimeout(() => {
      if(validate()){
        // if user exist with mail
        // navigate("EmailPasswordScreen", {
        //   email : email
        // })

        // if user does not exist with mail
        navigate("EmailOtpScreen",{
          email : email
        })
      }
      setLoading(false)
    }, 2000);
  }
  return (
    <CustomSafeAreaView>
      <BackButton path ='LoginScreen' />
      <CenteredLogo />
      <ScrollView 
      // style={styles.inputContainer}
      >
        <CustomInput
          label="EMAIL ADDRESS"
          returnKeyType="done"
          value={email}
          inputMode="email"
          focusable={true}
          autoFocus={true}
          error={emailError}
          onEndEditing={()=>validate()}
          onChangeText={(text)=>{
            setEmail(text)
            setEmailError("")
          }}
          placeholder="Eg : me@gmail.com"
          onSubmitEditing={handleOnSubmit}
        />

        {/* <CustomInput
          label="ENTER PASSWORD"
          returnKeyType="done"
          placeholder="8-20 Characters"
          onSubmitEditing={() => {
            console.log("HIT OTP API");
          }}
          password
        />

        <CustomInput
          label=""
          returnKeyType="done"
          placeholder="Enter OTP"
          onSubmitEditing={() => {
            console.log("HIT OTP API");
          }}
          keyboardType="number-pad"
          rightIcon={
            <CustomText style={{ fontSize: RFValue(9) }}>
              Resend in 25s
            </CustomText>
          }
        />

        <CustomInput
          label="ENTER OTP SEND TO THIS EMAIL ID"
          placeholder="Enter OTP"
          onSubmitEditing={() => {
            console.log("HIT OTP API");
          }}
          keyboardType="number-pad"
          rightText={
            <TouchableText
              onPress={() => {}}
              firstText={"Resend in 25s"}
              style={{ fontSize: RFValue(9), marginTop: 0 }}
            />
          }
        /> */}
      </ScrollView>

        <View style={GlobalStyles.bottomBtn}>
        <CustomButton
        text="NEXT"
        loading={loading} 
        disabled={!validateEmail(email) || loading}
        onPress={() => handleOnSubmit()}
      />
        </View>
     
    </CustomSafeAreaView>
  );
};

export default EmailScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 40,
    paddingHorizontal: 3,
  },
});
