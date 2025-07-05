import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Button } from '../../components';
import { mockCampaigns } from '../../services/mockData';
import { Ionicons } from '@expo/vector-icons';

export default function BrandCampaignsScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6 py-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-900">Campaigns</Text>
          <Button 
            title="Create" 
            size="small" 
            onPress={() => navigation.navigate('BrandCreateCampaign')}
          />
        </View>

        {/* Quick Actions */}
        <View className="flex-row space-x-4 mb-6">
          <TouchableOpacity 
            className="flex-1"
            onPress={() => navigation.navigate('BrandApproveCreators')}
          >
            <Card>
              <View className="items-center py-3">
                <View className="w-10 h-10 bg-blue-100 rounded-full justify-center items-center mb-2">
                  <Ionicons name="people" size={20} color="#3B82F6" />
                </View>
                <Text className="text-gray-900 font-medium text-center text-sm">Approve Creators</Text>
              </View>
            </Card>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="flex-1"
            onPress={() => navigation.navigate('BrandApproveContent')}
          >
            <Card>
              <View className="items-center py-3">
                <View className="w-10 h-10 bg-green-100 rounded-full justify-center items-center mb-2">
                  <Ionicons name="document-text" size={20} color="#10B981" />
                </View>
                <Text className="text-gray-900 font-medium text-center text-sm">Review Content</Text>
              </View>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Campaign List */}
        <Text className="text-lg font-semibold text-gray-900 mb-4">Your Campaigns</Text>
        
        {mockCampaigns.map((campaign) => (
          <Card key={campaign.id} style={{ marginBottom: 16 }}>
            <View>
              <Text className="font-bold text-gray-900">{campaign.title}</Text>
              <Text className="text-gray-600 mt-1">{campaign.description}</Text>
              <View className="flex-row justify-between items-center mt-3">
                <Text className="text-green-600 font-bold">${campaign.budget}</Text>
                <View className={`px-2 py-1 rounded ${
                  campaign.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <Text className={`text-xs font-medium ${
                    campaign.status === 'active' ? 'text-green-800' : 'text-gray-800'
                  }`}>
                    {campaign.status.toUpperCase()}
                  </Text>
                </View>
              </View>
              
              {/* Campaign Actions */}
              <View className="flex-row justify-between items-center mt-3 pt-3 border-t border-gray-100">
                <TouchableOpacity 
                  onPress={() => navigation.navigate('BrandApproveCreators')}
                  className="flex-row items-center"
                >
                  <Ionicons name="people-outline" size={16} color="#6B7280" />
                  <Text className="text-gray-600 text-sm ml-1">View Applicants</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => navigation.navigate('BrandApproveContent')}
                  className="flex-row items-center"
                >
                  <Ionicons name="document-text-outline" size={16} color="#6B7280" />
                  <Text className="text-gray-600 text-sm ml-1">Review Content</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
} 