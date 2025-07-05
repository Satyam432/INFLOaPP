import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

// Import components
import { AuthProvider } from './components';

// Import screens
import SplashScreen from './screens/common/SplashScreen';
import RoleSelectionScreen from './screens/common/RoleSelectionScreen';
import LoginScreen from './screens/common/LoginScreen';
import OTPScreen from './screens/common/OTPScreen';
import CreatorOnboardingScreen from './screens/creator/CreatorOnboardingScreen';
import BrandOnboardingScreen from './screens/brand/BrandOnboardingScreen';

// Import navigators
import CreatorNavigator from './navigation/CreatorNavigator';
import BrandNavigator from './navigation/BrandNavigator';

// Import constants
import { Routes } from './constants';

// Import auth hook
import { useAuth } from './components/AuthProvider';

const Stack = createStackNavigator();

function AppNavigator() {
  const { isAuthenticated, role } = useAuth();

  console.log('🧭 Navigation State:', { isAuthenticated, role });

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        gestureEnabled: false,
      }}
    >
      {!isAuthenticated ? (
        // Authentication flow - show when not authenticated
        <>
          <Stack.Screen name={Routes.SPLASH} component={SplashScreen} />
          <Stack.Screen name={Routes.ROLE_SELECTION} component={RoleSelectionScreen} />
          <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
          <Stack.Screen name={Routes.OTP} component={OTPScreen} />
          <Stack.Screen name="CreatorOnboarding" component={CreatorOnboardingScreen} />
          <Stack.Screen name="BrandOnboarding" component={BrandOnboardingScreen} />
        </>
      ) : role === 'creator' ? (
        // Creator main app flow (includes onboarding handling)
        <Stack.Screen 
          name="CreatorNavigator" 
          component={CreatorNavigator} 
        />
      ) : role === 'brand' ? (
        // Brand main app flow (includes onboarding handling)
        <Stack.Screen 
          name="BrandNavigator" 
          component={BrandNavigator} 
        />
      ) : (
        // Fallback - should not happen but ensures we always have screens
        <>
          <Stack.Screen name={Routes.SPLASH} component={SplashScreen} />
          <Stack.Screen name={Routes.ROLE_SELECTION} component={RoleSelectionScreen} />
          <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
          <Stack.Screen name={Routes.OTP} component={OTPScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
} 