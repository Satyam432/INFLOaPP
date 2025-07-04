import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Button, InputField } from '../../components';
import { useAuthStore } from '../../state';

export default function BrandOnboardingScreen({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { updateUser } = useAuthStore();
  
  const handleComplete = async () => {
    setIsLoading(true);
    
    await updateUser({
      name,
      description,
      industry
    });
    
    navigation.replace('BrandTab');
    setIsLoading(false);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 py-4">
        <View className="items-center mb-8">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Complete Your Brand Profile</Text>
          <Text className="text-gray-600 text-center">
            Help creators discover your brand
          </Text>
        </View>
        
        <InputField
          label="Brand Name"
          placeholder="Enter your brand name"
          value={name}
          onChangeText={setName}
        />
        
        <InputField
          label="Description"
          placeholder="Tell us about your brand..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
        
        <InputField
          label="Industry"
          placeholder="e.g., Fashion, Tech, Food"
          value={industry}
          onChangeText={setIndustry}
        />
        
        <Button
          title="Complete Setup"
          onPress={handleComplete}
          loading={isLoading}
          disabled={!name || !description}
          size="large"
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
} 