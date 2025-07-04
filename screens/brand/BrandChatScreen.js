import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Card } from '../../components';

export default function BrandChatScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-6 py-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Messages</Text>
        <Card>
          <View className="items-center py-8">
            <Text className="text-gray-500">No conversations yet</Text>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
} 