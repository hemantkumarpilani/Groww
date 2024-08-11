import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { screenHeight } from "../utils/Scaling";

export const GlobalStyles = StyleSheet.create({
  bottomBtn: {
    position: "absolute",
    top:screenHeight-70,
    left:10,
    width:"100%",
  },
  tabIcon: {
    width: RFValue(18),
    height: RFValue(18),
  },
});
