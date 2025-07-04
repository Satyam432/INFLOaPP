import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useAuthStore } from '../../state';
import { LoadingSpinner } from '../../components';
import { Colors } from '../../constants';

export default function SplashScreen({ navigation }) {
  const { loadStoredAuth, isLoading, isAuthenticated, role } = useAuthStore();

  useEffect(() => {
    initializeApp();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && role) {
        // Navigate to appropriate navigator based on role
        if (role === 'creator') {
          navigation.replace('CreatorNavigator');
        } else if (role === 'brand') {
          navigation.replace('BrandNavigator');
        }
      } else {
        // Navigate to login
        navigation.replace('Login');
      }
    }
  }, [isLoading, isAuthenticated, role]);

  const initializeApp = async () => {
    // Load stored authentication data
    await loadStoredAuth();
    
    // Add any other app initialization logic here
    // e.g., loading app configuration, checking for updates, etc.
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      {/* App Logo */}
      <View className="items-center mb-8">
        <View className="w-24 h-24 bg-primary rounded-full justify-center items-center mb-4">
          <Text className="text-white text-3xl font-bold">I</Text>
        </View>
        <Text className="text-4xl font-bold text-gray-900">Inflo</Text>
        <Text className="text-lg text-gray-600 mt-2">Creator-Brand Collaboration</Text>
      </View>

      {/* Loading Spinner */}
      <LoadingSpinner 
        text="Loading..." 
        color={Colors.primary}
        size="large"
      />

      {/* Version Info */}
      <View className="absolute bottom-10 items-center">
        <Text className="text-gray-400 text-sm">Version 1.0.0</Text>
      </View>
    </View>
  );
} 