import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

// Import screens
import SplashScreen from './screens/common/SplashScreen';
import LoginScreen from './screens/common/LoginScreen';
import OTPScreen from './screens/common/OTPScreen';

// Import navigators
import CreatorNavigator from './navigation/CreatorNavigator';
import BrandNavigator from './navigation/BrandNavigator';

// Import constants
import { Routes } from './constants';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName={Routes.SPLASH}
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Common Screens */}
        <Stack.Screen 
          name={Routes.SPLASH} 
          component={SplashScreen} 
        />
        <Stack.Screen 
          name={Routes.LOGIN} 
          component={LoginScreen} 
        />
        <Stack.Screen 
          name={Routes.OTP} 
          component={OTPScreen} 
        />
        
        {/* Role-based Navigators */}
        <Stack.Screen 
          name="CreatorNavigator" 
          component={CreatorNavigator} 
        />
        <Stack.Screen 
          name="BrandNavigator" 
          component={BrandNavigator} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 