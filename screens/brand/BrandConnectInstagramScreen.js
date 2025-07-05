import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../state';

export default function BrandConnectInstagramScreen({ navigation }) {
  const [instagramHandle, setInstagramHandle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();

  const handleConnect = async () => {
    if (!instagramHandle.trim()) {
      Alert.alert('Error', 'Please enter your Instagram handle');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('📱 Connected Instagram:', instagramHandle);
      
      Alert.alert(
        'Instagram Connected!',
        `Successfully connected @${instagramHandle}`,
        [
          {
            text: 'Continue',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('❌ Instagram connection error:', error);
      Alert.alert('Error', 'Failed to connect Instagram. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900 ml-4">
          Connect Instagram
        </Text>
      </View>

      <ScrollView className="flex-1 px-6 py-8">
        {/* Instagram Icon */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full justify-center items-center mb-4">
            <Ionicons name="logo-instagram" size={40} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Instagram
          </Text>
          <Text className="text-gray-600 text-center">
            Connect your Instagram account to showcase your brand and reach more creators
          </Text>
        </View>

        {/* Benefits */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Benefits:</Text>
          
          <View className="flex-row items-center mb-3">
            <View className="w-6 h-6 bg-green-100 rounded-full justify-center items-center mr-3">
              <Ionicons name="checkmark" size={16} color="#10B981" />
            </View>
            <Text className="text-gray-700 flex-1">Showcase your brand to creators</Text>
          </View>
          
          <View className="flex-row items-center mb-3">
            <View className="w-6 h-6 bg-green-100 rounded-full justify-center items-center mr-3">
              <Ionicons name="checkmark" size={16} color="#10B981" />
            </View>
            <Text className="text-gray-700 flex-1">Increase collaboration opportunities</Text>
          </View>
          
          <View className="flex-row items-center mb-3">
            <View className="w-6 h-6 bg-green-100 rounded-full justify-center items-center mr-3">
              <Ionicons name="checkmark" size={16} color="#10B981" />
            </View>
            <Text className="text-gray-700 flex-1">Build trust with authentic content</Text>
          </View>
        </View>

        {/* Instagram Handle Input */}
        <View className="mb-8">
          <Text className="text-sm font-medium text-gray-700 mb-2">Instagram Handle</Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
            <Text className="text-gray-500 mr-2">@</Text>
            <TextInput
              value={instagramHandle}
              onChangeText={setInstagramHandle}
              placeholder="yourbrandname"
              className="flex-1 text-base text-gray-900"
            />
          </View>
        </View>

        {/* Connect Button */}
        <TouchableOpacity
          onPress={handleConnect}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? '#D1D5DB' : '#FF6B7A',
            paddingVertical: 16,
            borderRadius: 8,
            marginBottom: 12,
          }}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-semibold text-base">
            {isLoading ? 'Connecting...' : 'Connect Instagram'}
          </Text>
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity
          onPress={handleSkip}
          style={{
            paddingVertical: 16,
            borderRadius: 8,
          }}
          activeOpacity={0.8}
        >
          <Text className="text-gray-600 text-center font-medium text-base">
            Skip for now
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
} 