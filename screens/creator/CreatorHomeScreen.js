import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card, LoadingSpinner } from '../../components';
import { useAuthStore, useOfferStore, useCampaignStore } from '../../state';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';
import { mockOffers, mockCampaigns } from '../../services/mockData';

export default function CreatorHomeScreen({ navigation }) {
  const { user } = useAuthStore();
  const { offers, setOffers } = useOfferStore();
  const { campaigns, setCampaigns } = useCampaignStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Simulate loading
    setTimeout(() => {
      setOffers(mockOffers);
      setCampaigns(mockCampaigns);
      setIsLoading(false);
    }, 1000);
  };

  const pendingOffers = offers.filter(o => o.status === 'pending');
  const activeCampaigns = campaigns.filter(c => c.status === 'active');

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Loading dashboard..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name || 'Creator'}!
          </Text>
          <Text className="text-gray-600 mt-1">
            Here's what's happening with your content
          </Text>
        </View>

        {/* Quick Stats */}
        <View className="px-6 py-4">
          <View className="flex-row space-x-4">
            <Card variant="elevated" style={{ flex: 1 }}>
              <View className="items-center">
                <Text className="text-2xl font-bold text-primary">{pendingOffers.length}</Text>
                <Text className="text-gray-600 text-sm">Pending Offers</Text>
              </View>
            </Card>
            <Card variant="elevated" style={{ flex: 1 }}>
              <View className="items-center">
                <Text className="text-2xl font-bold text-green-600">{activeCampaigns.length}</Text>
                <Text className="text-gray-600 text-sm">Active Campaigns</Text>
              </View>
            </Card>
            <Card variant="elevated" style={{ flex: 1 }}>
              <View className="items-center">
                <Text className="text-2xl font-bold text-yellow-600">$2,450</Text>
                <Text className="text-gray-600 text-sm">This Month</Text>
              </View>
            </Card>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-4">
          <Text className="text-lg font-bold text-gray-900 mb-3">Quick Actions</Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity 
              className="flex-1"
              onPress={() => navigation.navigate('Portfolio')}
            >
              <Card>
                <View className="items-center">
                  <View className="w-12 h-12 bg-purple-100 rounded-full justify-center items-center mb-2">
                    <Ionicons name="briefcase" size={24} color={Colors.primary} />
                  </View>
                  <Text className="text-gray-900 font-medium">Portfolio</Text>
                </View>
              </Card>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1"
              onPress={() => navigation.navigate('Offers')}
            >
              <Card>
                <View className="items-center">
                  <View className="w-12 h-12 bg-green-100 rounded-full justify-center items-center mb-2">
                    <Ionicons name="mail" size={24} color={Colors.accent} />
                  </View>
                  <Text className="text-gray-900 font-medium">View Offers</Text>
                </View>
              </Card>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Offers */}
        <View className="px-6 mb-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-900">Recent Offers</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Offers')}>
              <Text className="text-primary">View All</Text>
            </TouchableOpacity>
          </View>
          
          {pendingOffers.slice(0, 3).map((offer) => (
            <Card key={offer.id} style={{ marginBottom: 12 }}>
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="font-bold text-gray-900">${offer.amount}</Text>
                  <Text className="text-gray-600 mt-1">{offer.message}</Text>
                  <Text className="text-sm text-gray-500 mt-2">
                    Deadline: {new Date(offer.deadline).toLocaleDateString()}
                  </Text>
                </View>
                <View className="bg-yellow-100 px-2 py-1 rounded">
                  <Text className="text-yellow-800 text-xs font-medium">Pending</Text>
                </View>
              </View>
            </Card>
          ))}
          
          {pendingOffers.length === 0 && (
            <Card>
              <View className="items-center py-4">
                <Ionicons name="mail-outline" size={32} color={Colors.gray400} />
                <Text className="text-gray-500 mt-2">No pending offers</Text>
              </View>
            </Card>
          )}
        </View>

        {/* Available Campaigns */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-3">Available Campaigns</Text>
          
          {activeCampaigns.slice(0, 2).map((campaign) => (
            <Card key={campaign.id} style={{ marginBottom: 12 }}>
              <View>
                <Text className="font-bold text-gray-900">{campaign.title}</Text>
                <Text className="text-gray-600 mt-1">{campaign.description}</Text>
                <View className="flex-row justify-between items-center mt-3">
                  <Text className="text-green-600 font-bold">${campaign.budget}</Text>
                  <View className="bg-blue-100 px-2 py-1 rounded">
                    <Text className="text-blue-800 text-xs font-medium">{campaign.niche}</Text>
                  </View>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 