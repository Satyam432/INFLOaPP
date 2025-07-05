import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components';

export default function BrandApproveContentScreen({ navigation, route }) {
  const { campaignId, creatorId } = route.params || {};
  const [activeTab, setActiveTab] = useState('pending');

  // Mock content data
  const contentData = {
    pending: [
      {
        id: 1,
        creatorName: 'Sarah Johnson',
        creatorHandle: '@sarahjohnson',
        campaignTitle: 'Summer Collection Launch',
        contentType: 'Instagram Post',
        submittedAt: '2 hours ago',
        description: 'Showcasing the new summer dress collection with styling tips',
        mediaUrl: null,
        hashtags: ['#SummerVibes', '#BrandName', '#Fashion']
      },
      {
        id: 2,
        creatorName: 'Mike Chen',
        creatorHandle: '@mikecreates',
        campaignTitle: 'Tech Product Review',
        contentType: 'Instagram Reel',
        submittedAt: '5 hours ago',
        description: 'Unboxing and first impressions of the new tech gadget',
        mediaUrl: null,
        hashtags: ['#TechReview', '#BrandName', '#Innovation']
      }
    ],
    approved: [
      {
        id: 3,
        creatorName: 'Alex Rodriguez',
        creatorHandle: '@alexrodriguez',
        campaignTitle: 'Fitness Challenge',
        contentType: 'Instagram Story',
        approvedAt: '1 day ago',
        description: 'Workout routine featuring brand activewear',
        mediaUrl: null,
        hashtags: ['#FitnessMotivation', '#BrandName', '#WorkoutGear']
      }
    ],
    rejected: [
      {
        id: 4,
        creatorName: 'Lisa Park',
        creatorHandle: '@lisapark',
        campaignTitle: 'Beauty Campaign',
        contentType: 'Instagram Post',
        rejectedAt: '3 days ago',
        rejectionReason: 'Does not follow brand guidelines',
        description: 'Makeup tutorial using brand products',
        mediaUrl: null,
        hashtags: ['#MakeupTutorial', '#BrandName', '#Beauty']
      }
    ]
  };

  const handleApprove = (content) => {
    Alert.alert(
      'Approve Content',
      `Are you sure you want to approve this content from ${content.creatorName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: () => {
            console.log('✅ Approved content:', content.id);
            Alert.alert('Success', 'Content has been approved!');
          }
        }
      ]
    );
  };

  const handleReject = (content) => {
    Alert.alert(
      'Reject Content',
      `Are you sure you want to reject this content from ${content.creatorName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: () => {
            console.log('❌ Rejected content:', content.id);
            Alert.alert('Success', 'Content has been rejected.');
          }
        }
      ]
    );
  };

  const handleViewFullContent = (content) => {
    Alert.alert(
      'View Content',
      `This would open the full content preview for ${content.creatorName}'s ${content.contentType}`,
      [{ text: 'OK' }]
    );
  };

  const renderContentCard = (content) => (
    <Card key={content.id} style={{ marginBottom: 16 }}>
      <View>
        {/* Creator Info */}
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 bg-gray-300 rounded-full justify-center items-center mr-3">
            <Text className="text-gray-600 font-bold text-sm">
              {content.creatorName.charAt(0)}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="font-semibold text-gray-900">{content.creatorName}</Text>
            <Text className="text-sm text-gray-600">{content.creatorHandle}</Text>
          </View>
          <View className="bg-blue-100 px-2 py-1 rounded-full">
            <Text className="text-xs font-medium text-blue-600">{content.contentType}</Text>
          </View>
        </View>

        {/* Campaign Title */}
        <Text className="text-lg font-semibold text-gray-900 mb-2">{content.campaignTitle}</Text>

        {/* Content Preview */}
        <View className="bg-gray-100 rounded-lg p-4 mb-3">
          <View className="flex-row items-center mb-2">
            <View className="w-20 h-20 bg-gray-200 rounded-lg justify-center items-center mr-3">
              <Ionicons name="image-outline" size={24} color="#9CA3AF" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-700 mb-2">{content.description}</Text>
              <TouchableOpacity onPress={() => handleViewFullContent(content)}>
                <Text className="text-sm text-blue-600 font-medium">View Full Content</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Hashtags */}
        <View className="flex-row flex-wrap mb-3">
          {content.hashtags.map((tag, index) => (
            <View key={index} className="bg-gray-100 px-2 py-1 rounded-full mr-2 mb-1">
              <Text className="text-xs text-gray-700">{tag}</Text>
            </View>
          ))}
        </View>

        {/* Actions for Pending */}
        {activeTab === 'pending' && (
          <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
            <Text className="text-xs text-gray-500">Submitted {content.submittedAt}</Text>
            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={() => handleReject(content)}
                className="bg-red-100 px-4 py-2 rounded-lg"
              >
                <Text className="text-red-600 font-medium text-sm">Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleApprove(content)}
                className="bg-green-100 px-4 py-2 rounded-lg"
              >
                <Text className="text-green-600 font-medium text-sm">Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Status for Approved */}
        {activeTab === 'approved' && (
          <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
            <Text className="text-xs text-gray-500">Approved {content.approvedAt}</Text>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-600 font-medium text-xs">✓ Approved</Text>
            </View>
          </View>
        )}

        {/* Status for Rejected */}
        {activeTab === 'rejected' && (
          <View className="pt-3 border-t border-gray-100">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-xs text-gray-500">Rejected {content.rejectedAt}</Text>
              <View className="bg-red-100 px-3 py-1 rounded-full">
                <Text className="text-red-600 font-medium text-xs">✗ Rejected</Text>
              </View>
            </View>
            <Text className="text-xs text-gray-600">Reason: {content.rejectionReason}</Text>
          </View>
        )}
      </View>
    </Card>
  );

  const tabs = [
    { id: 'pending', label: 'Pending Review', count: contentData.pending.length },
    { id: 'approved', label: 'Approved', count: contentData.approved.length },
    { id: 'rejected', label: 'Rejected', count: contentData.rejected.length }
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900 ml-4">
          Content Review
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
              className={`text-center font-medium text-sm ${
                activeTab === tab.id ? 'text-primary' : 'text-gray-600'
              }`}
            >
              {tab.label} ({tab.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 py-4">
        {contentData[activeTab].length > 0 ? (
          contentData[activeTab].map((content) => renderContentCard(content))
        ) : (
          <View className="flex-1 justify-center items-center py-12">
            <Ionicons name="document-text-outline" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 text-center mt-4">
              No {activeTab} content
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
} 