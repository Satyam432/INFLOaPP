import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Card, Button, LoadingSpinner } from '../../components';
import { useOfferStore, useAuthStore } from '../../state';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';

// Mock API service for fetching offers
const fetchOffersFromAPI = async (userId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock offers data - in real app this would come from your backend
  const mockOffers = [
    {
      id: 'offer_1',
      campaignId: 'cmp_1',
      brandId: 'usr_brand_1',
      creatorId: userId,
      brandName: 'Fashion Forward Co.',
      campaignTitle: 'Spring Collection Launch',
      amount: 1500,
      message: 'We love your lifestyle content and would like to collaborate on our spring campaign!',
      requirements: ['2 Instagram posts', '5 story mentions', 'Product showcase'],
      deadline: '2024-03-15',
      status: 'pending',
      createdAt: '2024-01-22T09:15:00Z',
      type: 'received',
      campaignImage: 'https://picsum.photos/400/300?random=20'
    },
    {
      id: 'offer_2',
      campaignId: 'cmp_2',
      brandId: 'usr_brand_2',
      creatorId: userId,
      brandName: 'TechFlow Solutions',
      campaignTitle: 'Product Launch Campaign',
      amount: 2200,
      message: 'Perfect fit for our tech product launch! Your audience aligns with our target market.',
      requirements: ['1 YouTube video', '3 Instagram reels', 'Product unboxing'],
      deadline: '2024-04-01',
      status: 'pending',
      createdAt: '2024-01-25T16:45:00Z',
      type: 'received',
      campaignImage: 'https://picsum.photos/400/300?random=21'
    },
    {
      id: 'offer_3',
      campaignId: 'cmp_3',
      brandId: 'usr_brand_3',
      creatorId: userId,
      brandName: 'EcoLiving Brand',
      campaignTitle: 'Sustainable Living Series',
      amount: 800,
      message: 'Join our sustainability campaign and help spread awareness about eco-friendly living.',
      requirements: ['2 TikTok videos', '1 Instagram post', 'Educational content'],
      deadline: '2024-03-30',
      status: 'accepted',
      createdAt: '2024-01-20T11:30:00Z',
      type: 'received',
      campaignImage: 'https://picsum.photos/400/300?random=22'
    }
  ];
  
  return {
    success: true,
    data: mockOffers
  };
};

export default function CreatorOffersScreen({ navigation }) {
  const { user } = useAuthStore();
  const { offers, setOffers } = useOfferStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    try {
      setError(null);
      const response = await fetchOffersFromAPI(user?.userId);
      
      if (response.success) {
        setOffers(response.data);
      } else {
        setError('Failed to load offers');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Error loading offers:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadOffers();
    setIsRefreshing(false);
  };

  const handleAcceptOffer = async (offerId) => {
    Alert.alert(
      'Accept Offer',
      'Are you sure you want to accept this collaboration offer?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept',
          style: 'default',
          onPress: () => {
            // Update offer status
            setOffers(offers.map(offer => 
              offer.id === offerId 
                ? { ...offer, status: 'accepted' }
                : offer
            ));
            Alert.alert('Success', 'Offer accepted! The brand will be notified.');
          }
        }
      ]
    );
  };

  const handleDeclineOffer = async (offerId) => {
    Alert.alert(
      'Decline Offer',
      'Are you sure you want to decline this offer?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Decline',
          style: 'destructive',
          onPress: () => {
            setOffers(offers.map(offer => 
              offer.id === offerId 
                ? { ...offer, status: 'rejected' }
                : offer
            ));
            Alert.alert('Declined', 'Offer has been declined.');
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderOfferItem = ({ item }) => (
    <Card style={{ marginBottom: 16 }} shadow>
      <View className="space-y-4">
        {/* Header */}
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900">{item.campaignTitle}</Text>
            <Text className="text-sm text-gray-600 mt-1">{item.brandName}</Text>
          </View>
          <View className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
            <Text className="text-xs font-semibold uppercase">
              {item.status}
            </Text>
          </View>
        </View>

        {/* Amount */}
        <View className="bg-green-50 p-3 rounded-lg">
          <Text className="text-2xl font-bold text-green-700">${item.amount.toLocaleString()}</Text>
          <Text className="text-sm text-green-600">Collaboration Fee</Text>
        </View>

        {/* Message */}
        <View>
          <Text className="text-gray-700 leading-6">{item.message}</Text>
        </View>

        {/* Requirements */}
        <View>
          <Text className="text-sm font-semibold text-gray-900 mb-2">Requirements:</Text>
          <View className="space-y-1">
            {item.requirements.map((req, index) => (
              <View key={index} className="flex-row items-center">
                <View className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                <Text className="text-sm text-gray-600 flex-1">{req}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Deadline */}
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={16} color={Colors.gray500} />
          <Text className="text-sm text-gray-500 ml-2">
            Deadline: {formatDate(item.deadline)}
          </Text>
        </View>

        {/* Action Buttons */}
        {item.status === 'pending' && (
          <View className="flex-row space-x-3 pt-2">
            <Button
              title="Accept"
              onPress={() => handleAcceptOffer(item.id)}
              variant="success"
              size="small"
              style={{ flex: 1 }}
            />
            <Button
              title="Decline"
              onPress={() => handleDeclineOffer(item.id)}
              variant="outline"
              size="small"
              style={{ flex: 1 }}
            />
          </View>
        )}

        {/* Chat Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center py-3 border border-primary rounded-lg"
          onPress={() => navigation.navigate('ChatDetail', {
            chatId: `chat_${item.id}`,
            title: item.brandName
          })}
        >
          <Ionicons name="chatbubble-outline" size={18} color={Colors.primary} />
          <Text className="text-primary font-medium ml-2">Message Brand</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center py-12">
      <View className="w-24 h-24 bg-gray-100 rounded-full justify-center items-center mb-4">
        <Ionicons name="mail-outline" size={40} color={Colors.gray400} />
      </View>
      <Text className="text-xl font-semibold text-gray-900 mb-2">No Offers Yet</Text>
      <Text className="text-gray-600 text-center mb-6 px-8">
        Complete your portfolio to start receiving collaboration offers from brands
      </Text>
      <Button
        title="Build Portfolio"
        onPress={() => navigation.navigate('Portfolio')}
        variant="primary"
      />
    </View>
  );

  const renderErrorState = () => (
    <View className="flex-1 justify-center items-center py-12">
      <View className="w-24 h-24 bg-red-100 rounded-full justify-center items-center mb-4">
        <Ionicons name="alert-circle-outline" size={40} color={Colors.error} />
      </View>
      <Text className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</Text>
      <Text className="text-gray-600 text-center mb-6 px-8">{error}</Text>
      <Button
        title="Try Again"
        onPress={loadOffers}
        variant="primary"
      />
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <LoadingSpinner fullScreen text="Loading your offers..." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/* Header */}
        <View className="bg-white px-6 py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900">Collaboration Offers</Text>
          <Text className="text-gray-600 mt-1">
            {offers.length} {offers.length === 1 ? 'offer' : 'offers'} available
          </Text>
        </View>

        {/* Content */}
        {error ? (
          renderErrorState()
        ) : offers.length === 0 ? (
          renderEmptyState()
        ) : (
          <FlatList
            data={offers}
            renderItem={renderOfferItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                tintColor={Colors.primary}
                colors={[Colors.primary]}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
} 