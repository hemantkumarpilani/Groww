import { Animated, StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon2 from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native'

interface OTPInputProps {
    otpValues:any
    focusedIndex : number
    error?:string | null
}

const OtpInput : React.FC<OTPInputProps> = ({
    error,
    otpValues,
    focusedIndex
}) => {
    const {colors} = useTheme();
    const [shakeAnimation] = useState(new Animated.Value(0))
    const theme = useColorScheme()

    useEffect(()=>{
        if(error){
            shake()
        }
    }, [error])

    const shake = ()=>{
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue :10,
                duration:50,
                useNativeDriver : true
            }),
            Animated.timing(shakeAnimation,{
                toValue : -10,
                duration :50,
                useNativeDriver : true
            })
        ])
    }
  return (
    <View>
      <Text>OtpInput</Text>
    </View>
  )
}

export default OtpInput

const styles = StyleSheet.create({})