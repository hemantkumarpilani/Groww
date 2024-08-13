import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { navigate, resetAndNavigate } from '../../utils/NavigationUtil'
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView'
import CustomText from '../../components/global/CustomText'
import { FONTS } from '../../constants/Fonts'
import OtpInput from '../../components/inputs/OtpInput'
import CustomNumberPad from '../../components/inputs/CustomNumberPad'
import { RFValue } from 'react-native-responsive-fontsize'

const ConfirmPinScreen = ({route} : any) => {
  const [otpValues, setOtpValues] = useState(["","","",""])
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [otpError, setOtpError] = useState<string | null>(null)
  
  const handlePressNumber = (number : number | string) =>{
    if(focusedIndex < otpValues.length){
      const newOtpValues = [...otpValues]
      newOtpValues[focusedIndex] = number.toString()
      setOtpError(null)
      setOtpValues(newOtpValues)
      setFocusedIndex(focusedIndex+1)
    }
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

    if(otpValues.toString() != route.params.pin){
      valid = true;
      setOtpValues(["","","",""])
      setFocusedIndex(0)
      setOtpError("PIN not matching")
    }

    if (!valid) {
      navigate("AccountProtectedScreen");
    }
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

    <OtpInput
    otpValues={otpValues}
    error={otpError}
    focusedIndex={focusedIndex}
    />

    <CustomNumberPad
    onPressNumber= {handlePressNumber}
    onPressBackSpace = {handlePressBackSpace}
    onPressCheckMark = {handlePressCheckMark}
    />
  </CustomSafeAreaView>
  )
}

export default ConfirmPinScreen

const styles = StyleSheet.create({
  mainContainer: {
    marginTop:20,
    marginBottom:20
  },
  subText: {
    opacity:0.8,
    fontSize:RFValue(9.5)
  },
})