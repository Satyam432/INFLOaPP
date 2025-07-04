import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Card, Button } from '../../components';
import { useAuthStore } from '../../state';

export default function BrandProfileScreen() {
  const { user, logout } = useAuthStore();
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-6 py-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Profile</Text>
        
        <Card style={{ marginBottom: 20 }}>
          <View className="items-center py-4">
            <View className="w-20 h-20 bg-green-600 rounded-full justify-center items-center mb-3">
              <Text className="text-white text-2xl font-bold">
                {user?.name?.charAt(0) || 'B'}
              </Text>
            </View>
            <Text className="text-xl font-bold text-gray-900">{user?.name || 'Brand'}</Text>
            <Text className="text-gray-600">{user?.email}</Text>
          </View>
        </Card>
        
        <Button
          title="Logout"
          onPress={logout}
          variant="outline"
        />
      </View>
    </SafeAreaView>
  );
} 