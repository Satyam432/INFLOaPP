import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button } from '../../components';
import { useAuthStore } from '../../state';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';

export default function CreatorProfileScreen() {
  const { user, logout } = useAuthStore();
  
  const handleLogout = async () => {
    await logout();
  };
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6 py-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Profile</Text>
        
        {/* Profile Header */}
        <Card style={{ marginBottom: 20 }}>
          <View className="items-center py-4">
            <View className="w-20 h-20 bg-primary rounded-full justify-center items-center mb-3">
              <Text className="text-white text-2xl font-bold">
                {user?.name?.charAt(0) || 'C'}
              </Text>
            </View>
            <Text className="text-xl font-bold text-gray-900">{user?.name || 'Creator'}</Text>
            <Text className="text-gray-600">{user?.email}</Text>
            <Text className="text-sm text-gray-500 mt-1">{user?.niche || 'Content Creator'}</Text>
          </View>
        </Card>
        
        {/* Menu Items */}
        <Card style={{ marginBottom: 16 }}>
          <TouchableOpacity className="flex-row items-center py-4">
            <Ionicons name="person-outline" size={24} color={Colors.gray600} />
            <Text className="ml-3 flex-1 text-gray-900">Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray400} />
          </TouchableOpacity>
        </Card>
        
        <Card style={{ marginBottom: 16 }}>
          <TouchableOpacity className="flex-row items-center py-4">
            <Ionicons name="settings-outline" size={24} color={Colors.gray600} />
            <Text className="ml-3 flex-1 text-gray-900">Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray400} />
          </TouchableOpacity>
        </Card>
        
        <Card style={{ marginBottom: 16 }}>
          <TouchableOpacity className="flex-row items-center py-4">
            <Ionicons name="help-circle-outline" size={24} color={Colors.gray600} />
            <Text className="ml-3 flex-1 text-gray-900">Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray400} />
          </TouchableOpacity>
        </Card>
        
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={{ marginTop: 20 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
} 