import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, InputField } from '../../components';
import { useAuth } from '../../components/AuthProvider';

export default function BrandOnboardingScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    brandName: '',
    instagramHandle: '',
    logoUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { completeOnboarding } = useAuth();

  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleComplete = async () => {
    if (!formData.name.trim() || !formData.brandName.trim() || !formData.instagramHandle.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      console.log('🎯 Completing brand onboarding with:', formData);
      await completeOnboarding(formData);
      console.log('✅ Brand onboarding completed successfully');
      
      // Show loading screen for 2 seconds before navigating
      setTimeout(() => {
        // The navigation will be handled by the AuthProvider state change
        console.log('🚀 Onboarding complete - navigation will be handled by state change');
      }, 2000);
    } catch (error) {
      console.error('❌ Onboarding error:', error);
      Alert.alert('Error', 'Failed to complete onboarding');
      setIsLoading(false);
    }
  };

  // Show loading screen after onboarding completion
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: '#FF6B7A' }}>
        <View className="flex-1 justify-center items-center">
          <Text 
            style={{ 
              color: 'white', 
              fontSize: 48, 
              fontWeight: '300',
              fontStyle: 'italic'
            }}
          >
            Inflo
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
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

      <ScrollView className="flex-1 px-6 py-4">
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Complete Your Brand Profile
          </Text>
          <Text className="text-gray-600">
            Help creators discover your brand
          </Text>
        </View>

        <View className="mb-8">
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Your Name</Text>
            <View className="border border-gray-300 rounded-lg px-4 py-3">
              <TextInput
                value={formData.name}
                onChangeText={(text) => updateFormData('name', text)}
                placeholder="John Doe"
                className="text-base text-gray-900"
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Brand Name</Text>
            <View className="border border-gray-300 rounded-lg px-4 py-3">
              <TextInput
                value={formData.brandName}
                onChangeText={(text) => updateFormData('brandName', text)}
                placeholder="Your Brand Name"
                className="text-base text-gray-900"
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Instagram Handle</Text>
            <View className="border border-gray-300 rounded-lg px-4 py-3">
              <TextInput
                value={formData.instagramHandle}
                onChangeText={(text) => updateFormData('instagramHandle', text)}
                placeholder="@yourbrand"
                className="text-base text-gray-900"
              />
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Logo URL (Optional)</Text>
            <View className="border border-gray-300 rounded-lg px-4 py-3">
              <TextInput
                value={formData.logoUrl}
                onChangeText={(text) => updateFormData('logoUrl', text)}
                placeholder="https://yourlogo.com/logo.png"
                className="text-base text-gray-900"
              />
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={handleComplete}
          style={{
            backgroundColor: '#FF6B7A',
            paddingVertical: 16,
            borderRadius: 8,
          }}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-semibold text-base">
            Complete Setup
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
} 