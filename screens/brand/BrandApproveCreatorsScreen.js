import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components';

export default function BrandApproveCreatorsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('pending');

  // Mock data for creators
  const creators = {
    pending: [
      {
        id: 1,
        name: 'Sarah Johnson',
        handle: '@sarahjohnson',
        followers: '45.2K',
        engagement: '4.2%',
        category: 'Fashion',
        avatar: null,
        appliedAt: '2 hours ago'
      },
      {
        id: 2,
        name: 'Mike Chen',
        handle: '@mikecreates',
        followers: '28.5K',
        engagement: '3.8%',
        category: 'Tech',
        avatar: null,
        appliedAt: '5 hours ago'
      },
      {
        id: 3,
        name: 'Emma Wilson',
        handle: '@emmawilson',
        followers: '67.1K',
        engagement: '5.1%',
        category: 'Lifestyle',
        avatar: null,
        appliedAt: '1 day ago'
      }
    ],
    approved: [
      {
        id: 4,
        name: 'Alex Rodriguez',
        handle: '@alexrodriguez',
        followers: '32.8K',
        engagement: '4.5%',
        category: 'Fitness',
        avatar: null,
        approvedAt: '3 days ago'
      }
    ],
    rejected: [
      {
        id: 5,
        name: 'Lisa Park',
        handle: '@lisapark',
        followers: '12.3K',
        engagement: '2.1%',
        category: 'Beauty',
        avatar: null,
        rejectedAt: '5 days ago'
      }
    ]
  };

  const handleApprove = (creator) => {
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
          }
        }
      ]
    );
  };

  const handleReject = (creator) => {
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
          }
        }
      ]
    );
  };

  const handleViewProfile = (creator) => {
    navigation.navigate('BrandViewCreatorDetails', { creator });
  };

  const renderCreatorCard = (creator) => (
    <Card key={creator.id} style={{ marginBottom: 12 }}>
      <View className="flex-row items-center">
        {/* Avatar */}
        <View className="w-12 h-12 bg-gray-300 rounded-full justify-center items-center mr-4">
          {creator.avatar ? (
            <Image source={{ uri: creator.avatar }} className="w-12 h-12 rounded-full" />
          ) : (
            <Text className="text-gray-600 font-bold text-lg">
              {creator.name.charAt(0)}
            </Text>
          )}
        </View>

        {/* Creator Info */}
        <View className="flex-1">
          <Text className="font-semibold text-gray-900">{creator.name}</Text>
          <Text className="text-sm text-gray-600">{creator.handle}</Text>
          <View className="flex-row items-center mt-1">
            <Text className="text-xs text-gray-500">{creator.followers} followers</Text>
            <Text className="text-xs text-gray-400 mx-2">•</Text>
            <Text className="text-xs text-gray-500">{creator.engagement} engagement</Text>
          </View>
        </View>

        {/* Category Badge */}
        <View className="bg-gray-100 px-2 py-1 rounded-full mr-3">
          <Text className="text-xs font-medium text-gray-700">{creator.category}</Text>
        </View>

        {/* Actions */}
        <TouchableOpacity
          onPress={() => handleViewProfile(creator)}
          className="p-2"
        >
          <Ionicons name="eye-outline" size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Action Buttons for Pending */}
      {activeTab === 'pending' && (
        <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <Text className="text-xs text-gray-500">Applied {creator.appliedAt}</Text>
          <View className="flex-row space-x-2">
            <TouchableOpacity
              onPress={() => handleReject(creator)}
              className="bg-red-100 px-4 py-2 rounded-lg"
            >
              <Text className="text-red-600 font-medium text-sm">Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleApprove(creator)}
              className="bg-green-100 px-4 py-2 rounded-lg"
            >
              <Text className="text-green-600 font-medium text-sm">Approve</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Status for Approved/Rejected */}
      {activeTab === 'approved' && (
        <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <Text className="text-xs text-gray-500">Approved {creator.approvedAt}</Text>
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-600 font-medium text-xs">Approved</Text>
          </View>
        </View>
      )}

      {activeTab === 'rejected' && (
        <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <Text className="text-xs text-gray-500">Rejected {creator.rejectedAt}</Text>
          <View className="bg-red-100 px-3 py-1 rounded-full">
            <Text className="text-red-600 font-medium text-xs">Rejected</Text>
          </View>
        </View>
      )}
    </Card>
  );

  const tabs = [
    { id: 'pending', label: 'Pending', count: creators.pending.length },
    { id: 'approved', label: 'Approved', count: creators.approved.length },
    { id: 'rejected', label: 'Rejected', count: creators.rejected.length }
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900 ml-4">
          Approve Creators
        </Text>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-white border-b border-gray-200">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 px-4 ${
              activeTab === tab.id ? 'border-b-2 border-primary' : ''
            }`}
          >
            <Text
              className={`text-center font-medium ${
                activeTab === tab.id ? 'text-primary' : 'text-gray-600'
              }`}
            >
              {tab.label} ({tab.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-6 py-4">
        {creators[activeTab].length > 0 ? (
          creators[activeTab].map((creator) => renderCreatorCard(creator))
        ) : (
          <View className="flex-1 justify-center items-center py-12">
            <Ionicons name="people-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 text-center mt-4">
              No {activeTab} creators
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 