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
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Welcome, {user?.brandName || user?.name || 'Brand'}!
        </Text>
        <Text className="text-gray-600 mt-1">
          Ready to create your next campaign?
        </Text>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Campaign Stats */}
        <View className="px-6 py-6">
          <View className="flex-row space-x-4 mb-6">
            <Card variant="elevated" style={{ flex: 1 }}>
              <View className="items-center py-4">
                <Text className="text-2xl font-bold text-primary">3</Text>
                <Text className="text-gray-600 text-sm">Active Campaigns</Text>
              </View>
            </Card>
            <Card variant="elevated" style={{ flex: 1 }}>
              <View className="items-center py-4">
                <Text className="text-2xl font-bold text-blue-600">12</Text>
                <Text className="text-gray-600 text-sm">Applications</Text>
              </View>
            </Card>
            <Card variant="elevated" style={{ flex: 1 }}>
              <View className="items-center py-4">
                <Text className="text-2xl font-bold text-green-600">8</Text>
                <Text className="text-gray-600 text-sm">Collaborations</Text>
              </View>
            </Card>
          </View>

          {/* Quick Actions */}
          <Text className="text-lg font-bold text-gray-900 mb-4">Quick Actions</Text>
          
          <View className="flex-row space-x-4 mb-6">
            <TouchableOpacity 
              className="flex-1"
              onPress={() => navigation.navigate('BrandConnectInstagram')}
            >
              <Card>
                <View className="items-center py-4">
                  <View className="w-12 h-12 bg-purple-100 rounded-full justify-center items-center mb-2">
                    <Ionicons name="logo-instagram" size={24} color="#8B5CF6" />
                  </View>
                  <Text className="text-gray-900 font-medium text-center">Connect Instagram</Text>
                </View>
              </Card>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1"
              onPress={() => navigation.navigate('BrandApproveCreators')}
            >
              <Card>
                <View className="items-center py-4">
                  <View className="w-12 h-12 bg-blue-100 rounded-full justify-center items-center mb-2">
                    <Ionicons name="people" size={24} color="#3B82F6" />
                  </View>
                  <Text className="text-gray-900 font-medium text-center">Approve Creators</Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>

          <View className="flex-row space-x-4 mb-6">
            <TouchableOpacity 
              className="flex-1"
              onPress={() => navigation.navigate('BrandApproveContent')}
            >
              <Card>
                <View className="items-center py-4">
                  <View className="w-12 h-12 bg-green-100 rounded-full justify-center items-center mb-2">
                    <Ionicons name="document-text" size={24} color="#10B981" />
                  </View>
                  <Text className="text-gray-900 font-medium text-center">Review Content</Text>
                </View>
              </Card>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1"
              onPress={() => navigation.navigate('Campaigns')}
            >
              <Card>
                <View className="items-center py-4">
                  <View className="w-12 h-12 bg-orange-100 rounded-full justify-center items-center mb-2">
                    <Ionicons name="megaphone" size={24} color="#F59E0B" />
                  </View>
                  <Text className="text-gray-900 font-medium text-center">My Campaigns</Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>

          {/* Recent Activity */}
          <Text className="text-lg font-bold text-gray-900 mb-4">Recent Activity</Text>
          
          <Card style={{ marginBottom: 12 }}>
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-100 rounded-full justify-center items-center mr-3">
                <Ionicons name="person-add" size={16} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-900">New creator applied</Text>
                <Text className="text-xs text-gray-500">2 hours ago</Text>
              </View>
            </View>
          </Card>

          <Card style={{ marginBottom: 12 }}>
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-green-100 rounded-full justify-center items-center mr-3">
                <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-900">Campaign approved</Text>
                <Text className="text-xs text-gray-500">1 day ago</Text>
              </View>
            </View>
          </Card>

          <Card style={{ marginBottom: 12 }}>
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-purple-100 rounded-full justify-center items-center mr-3">
                <Ionicons name="eye" size={16} color="#8B5CF6" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-900">Content submitted for review</Text>
                <Text className="text-xs text-gray-500">2 days ago</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Bottom padding for FAB */}
        <View className="h-20" />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('BrandCreateCampaign')}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: '#FF6B7A',
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#FF6B7A',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}