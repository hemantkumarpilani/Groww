import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { resetAndNavigate } from '../../utils/NavigationUtil'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import Logo from '../../assets/images/logo.png'
import CustomText from '../../components/global/CustomText'
import { FONTS } from '../../constants/Fonts'
import TouchableText from '../../components/auth/TouchableText'
import CustomNumberPad from '../../components/inputs/CustomNumberPad'
import { RFValue } from 'react-native-responsive-fontsize'
import RoundOTPInput from '../../components/inputs/RoundOTPInput'

const initialState = ["","","",""]
interface BiometricProp {
  onForgotPin : ()=>void
}

const BiometricVerification : FC<BiometricProp> = (
  {
    onForgotPin
  }
) => {
  const [otpValues, setOtpValues] = useState(["","","",""])
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [otpError, setOtpError] = useState<string | null>(null)

  const handlePressNumber = (number : number | string)=>{
    if(focusedIndex < otpValues.length){
      const newOtpValues = [...otpValues];
      newOtpValues[focusedIndex] = number.toString()
      setOtpError(null)
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex+1)
    }
  }

  const handlePressBackSpace = ()=>{
    if(focusedIndex > 0){
      const newOtpValues = [...otpValues]
      newOtpValues[focusedIndex - 1] = ""
      setOtpValues(newOtpValues);
      setFocusedIndex(focusedIndex-1)
    }
  }

  const handlePressCheckMark =  ()=>{
    let valid = false
    otpValues.forEach((i)=>{
      if(i === ""){
        setLoading(true)
        valid = true
        setOtpError("Wrong PIN, 2 attempt remaining")
        setOtpValues(initialState)
        setFocusedIndex(0)
        setTimeout(() => {
          setLoading(false)
        }, 800);
        
      }
    })
    if(!valid){
      setLoading(true)
      setTimeout(()=>{
        setLoading(false)
        setOtpValues(initialState);
        setFocusedIndex(0)
        // resetAndNavigate("BottomTab")
      }, 10000)
    }
  }

  useEffect(()=>{
    const allFilled = otpValues.every((value)=> value !="")
    if(allFilled){
      handlePressCheckMark()
    }
  },[otpValues])
  return (
   <CustomSafeAreaView>
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo}/>
      <CustomText variant='h6' fontFamily={FONTS.Bold}>
        Enter Groww Pin
      </CustomText>
      <View style={styles.emailContainer}>
        <CustomText style={styles.subText}>r********@gmail.com</CustomText>
        <TouchableText
        firstText={'Logout'}
        style={styles.logoutText}
        onPress={()=>{}}
        />
      </View>
    </View>

    <RoundOTPInput
    onForgotPin={onForgotPin}
    loading={loading}
    otpValues={otpValues}
    error={otpError}
    />

    <CustomNumberPad
    customFont
    onPressBiometric={()=>{}}
    isBiometric={true}
    onPressNumber={handlePressNumber}
    onPressBackSpace={handlePressBackSpace}
    onPressCheckMark={handlePressCheckMark}
    />

   </CustomSafeAreaView>
  )
}

export default BiometricVerification

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:"center",
    marginTop:RFValue(25),
    marginBottom:RFValue(10)
  },
  logo:{
    height:RFValue(25),
    width: RFValue(25),
    alignSelf:'center',
    marginBottom:8
  },
  subText:{
    fontSize:RFValue(10)
  },
  emailContainer :{
    flexDirection:"row",
    alignItems:"center",
    gap:4,
    marginTop:15
  },
  logoutText:{
    fontFamily: FONTS.Regular,
    fontSize: RFValue(10)
  }
})