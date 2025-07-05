import React, { createContext, useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import LoadingSpinner from './LoadingSpinner';
import { useAuthStore } from '../state';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { 
    isAuthenticated, 
    user, 
    role, 
    isLoading, 
    loadStoredAuth, 
    login, 
    logout,
    updateUser
  } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      await loadStoredAuth();
    } catch (error) {
      console.error('Failed to load stored auth:', error);
    } finally {
      setIsInitialized(true);
    }
  };

  const completeOnboarding = async (onboardingData) => {
    try {
      console.log('🎯 Completing onboarding with data:', onboardingData);
      
      // Update user with onboarding data
      const updatedUser = {
        ...user,
        ...onboardingData,
        onboardingCompleted: true,
        name: `${onboardingData.firstName} ${onboardingData.lastName}`.trim(),
      };
      
      await updateUser(updatedUser);
      console.log('✅ Onboarding completed successfully');
    } catch (error) {
      console.error('❌ Error completing onboarding:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    user,
    role,
    isLoading,
    login,
    logout,
    isInitialized,
    completeOnboarding,
    onboardingCompleted: user?.onboardingCompleted || false,
  };

  // Show loading screen while initializing
  if (!isInitialized || isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <View className="items-center">
          <View className="w-24 h-24 bg-primary rounded-full justify-center items-center mb-4">
            <Text className="text-white text-3xl font-bold">I</Text>
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-4">Inflo</Text>
          <LoadingSpinner text="Loading..." size="large" />
        </View>
      </View>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 