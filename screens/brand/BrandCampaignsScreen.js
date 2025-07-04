import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Card, Button } from '../../components';
import { mockCampaigns } from '../../services/mockData';

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
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
} 