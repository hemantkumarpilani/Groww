import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import CustomText from '../../components/global/CustomText';
import { FONTS } from '../../constants/Fonts';
import { Colors } from '../../constants/Colors';

interface SocialLoginButtonProps {
  icon: React.ReactNode;
  text: string;
  onPress: () => void;
}

const SocialLoginButton:React.FC<SocialLoginButtonProps> = ({
    icon,
    text,
    onPress
}) =>{
    const {colors} = useTheme()
    return (
        <TouchableOpacity style={[styles.container]} onPress={onPress}>
            {icon}
            <CustomText variant='h8' style={styles.text} fontFamily={FONTS.Medium}>{text}</CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:10,
        width:"90%",
        marginVertical:10,
        backgroundColor:Colors.light_background,
        borderWidth:1,
        borderColor:'#DFDFDF'
    },
    text:{
        marginLeft:10,
        color:'black'
    }
})

export default SocialLoginButton