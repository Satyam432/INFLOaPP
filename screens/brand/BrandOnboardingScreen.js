import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, InputField } from '../../components';
import { useAuth } from '../../components/AuthProvider';
import * as ImagePicker from 'expo-image-picker';

export default function BrandOnboardingScreen({ navigation }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    brandName: '',
    brandInstagram: '',
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

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      updateFormData('logoUrl', result.assets[0].uri);
    }
  };
  
  const handleComplete = async () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.brandName.trim() || !formData.brandInstagram.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      // Transform data to match expected format
      const onboardingData = {
        name: `${formData.firstName} ${formData.lastName}`,
        brandName: formData.brandName,
        instagramHandle: formData.brandInstagram,
        logoUrl: formData.logoUrl
      };
      
      console.log('🎯 Completing brand onboarding with:', onboardingData);
      await completeOnboarding(onboardingData);
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
          {/* First Name and Last Name Row */}
          <View className="flex-row mb-4">
            <View className="flex-1 mr-2">
              <Text className="text-sm font-medium text-gray-700 mb-2">First Name *</Text>
              <View className="border border-gray-300 rounded-lg px-4 py-3">
                <TextInput
                  value={formData.firstName}
                  onChangeText={(text) => updateFormData('firstName', text)}
                  placeholder="John"
                  className="text-base text-gray-900"
                />
              </View>
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-sm font-medium text-gray-700 mb-2">Last Name *</Text>
              <View className="border border-gray-300 rounded-lg px-4 py-3">
                <TextInput
                  value={formData.lastName}
                  onChangeText={(text) => updateFormData('lastName', text)}
                  placeholder="Doe"
                  className="text-base text-gray-900"
                />
              </View>
            </View>
          </View>

          {/* Brand Name */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Brand Name *</Text>
            <View className="border border-gray-300 rounded-lg px-4 py-3">
              <TextInput
                value={formData.brandName}
                onChangeText={(text) => updateFormData('brandName', text)}
                placeholder="Your Brand Name"
                className="text-base text-gray-900"
              />
            </View>
          </View>

          {/* Brand Instagram */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Brand Instagram *</Text>
            <View className="border border-gray-300 rounded-lg px-4 py-3">
              <TextInput
                value={formData.brandInstagram}
                onChangeText={(text) => updateFormData('brandInstagram', text)}
                placeholder="@yourbrand"
                className="text-base text-gray-900"
              />
            </View>
          </View>

          {/* Upload Logo */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Upload Logo</Text>
            <TouchableOpacity
              onPress={handleImagePicker}
              className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50"
            >
              <View className="flex-row items-center">
                {formData.logoUrl ? (
                  <View className="flex-row items-center">
                    <Image 
                      source={{ uri: formData.logoUrl }} 
                      className="w-12 h-12 rounded-lg mr-3"
                      style={{ width: 48, height: 48 }}
                    />
                    <View className="flex-1">
                      <Text className="text-base text-gray-900">Logo selected</Text>
                      <Text className="text-sm text-gray-600">Tap to change</Text>
                    </View>
                  </View>
                ) : (
                  <View className="flex-row items-center">
                    <Ionicons name="cloud-upload-outline" size={24} color="#6B7280" />
                    <Text className="text-base text-gray-600 ml-3">Choose file to upload</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
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