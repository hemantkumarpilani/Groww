import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import CenteredLogo from '../../components/global/CenteredLogo'
import CustomInput from '../../components/global/CustomInput'
import CustomButton from '../../components/global/CustomButton'
import OtpTimer from '../../components/auth/OtpTimer'
import { navigate } from '../../utils/NavigationUtil'
import { GlobalStyles } from '../../styles/GlobalStyles'

const EmailOtpScreen = ({route}: any) => {
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async ()=>{
    if(!otp){
      setOtpError("Wrong OTP, 2 attempts remaining")
      return;
    }
    setLoading(true)
    setTimeout(() => {
      navigate('SetPasswordScreen',{
        email : route.params.email
      })
    }, 2000);
  }
  return (
   <CustomSafeAreaView>
    <ScrollView>
      <CenteredLogo/>
      
      <TouchableOpacity>
        <View>
          <CustomInput label='EMAIL ADDRESS' value={route.params.email}/>
        </View>
      </TouchableOpacity>

      <CustomInput
          label="ENTER OTP SEND TO THIS EMAIL ID"
          placeholder="Enter OTP"
          value={otp}
          onChangeText={(text)=>{
            setOtp(text)
            setOtpError("")
          }}
          error={otpError}
          returnKeyType='done'
          maxLength={6}
          onSubmitEditing={() => {
            console.log("HIT OTP API");
          }}
          keyboardType="number-pad"
          rightText={
            <OtpTimer type = "email" onPress= {()=>{{}}} />
          }
        />
    </ScrollView>
    <View style={GlobalStyles.bottomBtn}>
      <CustomButton
      text='VERIFY EMAIL ID'
      loading={loading}
      disabled={loading}
      onPress={()=>{handleSubmit()}}
      />
    </View>
   </CustomSafeAreaView>
  )
}

export default EmailOtpScreen

const styles = StyleSheet.create({})