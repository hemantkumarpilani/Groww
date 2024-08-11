import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import React from "react";
import Icon2 from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import CustomText from "../global/CustomText";
import { Colors } from "../../constants/Colors";
import { FONTS } from "../../constants/Fonts";

interface InputProps {
  label?: string;
  error?: string;
  options?: any;
  selected?: string;
  disabled?: boolean;
  disabledBackground?: boolean;
  onSelect: (text: string) => void;
}

const CustomRadioInput: React.FC<
  InputProps & React.ComponentProps<typeof TextInput>
> = ({
    label,
    error,
    disabled,
    selected,
    disabledBackground,
    onSelect,
    options,
    ...props
}) => {
    const {colors} = useTheme();

    const theme = useColorScheme()
  return (
    <View style={styles.inputContainer}>
     {label && (
        <View style={styles.labelContainer}>
            <Text style={[styles.label, {
                color : colors.text, opacity : theme == 'dark' ? 1 : 0.4
            }]}>
                {label}
            </Text>
        </View>
     )}

     <View style={styles.radioContainer}>     
        {options?.map((text : string, index : number)=>{
            return(
                <TouchableOpacity key={index} style={styles.radioItem} onPress={()=>onSelect(text)}>
                    <Icons 
                    name={selected == text ? 'circle-slice-8' : 'checkbox-blank-circle-outline'}
                    color={selected == text ? colors.primary : colors.text}
                    size={RFValue(14)}
                    />
                    <CustomText variant="h8">{text.toLocaleUpperCase()}</CustomText>
                </TouchableOpacity>
            )
        })}
     </View>
     {error && (
        <View style={styles.errorContainer}>
            <Icon2
            size={RFValue(13)}
            name="information-circle"
            style={styles.errorText}
            />
            <Text style={styles.errorText}>{error}</Text>
        </View>
     )}
    </View>
  );
};

export default CustomRadioInput;

const styles = StyleSheet.create({
    inputContainer:{
        marginVertical:8
    },
    labelContainer:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        width:"100%",
        marginBottom:2
    },
    label:{
        fontSize: Platform.OS === 'ios' ? RFValue(9) : RFValue(9),
        fontFamily: FONTS.Regular
    },
    radioContainer:{
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between',
        marginVertical:10
    },
    radioItem:{
        flexDirection:"row",
        alignItems:"center",
        gap:4
    },
    errorContainer:{
        flexDirection:"row",
        alignItems:'center',
        marginBottom:3,
        gap:5
    },
    errorText:{
        color: Colors.errorColor,
        fontSize: Platform.OS === 'ios' ? RFValue(11) : RFValue(11),
        fontFamily:FONTS.Medium
    }
});
