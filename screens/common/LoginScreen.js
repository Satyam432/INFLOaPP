import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../../services';

export default function LoginScreen({ route, navigation }) {
  const { preSelectedRole } = route.params || {};
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNumberPress = (number) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber(prev => prev + number);
    }
  };

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const formatPhoneNumber = (number) => {
    if (number.length === 0) return '';
    if (number.length <= 3) return number;
    if (number.length <= 6) return `${number.slice(0, 3)} ${number.slice(3)}`;
    return `${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
  };

  const handleGetOTP = async () => {
    if (phoneNumber.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    try {
      const fullPhoneNumber = `+91 ${formatPhoneNumber(phoneNumber)}`;
      console.log('📱 Starting login with phone:', fullPhoneNumber);
      
      const response = await authService.login(fullPhoneNumber);
      
      if (response.success) {
        console.log('✅ OTP sent, navigating to verification');
        navigation.navigate('OTP', { 
          identifier: fullPhoneNumber,
          preSelectedRole 
        });
      } else {
        Alert.alert('Error', response.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const NumberButton = ({ number, letters }) => (
    <TouchableOpacity
      onPress={() => handleNumberPress(number)}
      className="flex-1 justify-center items-center py-4 mx-1"
      activeOpacity={0.7}
    >
      <Text className="text-3xl font-normal text-gray-900">{number}</Text>
      {letters && (
        <Text className="text-xs text-gray-500 mt-1 tracking-widest">{letters}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text 
          style={{ 
            fontSize: 20, 
            fontWeight: 'bold', 
            color: '#FF6B7A',
            marginLeft: 16
          }}
        >
          Inflo
        </Text>
      </View>

      <View className="flex-1 px-6">
        {/* Title */}
        <View className="mt-8 mb-12">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Enter your phone number
          </Text>
          <Text className="text-gray-600">
            We'll send you a one time password
          </Text>
        </View>

        {/* Phone Number Display */}
        <View className="mb-8">
          <View className="flex-row items-center border-b border-gray-300 pb-2">
            <View className="flex-row items-center mr-4">
              <Text className="text-lg text-gray-900">🇮🇳</Text>
              <Text className="text-lg text-gray-900 ml-2">+91</Text>
            </View>
            <Text className="text-2xl text-gray-900 flex-1">
              {formatPhoneNumber(phoneNumber) || ''}
            </Text>
            {phoneNumber.length > 0 && (
              <TouchableOpacity onPress={handleBackspace}>
                <Ionicons name="backspace-outline" size={24} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Number Pad */}
        <View className="flex-1 justify-center">
          {/* Row 1 */}
          <View className="flex-row mb-4">
            <NumberButton number="1" />
            <NumberButton number="2" letters="ABC" />
            <NumberButton number="3" letters="DEF" />
          </View>

          {/* Row 2 */}
          <View className="flex-row mb-4">
            <NumberButton number="4" letters="GHI" />
            <NumberButton number="5" letters="JKL" />
            <NumberButton number="6" letters="MNO" />
          </View>

          {/* Row 3 */}
          <View className="flex-row mb-4">
            <NumberButton number="7" letters="PQRS" />
            <NumberButton number="8" letters="TUV" />
            <NumberButton number="9" letters="WXYZ" />
          </View>

          {/* Row 4 */}
          <View className="flex-row mb-8">
            <View className="flex-1" />
            <NumberButton number="0" />
            <View className="flex-1" />
          </View>
        </View>

        {/* Get OTP Button */}
        <View className="mb-8">
          <TouchableOpacity
            onPress={handleGetOTP}
            disabled={phoneNumber.length !== 10 || isLoading}
            style={{
              backgroundColor: phoneNumber.length === 10 ? '#FF6B7A' : '#E5E7EB',
              paddingVertical: 16,
              borderRadius: 8,
              opacity: isLoading ? 0.7 : 1
            }}
            activeOpacity={0.8}
          >
            <Text 
              style={{
                color: phoneNumber.length === 10 ? 'white' : '#9CA3AF',
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center'
              }}
            >
              {isLoading ? 'Sending...' : 'Get OTP'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Role indicator */}
        {preSelectedRole && (
          <View className="items-center mb-4">
            <Text style={{ color: '#FF6B7A', fontSize: 14 }}>
              Signing up as {preSelectedRole === 'creator' ? 'Creator' : 'Brand'}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
} 