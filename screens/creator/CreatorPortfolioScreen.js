import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Card, Button } from '../../components';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';

export default function CreatorPortfolioScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-900">Portfolio</Text>
          <Button title="Add Project" size="small" />
        </View>
        
        <Card>
          <View className="items-center py-8">
            <Ionicons name="briefcase-outline" size={48} color={Colors.gray400} />
            <Text className="text-lg font-medium text-gray-900 mt-4">Build Your Portfolio</Text>
            <Text className="text-gray-600 text-center mt-2">
              Add your best work to showcase your creativity and attract brand partnerships
            </Text>
            <Button 
              title="Add First Project" 
              onPress={() => {}} 
              style={{ marginTop: 16 }}
            />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
} 