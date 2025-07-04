import React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { Card, InputField } from '../../components';
import { mockCreatorsForDiscovery } from '../../services/mockData';

export default function BrandCreatorDiscoveryScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6 py-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Discover Creators</Text>
        
        <InputField
          placeholder="Search creators..."
          leftIcon="search"
          containerStyle={{ marginBottom: 20 }}
        />
        
        {mockCreatorsForDiscovery.map((creator) => (
          <Card key={creator.userId} style={{ marginBottom: 16 }}>
            <View className="flex-row">
              <View className="w-16 h-16 bg-gray-200 rounded-full justify-center items-center mr-4">
                <Text className="text-gray-600 text-xl">{creator.name.charAt(0)}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-bold text-gray-900">{creator.name}</Text>
                <Text className="text-gray-600 text-sm">{creator.bio}</Text>
                <View className="flex-row justify-between items-center mt-2">
                  <Text className="text-sm text-gray-500">{creator.followers.toLocaleString()} followers</Text>
                  <View className="bg-blue-100 px-2 py-1 rounded">
                    <Text className="text-blue-800 text-xs font-medium">{creator.niche}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
} 