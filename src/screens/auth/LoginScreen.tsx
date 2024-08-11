import {Image, StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import CustomText from '../../components/global/CustomText';
import {FONTS} from '../../constants/Fonts';
import { normalizeModerately, screenHeight, screenWidth } from '../../utils/Scaling';
import LoginImageDark from '../../assets/images/login_dark_animation.png'
import LoginImageLight from '../../assets/images/login_animation_light.png'
import SocialLoginButton from './SocialLoginButton';
import Icon from 'react-native-vector-icons/Ionicons'
import GoogleIcon from '../../assets/images/google.png'
import TouchableText from '../../components/auth/TouchableText';
import BottomText from '../../components/auth/BottomText';
import { signInWithGoogle } from '../../redux/SocialLogin';
import { navigate } from '../../utils/NavigationUtil';

const LoginScreen = () => {
  const theme = useColorScheme()
  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <CustomText variant="h1" fontFamily={FONTS.Medium}>
          Together we Groww
        </CustomText>
        <CustomText variant="h7" style={styles.subText} fontFamily={FONTS.Bold}>
          Invest • Pay • Loans
        </CustomText>

        <View>
          <Image style={styles.imgContainer}
          source={theme === 'dark' ? LoginImageDark : LoginImageLight}
          />
        </View>
        <SocialLoginButton 
        icon={<Image source={GoogleIcon} style={{height:15, width:15}}/>}
        text='Continue with Google'
        onPress={()=>{signInWithGoogle()}}
        /> 
        <SocialLoginButton
        icon={<Icon name= 'logo-apple' size={18} color = 'black' />}
        text='Continue with Apple'
        onPress={()=>{}}
        />
        <TouchableText 
        firstText={'Use other email ID'}
        onPress={()=>{navigate('EmailScreen')}}
        style={{marginVertical: 30, marginTop:20}}
        />
        <BottomText/>
      </View>
    </CustomSafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  subText: {
    marginTop: 16,
    opacity: 0.6,
  },
  imgContainer:{
    width: screenWidth,
    height: screenHeight * 0.45,
    marginVertical :normalizeModerately(30)
  }
});
