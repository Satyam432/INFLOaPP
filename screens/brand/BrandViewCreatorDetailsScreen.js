import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components';

export default function BrandViewCreatorDetailsScreen({ navigation, route }) {
  const { creator } = route.params;
  const [showAffiliate, setShowAffiliate] = useState(false);
  const [showProduct, setShowProduct] = useState(false);

  // Mock detailed creator data
  const creatorDetails = {
    ...creator,
    bio: "Fashion enthusiast & lifestyle content creator. I love sharing my style tips and daily outfits with my amazing community!",
    location: "New York, NY",
    joinedDate: "March 2021",
    metrics: {
      avgLikes: "2.1K",
      avgComments: "180",
      avgShares: "45",
      postFrequency: "5-7 posts/week"
    },
    demographics: {
      ageRange: "25-34",
      gender: "Female 85%",
      topLocations: ["New York", "Los Angeles", "Chicago"]
    },
    deliveryMethod: "Home Address",
    affiliateCode: "SARAH2024",
    productCode: "BRAND-SARAH-001",
    portfolioImages: [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg",
      "https://example.com/image3.jpg"
    ]
  };

  const handleApprove = () => {
    Alert.alert(
      'Approve Creator',
      `Are you sure you want to approve ${creator.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: () => {
            console.log('✅ Approved creator:', creator.name);
            Alert.alert('Success', `${creator.name} has been approved!`);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleReject = () => {
    Alert.alert(
      'Reject Creator',
      `Are you sure you want to reject ${creator.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            console.log('❌ Rejected creator:', creator.name);
            Alert.alert('Success', `${creator.name} has been rejected.`);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleMessage = () => {
    navigation.navigate('ChatDetail', { 
      title: creator.name,
      creatorId: creator.id 
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900 ml-4">
          Creator Details
        </Text>
        <TouchableOpacity onPress={handleMessage} className="ml-auto">
          <Ionicons name="chatbubble-outline" size={24} color="#FF6B7A" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Creator Profile */}
        <Card style={{ margin: 16 }}>
          <View className="items-center py-4">
            {/* Avatar */}
            <View className="w-20 h-20 bg-gray-300 rounded-full justify-center items-center mb-4">
              {creatorDetails.avatar ? (
                <Image source={{ uri: creatorDetails.avatar }} className="w-20 h-20 rounded-full" />
              ) : (
                <Text className="text-gray-600 font-bold text-2xl">
                  {creator.name.charAt(0)}
                </Text>
              )}
            </View>

            {/* Basic Info */}
            <Text className="text-xl font-bold text-gray-900 mb-1">{creator.name}</Text>
            <Text className="text-gray-600 mb-2">{creator.handle}</Text>
            <View className="bg-gray-100 px-3 py-1 rounded-full mb-3">
              <Text className="text-sm font-medium text-gray-700">{creator.category}</Text>
            </View>

            {/* Location */}
            <View className="flex-row items-center mb-2">
              <Ionicons name="location-outline" size={16} color="#6B7280" />
              <Text className="text-gray-600 ml-1">{creatorDetails.location}</Text>
            </View>

            {/* Bio */}
            <Text className="text-gray-700 text-center text-sm leading-5">
              {creatorDetails.bio}
            </Text>
          </View>
        </Card>

        {/* Stats */}
        <Card style={{ margin: 16 }}>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Statistics</Text>
          <View className="flex-row justify-between mb-4">
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-900">{creator.followers}</Text>
              <Text className="text-sm text-gray-600">Followers</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-900">{creator.engagement}</Text>
              <Text className="text-sm text-gray-600">Engagement</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-900">{creatorDetails.metrics.avgLikes}</Text>
              <Text className="text-sm text-gray-600">Avg Likes</Text>
            </View>
          </View>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-900">{creatorDetails.metrics.avgComments}</Text>
              <Text className="text-sm text-gray-600">Avg Comments</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-900">{creatorDetails.metrics.postFrequency}</Text>
              <Text className="text-sm text-gray-600">Post Frequency</Text>
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-gray-900">{creatorDetails.joinedDate}</Text>
              <Text className="text-sm text-gray-600">Joined</Text>
            </View>
          </View>
        </Card>

        {/* Delivery Information */}
        <Card style={{ margin: 16 }}>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</Text>
          <View className="flex-row items-center mb-3">
            <Ionicons name="location-outline" size={20} color="#6B7280" />
            <Text className="text-gray-700 ml-3">Delivery Method: {creatorDetails.deliveryMethod}</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Ionicons name="time-outline" size={20} color="#6B7280" />
            <Text className="text-gray-700 ml-3">Preferred Time: Weekdays 10AM-4PM</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="shield-checkmark-outline" size={20} color="#6B7280" />
            <Text className="text-gray-700 ml-3">Verified Address</Text>
          </View>
        </Card>

        {/* Affiliate & Product Codes */}
        <Card style={{ margin: 16 }}>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Codes & Tracking</Text>
          
          {/* Affiliate Code */}
          <TouchableOpacity
            onPress={() => setShowAffiliate(!showAffiliate)}
            className="flex-row items-center justify-between mb-3"
          >
            <View className="flex-row items-center">
              <Ionicons name="link-outline" size={20} color="#6B7280" />
              <Text className="text-gray-700 ml-3">Affiliate Code</Text>
            </View>
            <Ionicons 
              name={showAffiliate ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#6B7280" 
            />
          </TouchableOpacity>
          {showAffiliate && (
            <View className="bg-gray-50 px-3 py-2 rounded-lg mb-3">
              <Text className="text-gray-900 font-mono">{creatorDetails.affiliateCode}</Text>
            </View>
          )}

          {/* Product Code */}
          <TouchableOpacity
            onPress={() => setShowProduct(!showProduct)}
            className="flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <Ionicons name="cube-outline" size={20} color="#6B7280" />
              <Text className="text-gray-700 ml-3">Product Code</Text>
            </View>
            <Ionicons 
              name={showProduct ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#6B7280" 
            />
          </TouchableOpacity>
          {showProduct && (
            <View className="bg-gray-50 px-3 py-2 rounded-lg mt-3">
              <Text className="text-gray-900 font-mono">{creatorDetails.productCode}</Text>
            </View>
          )}
        </Card>

        {/* Portfolio */}
        <Card style={{ margin: 16 }}>
          <Text className="text-lg font-semibold text-gray-900 mb-4">Recent Work</Text>
          <View className="flex-row justify-between">
            {[1, 2, 3].map((item) => (
              <View key={item} className="w-20 h-20 bg-gray-200 rounded-lg justify-center items-center">
                <Ionicons name="image-outline" size={24} color="#9CA3AF" />
              </View>
            ))}
          </View>
        </Card>

        {/* Action Buttons */}
        <View className="flex-row mx-4 mb-8 space-x-3">
          <TouchableOpacity
            onPress={handleReject}
            className="flex-1 bg-red-100 py-4 rounded-lg"
          >
            <Text className="text-red-600 font-semibold text-center">Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleApprove}
            className="flex-1 py-4 rounded-lg"
            style={{ backgroundColor: '#FF6B7A' }}
          >
            <Text className="text-white font-semibold text-center">Approve</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 