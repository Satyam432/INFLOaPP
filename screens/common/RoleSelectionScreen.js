import React, { useState } from 'react';
import { View, Text, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { authService } from '../../services';
import { useAuth } from '../../components/AuthProvider';
import { useAuthStore } from '../../state';

export default function RoleSelectionScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { setRole } = useAuthStore();

  const handleRoleSelection = async (selectedRole) => {
    setIsLoading(true);
    
    try {
      console.log('🎭 Role selected:', selectedRole);
      
      // Save role to Zustand store
      await setRole(selectedRole);
      
      // Navigate to login screen with pre-selected role
      navigation.navigate('Login', { preSelectedRole: selectedRole });
      
    } catch (error) {
      console.error('❌ Error selecting role:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View className="flex-1 justify-center items-center px-8">
        
        {/* Inflo Logo and Branding */}
        <View className="items-center mb-16">
          <Text 
            style={{ 
              fontSize: 42, 
              fontWeight: 'bold', 
              color: '#FF6B7A',
              fontFamily: 'cursive',
              marginBottom: 8
            }}
          >
            Inflo
          </Text>
          <Text 
            style={{ 
              fontSize: 16, 
              color: '#FF6B7A',
              textAlign: 'center',
              lineHeight: 24
            }}
          >
            Brand-creator collaborations{'\n'}made easy
          </Text>
        </View>

        {/* Role Selection Buttons */}
        <View className="w-full max-w-sm">
          
          {/* I'm a creator button - filled */}
          <TouchableOpacity
            onPress={() => handleRoleSelection('creator')}
            disabled={isLoading}
            style={{
              backgroundColor: '#FF6B7A',
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 25,
              marginBottom: 16,
              shadowColor: '#FF6B7A',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
            activeOpacity={0.8}
          >
            <Text 
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center'
              }}
            >
              I'm a creator
            </Text>
          </TouchableOpacity>

          {/* I'm a brand button - outlined */}
          <TouchableOpacity
            onPress={() => handleRoleSelection('brand')}
            disabled={isLoading}
            style={{
              backgroundColor: 'transparent',
              borderWidth: 2,
              borderColor: '#FF6B7A',
              paddingVertical: 14,
              paddingHorizontal: 32,
              borderRadius: 25,
            }}
            activeOpacity={0.8}
          >
            <Text 
              style={{
                color: '#FF6B7A',
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center'
              }}
            >
              I'm a brand
            </Text>
          </TouchableOpacity>
          
        </View>
        
      </View>
    </SafeAreaView>
  );
} 