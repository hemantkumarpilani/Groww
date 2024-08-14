import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ResetOtpVerification from './ResetOtpVerification'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import { Colors } from '../../constants/Colors'
import { RFValue } from 'react-native-responsive-fontsize'
import CustomText from '../../components/global/CustomText'
import { FONTS } from '../../constants/Fonts'
import DotLoading from '../../components/global/DotLoading'
import OTPInputCentered from '../../components/inputs/OTPInputCentered'
import CustomNumberPad from '../../components/inputs/CustomNumberPad'

const initialState = ["","","",""]
const ResetPin = () => {
  const [otpValues, setOtpValues] = useState(["","","",""])
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [otpError, setOtpError] = useState<string | null>(null)
  const [otpVerification, setOtpVerification] = useState<boolean>(false)
  // const dispatch = useAppDispatch()

  const handlePressNumber = (number : number | string)=>{
    if(focusedIndex < otpValues.length){
      const newOtpValues = [...otpValues]
      newOtpValues[focusedIndex] = number.toString();
      setOtpError(null)
      setOtpValues(newOtpValues)
      setFocusedIndex(focusedIndex + 1)
    }
  }

  const handlePressBackspace = ()=>{
    if(focusedIndex > 0){
      const newOtpValues = [...otpValues]
      newOtpValues[focusedIndex - 1] = ""
      setOtpValues(newOtpValues)
      setFocusedIndex(focusedIndex - 1)
    }
  }

  const handlePressCheckMark = ()=>{
    let valid = false
    otpValues.forEach((i)=>{
      if(i === ""){
        valid = true
        setOtpError("Enter 4 Digit PIN ")
        // setOtpError("Wrong PIN Limit Reached. Try after 30 minutes")
        setOtpValues(initialState)
        setFocusedIndex(0)
      }
    })
    if(!valid){
      setLoading(true)
      // await dispatch(
      //   SendOTP ({email : user.email || "", otp_types :'reset_pin'})
      // )
      setTimeout(() => {
        setLoading(false)
        setFocusedIndex(0)
      setOtpVerification(true)
      }, 3000);
      
      // setOtpValues(initialState)
      
    }
  }

  if(otpVerification){
    return <ResetOtpVerification pin={otpValues.join("")}/>
  }
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <Icon 
        name='lock'
        color={Colors.profit}
        size={RFValue(22)}
        />
        <CustomText variant='h6' fontFamily={FONTS.Bold} style={{marginTop:10}}>
          Reset Groww PIN
        </CustomText>

        <CustomText style={styles.subText}>
          Set a new PIN to keep your investments safe & secure
        </CustomText>
        {loading ? (
          <View style={styles.dotContainer}>
            <DotLoading/>
          </View>
        ) : <OTPInputCentered 
        error={otpError}
        focusedIndex={focusedIndex}
        otpValues={otpValues}
        />}
      </View>

      <CustomNumberPad
      customFont
      themeColor
      onPressNumber={handlePressNumber}
      onPressBackSpace={handlePressBackspace}
      onPressCheckMark={handlePressCheckMark}
      />
    </CustomSafeAreaView>
  )
}

export default ResetPin

const styles = StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems:'center',
    marginBottom:RFValue(10)
  },
  subText:{
    fontSize:RFValue(10),
    marginTop:15,
    opacity : 0.8
  },
  dotContainer:{
    marginTop:50
  }
})
