import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button, InputField, Card } from '../../components';
import { authService } from '../../services';
import { useAuth } from '../../components/AuthProvider';
import { Colors } from '../../constants';

export default function OTPScreen({ route, navigation }) {
  const { identifier, preSelectedRole } = route.params;
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState(preSelectedRole || '');
  const [timer, setTimer] = useState(60);
  
  const { login } = useAuth();

  useEffect(() => {
    console.log('📱 OTP Screen loaded for:', identifier, 'Pre-selected role:', preSelectedRole);
    
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
    
    if (otp.length !== 6) {
      Alert.alert('Error', 'OTP must be 6 digits. Use: 123456');
      return;
    }

    setIsLoading(true);
    try {
      console.log('🔑 Verifying OTP:', otp, 'for user:', identifier);
      const response = await authService.verifyOTP(identifier, otp);
      
      if (response.success) {
        console.log('✅ OTP verification successful:', response.data);
        
        if (response.data.requiresRoleSelection && !preSelectedRole) {
          // New user and no pre-selected role - show role selection
          console.log('🎭 Showing role selection for new user');
          setShowRoleSelection(true);
        } else {
          // Existing user OR new user with pre-selected role - proceed
          const userRole = response.data.user?.role || preSelectedRole || selectedRole;
          console.log('👤 User role determined as:', userRole);
          
          if (response.data.user && !response.data.user.isNewUser) {
            // Existing user - login directly to main app
            console.log('🔄 Logging in existing user');
            await login(response.data.user, response.data.token);
            
            // Navigate to main app for existing users
            if (userRole === 'creator') {
              navigation.replace('CreatorNavigator');
            } else if (userRole === 'brand') {
              navigation.replace('BrandNavigator');
            }
          } else {
            // New user - complete signup with selected role then go to onboarding
            console.log('🆕 Completing signup for new user with role:', userRole);
            await handleRoleSelection(userRole);
            return;
          }
        }
      } else {
        console.log('❌ OTP verification failed:', response.message);
        Alert.alert('Error', response.message || 'Invalid OTP. Use: 123456');
      }
    } catch (error) {
      console.error('💥 OTP verification error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelection = async (roleToUse = selectedRole) => {
    if (!roleToUse) {
      Alert.alert('Error', 'Please select your role');
      return;
    }

    setIsLoading(true);
    try {
      console.log('👤 Creating new user with role:', roleToUse);
      const userData = {
        email: identifier,
        role: roleToUse,
        name: '', // Will be filled in onboarding
      };

      const response = await authService.completeSignup(userData);
      
      if (response.success) {
        console.log('✅ Signup completed, logging in user');
        await login(response.data.user, response.data.token);
        
        // Navigate to onboarding for new users
        console.log('🧭 Navigating to onboarding for:', roleToUse);
        if (roleToUse === 'creator') {
          navigation.replace('CreatorOnboarding');
        } else if (roleToUse === 'brand') {
          navigation.replace('BrandOnboarding');
        }
      } else {
        console.log('❌ Signup failed:', response.message);
        Alert.alert('Error', response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('💥 Signup error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      console.log('📤 Resending OTP to:', identifier);
      await authService.login(identifier);
      setTimer(60);
      Alert.alert('Success', 'OTP sent successfully (always use: 123456)');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend OTP');
    }
  };

  if (showRoleSelection) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-6 justify-center">
          <View className="items-center mb-8">
            <View 
              style={{ 
                width: 80, 
                height: 80, 
                backgroundColor: '#FF6B7A', 
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16
              }}
            >
              <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>I</Text>
            </View>
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
            onPress={() => handleRoleSelection()}
            loading={isLoading}
            disabled={!selectedRole}
            size="large"
            style={{ backgroundColor: '#FF6B7A' }}
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
            <View 
              style={{ 
                width: 80, 
                height: 80, 
                backgroundColor: '#FF6B7A', 
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 16
              }}
            >
              <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>I</Text>
            </View>
            <Text className="text-2xl font-bold text-gray-900 mb-2">Verify OTP</Text>
            <Text className="text-gray-600 text-center">
              Enter the 6-digit code sent to {identifier}
            </Text>
            {preSelectedRole && (
              <View className="mt-4 px-4 py-2 bg-coral-50 rounded-full">
                <Text style={{ color: '#FF6B7A', fontSize: 14, fontWeight: '500' }}>
                  Signing up as {preSelectedRole === 'creator' ? 'Creator' : 'Brand'}
                </Text>
              </View>
            )}
          </View>

          <View className="mb-8">
            <InputField
              label="OTP Code"
              placeholder="123456"
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
              disabled={!otp.trim()}
              size="large"
              style={{ backgroundColor: '#FF6B7A' }}
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
                style={{ borderColor: '#FF6B7A' }}
              />
            )}
          </View>

          <View style={{ backgroundColor: '#FEF3F2', padding: 16, borderRadius: 12, marginTop: 32 }}>
            <Text style={{ color: '#B91C1C', fontWeight: '600', marginBottom: 8, fontSize: 16 }}>
              🔑 Demo OTP
            </Text>
            <Text style={{ color: '#DC2626', fontSize: 14, lineHeight: 20 }}>
              ✅ Always use: 123456{'\n'}
              ✅ Any other code will fail
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 