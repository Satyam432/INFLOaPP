import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { InputField, Button } from '../../components';
import { useChatStore, useAuthStore } from '../../state';
import { mockMessages } from '../../services/mockData';
import { Colors } from '../../constants';

export default function ChatDetailScreen({ route }) {
  const { chatId, title } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  
  const { user } = useAuthStore();
  const { addMessage, markAsRead } = useChatStore();

  useEffect(() => {
    // Load messages for this chat
    const chatMessages = mockMessages[chatId] || [];
    setMessages(chatMessages);
    
    // Mark chat as read
    markAsRead(chatId);
  }, [chatId]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: 'msg_' + Date.now(),
      chatId,
      senderId: user.userId,
      text: message.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    addMessage(chatId, newMessage);
    setMessage('');
  };

  const renderMessage = ({ item }) => {
    const isOwnMessage = item.senderId === user.userId;
    
    return (
      <View className={`mb-4 ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        <View className={`max-w-xs px-4 py-2 rounded-lg ${
          isOwnMessage 
            ? 'bg-primary' 
            : 'bg-gray-100'
        }`}>
          <Text className={`${
            isOwnMessage ? 'text-white' : 'text-gray-900'
          }`}>
            {item.text}
          </Text>
        </View>
        <Text className="text-xs text-gray-500 mt-1">
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1">
          {/* Messages List */}
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            className="flex-1 px-4 py-4"
            showsVerticalScrollIndicator={false}
            inverted={false}
          />

          {/* Message Input */}
          <View className="border-t border-gray-200 px-4 py-3">
            <View className="flex-row items-end space-x-2">
              <View className="flex-1">
                <InputField
                  placeholder="Type a message..."
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  numberOfLines={3}
                  containerStyle={{ marginBottom: 0 }}
                />
              </View>
              <Button
                title="Send"
                onPress={handleSendMessage}
                disabled={!message.trim()}
                size="small"
                style={{ marginBottom: 16 }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 