import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/dashboard/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import {useCustomTheme} from './Theme';
import { navigationRef } from '../utils/NavigationUtil';
import EmailScreen from '../screens/auth/EmailScreen';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const theme = useCustomTheme();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.notification,
    },
  };

  return (
    <NavigationContainer ref={navigationRef} theme={MyTheme}>
      <MainNavigator/>
    </NavigationContainer>
  );
};

export default Navigation;
