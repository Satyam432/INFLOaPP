import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, InputField } from '../../components';
import { useAuthStore } from '../../state';

export default function CreatorOnboardingScreen({ navigation }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [niche, setNiche] = useState('');
  const [instagram, setInstagram] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { updateUser } = useAuthStore();
  
  const handleComplete = async () => {
    setIsLoading(true);
    
    // Update user profile
    await updateUser({
      name,
      bio,
      niche,
      socialAccounts: { instagram }
    });
    
    // Navigate to main app
    navigation.replace('CreatorTab');
    setIsLoading(false);
  };
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView className="flex-1 px-6 py-4">
          <View className="items-center mb-8">
            <Text className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</Text>
            <Text className="text-gray-600 text-center">
              Help brands discover you by completing your creator profile
            </Text>
          </View>
          
          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          
          <InputField
            label="Bio"
            placeholder="Tell us about yourself..."
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
          />
          
          <InputField
            label="Niche"
            placeholder="e.g., Lifestyle, Fashion, Tech"
            value={niche}
            onChangeText={setNiche}
          />
          
          <InputField
            label="Instagram Handle"
            placeholder="@username"
            value={instagram}
            onChangeText={setInstagram}
            autoCapitalize="none"
          />
          
          <Button
            title="Complete Setup"
            onPress={handleComplete}
            loading={isLoading}
            disabled={!name || !bio || !niche}
            size="large"
            style={{ marginTop: 20 }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 