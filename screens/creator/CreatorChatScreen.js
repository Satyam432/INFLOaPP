import React from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Card } from '../../components';
import { mockChats } from '../../services/mockData';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants';

export default function CreatorChatScreen({ navigation }) {
  const chats = Object.values(mockChats);
  
  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatDetail', { 
        chatId: item.id, 
        title: 'Brand Chat' 
      })}
    >
      <Card style={{ marginBottom: 12 }}>
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-gray-200 rounded-full justify-center items-center mr-3">
            <Ionicons name="business" size={20} color={Colors.gray600} />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-gray-900">Brand Collaboration</Text>
            <Text className="text-gray-600 text-sm" numberOfLines={1}>
              {item.lastMessage}
            </Text>
            <Text className="text-gray-400 text-xs mt-1">
              {new Date(item.lastMessageTime).toLocaleDateString()}
            </Text>
          </View>
          {item.unreadCount > 0 && (
            <View className="w-6 h-6 bg-red-500 rounded-full justify-center items-center">
              <Text className="text-white text-xs font-bold">{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-6 py-4">
        <Text className="text-2xl font-bold text-gray-900 mb-6">Messages</Text>
        
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
} 