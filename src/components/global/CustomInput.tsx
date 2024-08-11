import { Platform, StyleSheet, Text, TextInput, TextStyle, View } from "react-native";
import React, { FC, useState } from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/Ionicons'
import {RFValue} from 'react-native-responsive-fontsize'
import { useTheme } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import { FONTS } from "../../constants/Fonts";

interface InputProps {
  label?: string;
  iconName?: string;
  error?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  rightText?: JSX.Element;
  disabled?: boolean;
  disabledBackground?: boolean;
  password?: boolean;
  textTop?: boolean;
  containerStyle?: TextStyle;
  required?: boolean;
  textInputStyle?: TextStyle;
  onFocus?: () => void;
}

const CustomInput: React.FC<InputProps & React.ComponentProps<typeof TextInput>> = ({
    label,
    iconName,
    error,
    rightIcon,
    leftIcon,
    disabled,
    disabledBackground,
    password,
    rightText,
    textTop,
    required,
    containerStyle,
    textInputStyle,
    onFocus = ()=>{},
    ...props
}) => {
    const {colors} = useTheme()
    const [isFocused, setIsFocused] = useState(false)
    const [hideEyeIcon, setHideEyeIcon] = useState(true)
  return <View style={styles.inputMainContainer}>
    {label && (
        <View style={styles.labelContainer}>
            <Text style={[styles.label, {color : colors.text}]}>{label} {required && "*"}</Text>
            {rightText}
        </View>
    )}

    <View style={[styles.inputContainer, {
        ...containerStyle,
        borderColor:error?"red" : isFocused?Colors.themeColor: Colors?.dark_border,
        borderBottomWidth : error ? 1 : isFocused ? 1 :0.4
    }]}>
        {leftIcon}
        <TextInput 
        placeholderTextColor={colors.border}
        style={[styles.textInut, {
            ...textInputStyle,
            textAlignVertical:textTop ? 'top' : 'center',
            color : colors.text
        }]}
        secureTextEntry={password ? hideEyeIcon : false}
        autoCorrect={false}
        onFocus={()=>{
            onFocus()
            setIsFocused(true)
        }}
        maxLength={256}
        editable={!disabled}
        onBlur={()=>{
            setIsFocused
        }}
        {...props}
        />
        {rightIcon}
        {password && (
            <Icon name={!hideEyeIcon ? "eye" : 'eye-off'} 
            size={RFValue(12)}
            onPress={()=>{
                setHideEyeIcon(!hideEyeIcon)
            }}
            style={styles.password}
            color={colors.text}
            />
        )}

    </View>

    {error && (
        <Text style={styles.errorText}>
            <Icon2 name="information-circle" size={RFValue(13)}/>
            {error}
        </Text>
    )}

  </View>;
};

export default CustomInput;

const styles = StyleSheet.create({
    inputMainContainer:{
        marginVertical:8
    },
    labelContainer:{
        flexDirection:"row",
        alignItems:'center',
        justifyContent:"space-between",
        width:'100%',
        marginBottom:2
    },
    label:{
        fontSize : Platform.OS === 'ios' ? RFValue(9) : RFValue(9),
        fontFamily: FONTS.Medium
    },
    inputContainer :{
        flexDirection:'row',
        alignItems:"center",
        marginVertical:4,
        justifyContent:'space-between'
    },
    textInut:{
        fontFamily : FONTS.Regular,
        fontSize : Platform.OS === 'ios' ? RFValue(10) : RFValue(12),
        alignItems:'flex-start',
        height:28,
        width:"82%",
        paddingVertical:5
    },
    password:{
        textAlignVertical:'center',
        opacity:0.8
    },
    errorText:{
        color :'red',
        fontSize: Platform.OS==='ios' ? RFValue(11) : RFValue(11),
        fontFamily: FONTS.Medium,
        marginBottom:3,
        flexDirection:"row",
        alignItems:'center'
    }
});
