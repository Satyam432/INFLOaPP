import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button, InputField, Card } from '../../components';
import { authService } from '../../services';
import { useAuthStore } from '../../state';
import { Colors } from '../../constants';

export default function OTPScreen({ route, navigation }) {
  const { identifier } = route.params;
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [timer, setTimer] = useState(60);
  
  const { login } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerifyOTP = async () => {
    if (!otp.trim() || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await authService.verifyOTP(identifier, otp);
      
      if (response.success) {
        if (response.data.requiresRoleSelection) {
          // New user - show role selection
          setShowRoleSelection(true);
        } else {
          // Existing user - login and navigate
          await login(response.data.user, response.data.token);
          
          if (response.data.user.role === 'creator') {
            navigation.replace('CreatorNavigator');
          } else if (response.data.user.role === 'brand') {
            navigation.replace('BrandNavigator');
          }
        }
      } else {
        Alert.alert('Error', response.message || 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelection = async () => {
    if (!selectedRole) {
      Alert.alert('Error', 'Please select your role');
      return;
    }

    setIsLoading(true);
    try {
      const userData = {
        email: identifier,
        role: selectedRole,
        name: '', // Will be filled in onboarding
      };

      const response = await authService.completeSignup(userData);
      
      if (response.success) {
        await login(response.data.user, response.data.token);
        
        // Navigate to appropriate onboarding
        if (selectedRole === 'creator') {
          navigation.replace('CreatorNavigator');
        } else if (selectedRole === 'brand') {
          navigation.replace('BrandNavigator');
        }
      } else {
        Alert.alert('Error', response.message || 'Signup failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await authService.login(identifier);
      setTimer(60);
      Alert.alert('Success', 'OTP sent successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  if (showRoleSelection) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6 justify-center">
          <View className="items-center mb-8">
            <Text className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</Text>
            <Text className="text-gray-600 text-center">
              Select how you want to use Inflo
            </Text>
          </View>

          <View className="mb-8">
            <Card
              onPress={() => setSelectedRole('creator')}
              variant={selectedRole === 'creator' ? 'outlined' : 'default'}
              style={{ marginBottom: 16 }}
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-purple-100 rounded-full justify-center items-center mr-4">
                  <Text className="text-purple-600 text-xl">🎨</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">Creator</Text>
                  <Text className="text-gray-600">Create content and collaborate with brands</Text>
                </View>
              </View>
            </Card>

            <Card
              onPress={() => setSelectedRole('brand')}
              variant={selectedRole === 'brand' ? 'outlined' : 'default'}
            >
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-green-100 rounded-full justify-center items-center mr-4">
                  <Text className="text-green-600 text-xl">🏢</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">Brand</Text>
                  <Text className="text-gray-600">Find creators and manage campaigns</Text>
                </View>
              </View>
            </Card>
          </View>

          <Button
            title="Continue"
            onPress={handleRoleSelection}
            loading={isLoading}
            disabled={!selectedRole}
            size="large"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 px-6 justify-center">
          <View className="items-center mb-8">
            <Text className="text-2xl font-bold text-gray-900 mb-2">Verify OTP</Text>
            <Text className="text-gray-600 text-center">
              Enter the 6-digit code sent to {identifier}
            </Text>
          </View>

          <View className="mb-8">
            <InputField
              label="OTP Code"
              placeholder="Enter 6-digit code"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              maxLength={6}
              leftIcon="lock-closed"
            />

            <Button
              title="Verify OTP"
              onPress={handleVerifyOTP}
              loading={isLoading}
              disabled={!otp.trim() || otp.length !== 6}
              size="large"
            />
          </View>

          <View className="items-center">
            {timer > 0 ? (
              <Text className="text-gray-500 text-sm">
                Resend OTP in {timer}s
              </Text>
            ) : (
              <Button
                title="Resend OTP"
                onPress={handleResendOTP}
                variant="outline"
                size="small"
              />
            )}
          </View>

          {/* Demo Info */}
          <View className="bg-yellow-50 p-4 rounded-lg mt-6">
            <Text className="text-yellow-800 font-medium mb-1">Demo Code</Text>
            <Text className="text-yellow-600 text-sm">Use OTP: 123456</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 