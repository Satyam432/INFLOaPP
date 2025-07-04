import React, { useState } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button, InputField } from '../../components';
import { authService } from '../../services';
import { Colors } from '../../constants';

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = () => {
    const newErrors = {};
    
    if (!identifier.trim()) {
      newErrors.identifier = 'Email or phone number is required';
    } else {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[\d\s-()]+$/;
      
      if (!emailRegex.test(identifier) && !phoneRegex.test(identifier)) {
        newErrors.identifier = 'Please enter a valid email or phone number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateInput()) return;

    setIsLoading(true);
    try {
      const response = await authService.login(identifier);
      
      if (response.success) {
        navigation.navigate('OTP', { identifier });
      } else {
        Alert.alert('Error', response.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 px-6 justify-center">
          {/* Header */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-primary rounded-full justify-center items-center mb-4">
              <Text className="text-white text-2xl font-bold">I</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome to Inflo</Text>
            <Text className="text-gray-600 text-center">
              Enter your email or phone number to get started
            </Text>
          </View>

          {/* Login Form */}
          <View className="mb-8">
            <InputField
              label="Email or Phone Number"
              placeholder="Enter your email or phone"
              value={identifier}
              onChangeText={setIdentifier}
              error={errors.identifier}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="mail"
            />

            <Button
              title="Send OTP"
              onPress={handleLogin}
              loading={isLoading}
              disabled={!identifier.trim()}
              size="large"
            />
          </View>

          {/* Demo Info */}
          <View className="bg-blue-50 p-4 rounded-lg mb-6">
            <Text className="text-blue-800 font-medium mb-2">Demo Mode</Text>
            <Text className="text-blue-600 text-sm">
              Use any email and OTP: 123456 to login
            </Text>
          </View>

          {/* Footer */}
          <View className="items-center">
            <Text className="text-gray-500 text-sm text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 