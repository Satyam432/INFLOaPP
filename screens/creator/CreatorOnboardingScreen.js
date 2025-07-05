import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InputField } from '../../components';
import { useAuth } from '../../components/AuthProvider';

export default function CreatorOnboardingScreen({ navigation }) {
  const { completeOnboarding } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    categories: [],
    instagramHandle: ''
  });

  const categories = [
    { id: 'lifestyle', name: 'Lifestyle', color: '#FF6B7A' },
    { id: 'beauty', name: 'Beauty', color: '#FF6B7A' },
    { id: 'fashion', name: 'Fashion', color: '#FF6B7A' },
    { id: 'food', name: 'Food', color: '#FF6B7A' },
    { id: 'travel', name: 'Travel', color: '#FF6B7A' },
    { id: 'fitness', name: 'Fitness', color: '#FF6B7A' },
    { id: 'technology', name: 'Technology', color: '#FF6B7A' },
    { id: 'entertainment', name: 'Entertainment', color: '#FF6B7A' }
  ];

  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const toggleCategory = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.dob.trim()) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (formData.categories.length === 0) {
        Alert.alert('Error', 'Please select at least one category');
        return;
      }
      setCurrentStep(3);
    }
  };

  const handleFinish = async () => {
    if (!formData.instagramHandle.trim()) {
      Alert.alert('Error', 'Please enter your Instagram handle');
      return;
    }

    setIsLoading(true);
    try {
      console.log('🎯 Completing creator onboarding with:', formData);
      await completeOnboarding(formData);
      console.log('✅ Creator onboarding completed successfully');
      
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

  const renderProgressBar = () => (
    <View className="flex-row items-center px-6 mb-8">
      <View className="flex-1 h-1 bg-gray-200 rounded-full">
        <View 
          className="h-1 rounded-full"
          style={{ 
            width: `${(currentStep / 3) * 100}%`,
            backgroundColor: '#FF6B7A'
          }}
        />
      </View>
      <Text className="ml-4 text-sm text-gray-600">
        {currentStep}/3
      </Text>
    </View>
  );

  const renderStep1 = () => (
    <View className="flex-1 px-6">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Let's get started
        </Text>
        <Text className="text-gray-600">
          Tell us a bit about yourself
        </Text>
      </View>

      <View className="mb-8">
        <View className="flex-row mb-4">
          <View className="flex-1 mr-2">
            <Text className="text-sm font-medium text-gray-700 mb-2">First name</Text>
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
            <Text className="text-sm font-medium text-gray-700 mb-2">Last Name</Text>
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

        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-2">DOB</Text>
          <View className="border border-gray-300 rounded-lg px-4 py-3">
            <TextInput
              value={formData.dob}
              onChangeText={(text) => updateFormData('dob', text)}
              placeholder="DD/MM/YYYY"
              className="text-base text-gray-900"
            />
          </View>
        </View>
      </View>

      <View className="mb-8">
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: '#FF6B7A',
            paddingVertical: 16,
            borderRadius: 8,
          }}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-semibold text-base">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View className="flex-1 px-6">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Choose your categories
        </Text>
        <Text className="text-gray-600">
          Select the categories that best define you
        </Text>
      </View>

      <View className="mb-8">
        <Text className="text-sm font-medium text-gray-700 mb-4">Categories</Text>
        <View className="flex-row flex-wrap">
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => toggleCategory(category.id)}
              style={{
                backgroundColor: formData.categories.includes(category.id) 
                  ? '#FF6B7A' 
                  : 'transparent',
                borderWidth: 1,
                borderColor: '#FF6B7A',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                marginRight: 8,
                marginBottom: 8
              }}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  color: formData.categories.includes(category.id) 
                    ? 'white' 
                    : '#FF6B7A',
                  fontSize: 14,
                  fontWeight: '500'
                }}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="mb-8">
        <TouchableOpacity
          onPress={handleNext}
          style={{
            backgroundColor: '#FF6B7A',
            paddingVertical: 16,
            borderRadius: 8,
          }}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-semibold text-base">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View className="flex-1 px-6">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-gray-900 mb-2">
          Connect Instagram
        </Text>
        <Text className="text-gray-600">
          Connect your Instagram to showcase your content
        </Text>
      </View>

      <View className="mb-8">
        <Text className="text-sm font-medium text-gray-700 mb-2">Instagram Handle</Text>
        <View className="border border-gray-300 rounded-lg px-4 py-3">
          <TextInput
            value={formData.instagramHandle}
            onChangeText={(text) => updateFormData('instagramHandle', text)}
            placeholder="@yourusername"
            className="text-base text-gray-900"
          />
        </View>
      </View>

      <View className="mb-8">
        <TouchableOpacity
          onPress={handleFinish}
          style={{
            backgroundColor: '#FF6B7A',
            paddingVertical: 16,
            borderRadius: 8,
          }}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center font-semibold text-base">
            Finish
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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

      {/* Progress Bar */}
      {renderProgressBar()}

      {/* Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </ScrollView>
    </SafeAreaView>
  );
} 