import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button } from '../../components';
import { useAuthStore } from '../../state';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';

export default function BrandHomeScreen({ navigation }) {
  const { user } = useAuthStore();
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || 'Brand'}!
          </Text>
          <Text className="text-gray-600 mt-1">
            Manage your campaigns and discover creators
          </Text>
        </View>

        <View className="px-6 py-4">
          <View className="flex-row space-x-4 mb-6">
            <Card variant="elevated" style={{ flex: 1 }}>
              <View className="items-center">
                <Text className="text-2xl font-bold text-green-600">3</Text>
                <Text className="text-gray-600 text-sm">Active Campaigns</Text>
              </View>
            </Card>
            <Card variant="elevated" style={{ flex: 1 }}>
              <View className="items-center">
                <Text className="text-2xl font-bold text-blue-600">12</Text>
                <Text className="text-gray-600 text-sm">Applications</Text>
              </View>
            </Card>
          </View>

          <View className="flex-row space-x-4 mb-6">
            <TouchableOpacity 
              className="flex-1"
              onPress={() => navigation.navigate('BrandCreateCampaign')}
            >
              <Card>
                <View className="items-center">
                  <View className="w-12 h-12 bg-green-100 rounded-full justify-center items-center mb-2">
                    <Ionicons name="add" size={24} color={Colors.accent} />
                  </View>
                  <Text className="text-gray-900 font-medium">Create Campaign</Text>
                </View>
              </Card>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1"
              onPress={() => navigation.navigate('Discover')}
            >
              <Card>
                <View className="items-center">
                  <View className="w-12 h-12 bg-blue-100 rounded-full justify-center items-center mb-2">
                    <Ionicons name="search" size={24} color={Colors.info} />
                  </View>
                  <Text className="text-gray-900 font-medium">Find Creators</Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}