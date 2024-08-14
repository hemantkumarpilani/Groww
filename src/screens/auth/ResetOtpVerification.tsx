import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { resetAndNavigate } from '../../utils/NavigationUtil'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../../constants/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '../../components/global/CustomText'
import { FONTS } from '../../constants/Fonts'
import { useTheme } from '@react-navigation/native'
import OtpTimer from '../../components/auth/OtpTimer'
import CustomButton from '../../components/global/CustomButton'
import { screenHeight } from '../../utils/Scaling'

const ResetOtpVerification = () => {
  const[loading, setLoading] = useState(false)
  const [otpError, setOtpError] = useState<string | null>(null)
  const [otp, setOtp]= useState<string>("")
  const {colors} = useTheme()

  const handleVerification =()=>{
    setLoading(true)
    if(!otp){
      setTimeout(() =>  {
        setLoading(false)
      }, 1500);
      setOtpError("Wrong OTP, 2 attempt remaining")
      return;
    }
    setTimeout(() => { 
      setLoading(false)
      resetAndNavigate("LoginScreen")
    }, 3000);
    
  }

  const handleChange = (text : string)=>{
    setOtp(text)
    setOtpError(null)
  }

  return (
    <KeyboardAvoidingView
    keyboardVerticalOffset={20}
    behavior='padding'
    style={styles.keyboardContainer}
    >
      <CustomSafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Icon
          color={Colors.profit}
          name="lock"
          size={RFValue(20)}
          />
          <CustomText
          variant='h6'
          fontFamily={FONTS.Bold}
          style={styles.title}
          >
            Verify Identity
          </CustomText>

          <CustomText style={styles.subText}>
            Enter OTP sent to +91 ******814
          </CustomText>

          <TextInput
          value={otp}
          maxLength={6}
          onChangeText={handleChange}
          autoFocus
          keyboardType='number-pad'
          style={[styles.input, {color: colors.text}]}
          caretHidden
          />

          {otpError && <Text style={styles.errorText}>{otpError}</Text>}

          <OtpTimer
          onPress={()=>{}}
          type='otp'
          style={styles.timer}
          />
        </ScrollView>

      </CustomSafeAreaView>
      <View style={styles.btnContainer}>
          <CustomButton
          text='VERIFY'
          onPress={handleVerification}
          loading={loading}
          disabled={false}
          />
        </View>
    </KeyboardAvoidingView>
  )
}

export default ResetOtpVerification

const styles = StyleSheet.create({
  keyboardContainer:{
    flex:1
  },
  container:{
    justifyContent:"center",
    alignItems:"center",
    marginTop:20,
    marginBottom:RFValue(10)
  },
  title:{
    marginTop:20
  },
  subText:{
    fontSize: RFValue(10),
    marginTop:15,
    opacity:0.8
  },
  input:{
    marginTop:80,
    fontSize: RFValue(18),
    borderBottomWidth:2,
    borderBottomColor: Colors.light_border,
    width:"30%",
    textAlign:'center'
  },
  errorText:{
    color :  Colors.errorColor,
    fontSize: RFValue(11),
    fontFamily: FONTS.Regular,
    marginTop:20
  },
  timer:{
    fontSize:RFValue(10),
    marginTop:60
  },
  btnContainer:{
    flex:1,
    justifyContent:"flex-end",
  }
})