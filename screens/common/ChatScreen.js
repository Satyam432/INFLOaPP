import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../state';
import { Colors } from '../../constants';

// Sample conversation data
const SAMPLE_MESSAGES = [
  {
    id: 'msg_1',
    senderId: 'brand_user_1',
    senderName: 'Sarah (Fashion Brand)',
    senderAvatar: 'https://picsum.photos/100/100?random=1',
    text: "Hi! I love your recent content about sustainable fashion. Would you be interested in collaborating with our eco-friendly brand?",
    timestamp: '2024-01-15T09:00:00Z',
    status: 'read'
  },
  {
    id: 'msg_2',
    senderId: 'creator_user_1',
    senderName: 'Alex (Creator)',
    senderAvatar: 'https://picsum.photos/100/100?random=2',
    text: "Thank you for reaching out! I'd definitely be interested in learning more about your brand and the collaboration opportunity.",
    timestamp: '2024-01-15T09:15:00Z',
    status: 'read'
  },
  {
    id: 'msg_3',
    senderId: 'brand_user_1',
    senderName: 'Sarah (Fashion Brand)',
    senderAvatar: 'https://picsum.photos/100/100?random=1',
    text: "Great! We're launching a new sustainable collection in March. We're looking for creators who align with our values of environmental consciousness.",
    timestamp: '2024-01-15T09:20:00Z',
    status: 'read'
  },
  {
    id: 'msg_4',
    senderId: 'brand_user_1',
    senderName: 'Sarah (Fashion Brand)',
    senderAvatar: 'https://picsum.photos/100/100?random=1',
    text: "The campaign would include 2 Instagram posts, 3 stories, and 1 reel. We're offering $2,500 for the collaboration. What do you think?",
    timestamp: '2024-01-15T09:22:00Z',
    status: 'read'
  },
  {
    id: 'msg_5',
    senderId: 'creator_user_1',
    senderName: 'Alex (Creator)',
    senderAvatar: 'https://picsum.photos/100/100?random=2',
    text: "That sounds amazing! I really appreciate brands that prioritize sustainability. The deliverables and compensation look fair.",
    timestamp: '2024-01-15T09:45:00Z',
    status: 'read'
  },
  {
    id: 'msg_6',
    senderId: 'creator_user_1',
    senderName: 'Alex (Creator)',
    senderAvatar: 'https://picsum.photos/100/100?random=2',
    text: "Could you share more details about the timeline and any specific guidelines for the content?",
    timestamp: '2024-01-15T09:46:00Z',
    status: 'read'
  },
  {
    id: 'msg_7',
    senderId: 'brand_user_1',
    senderName: 'Sarah (Fashion Brand)',
    senderAvatar: 'https://picsum.photos/100/100?random=1',
    text: "Absolutely! The campaign runs from March 1-15. We'll send you the collection pieces by Feb 25th. I'll email you our brand guidelines and hashtag requirements.",
    timestamp: '2024-01-15T10:30:00Z',
    status: 'read'
  },
  {
    id: 'msg_8',
    senderId: 'brand_user_1',
    senderName: 'Sarah (Fashion Brand)',
    senderAvatar: 'https://picsum.photos/100/100?random=1',
    text: "The key message is 'Fashion that doesn't cost the Earth' - we want authentic content that shows how sustainable fashion can be stylish and accessible.",
    timestamp: '2024-01-15T10:32:00Z',
    status: 'read'
  },
  {
    id: 'msg_9',
    senderId: 'creator_user_1',
    senderName: 'Alex (Creator)',
    senderAvatar: 'https://picsum.photos/100/100?random=2',
    text: "Perfect! I love that message and it aligns perfectly with my content. I'm excited to work together. When should we finalize the contract?",
    timestamp: '2024-01-15T11:00:00Z',
    status: 'delivered'
  },
  {
    id: 'msg_10',
    senderId: 'brand_user_1',
    senderName: 'Sarah (Fashion Brand)',
    senderAvatar: 'https://picsum.photos/100/100?random=1',
    text: "Excellent! I'll send over the contract today. Looking forward to this collaboration! 🌱✨",
    timestamp: '2024-01-15T11:15:00Z',
    status: 'sent'
  }
];

const { width: screenWidth } = Dimensions.get('window');

export default function ChatScreen({ route, navigation }) {
  const { chatId, title = 'Chat', partnerName = 'Fashion Brand' } = route.params || {};
  const { user } = useAuthStore();
  
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);
  const typingAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate typing indicator animation
    if (isTyping) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(typingAnimation, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnimation, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      typingAnimation.setValue(0);
    }
  }, [isTyping]);

  const scrollToBottom = () => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: 'msg_' + Date.now(),
      senderId: user?.userId || 'current_user',
      senderName: user?.name || 'You',
      senderAvatar: user?.profileImage || 'https://picsum.photos/100/100?random=99',
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate partner typing and response
    simulatePartnerResponse();
  };

  const simulatePartnerResponse = () => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const responses = [
        "Thanks for your message! Let me get back to you on that.",
        "That sounds great! I'll review the details and respond soon.",
        "Perfect! I'll discuss this with the team and update you.",
        "Understood! I'll send over the information you requested.",
        "Excellent point! Let's schedule a call to discuss further."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const partnerMessage = {
        id: 'msg_' + Date.now(),
        senderId: 'brand_user_1',
        senderName: partnerName,
        senderAvatar: 'https://picsum.photos/100/100?random=1',
        text: randomResponse,
        timestamp: new Date().toISOString(),
        status: 'read'
      };
      
      setMessages(prev => [...prev, partnerMessage]);
    }, 2000);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return 'checkmark';
      case 'delivered':
        return 'checkmark-done';
      case 'read':
        return 'checkmark-done';
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent':
        return Colors.gray400;
      case 'delivered':
        return Colors.gray600;
      case 'read':
        return Colors.primary;
      default:
        return Colors.gray400;
    }
  };

  const renderMessage = ({ item, index }) => {
    const isOwnMessage = item.senderId === (user?.userId || 'current_user');
    const isLastMessage = index === messages.length - 1;
    const nextMessage = messages[index + 1];
    const isLastInGroup = !nextMessage || nextMessage.senderId !== item.senderId;
    
    return (
      <View className={`mb-2 px-4 ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        <View className={`flex-row max-w-[85%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Avatar */}
          {!isOwnMessage && isLastInGroup && (
            <View className="w-8 h-8 rounded-full overflow-hidden mr-2 mt-1">
              <Image 
                source={{ uri: item.senderAvatar }} 
                className="w-full h-full"
                defaultSource={{ uri: 'https://picsum.photos/100/100?random=1' }}
              />
            </View>
          )}
          {!isOwnMessage && !isLastInGroup && (
            <View className="w-8 mr-2" />
          )}
          
          {/* Message Bubble */}
          <View className={`px-4 py-3 rounded-2xl ${
            isOwnMessage 
              ? 'bg-primary rounded-br-md' 
              : 'bg-gray-100 rounded-bl-md'
          } ${!isLastInGroup ? 'mb-1' : 'mb-2'}`}>
            <Text className={`text-base leading-5 ${
              isOwnMessage ? 'text-white' : 'text-gray-900'
            }`}>
              {item.text}
            </Text>
          </View>
        </View>
        
        {/* Timestamp and Status */}
        {isLastInGroup && (
          <View className={`flex-row items-center mt-1 ${
            isOwnMessage ? 'flex-row-reverse' : 'flex-row'
          }`}>
            <Text className="text-xs text-gray-500">
              {formatTime(item.timestamp)}
            </Text>
            {isOwnMessage && item.status && (
              <View className="ml-1">
                <Ionicons 
                  name={getStatusIcon(item.status)} 
                  size={12} 
                  color={getStatusColor(item.status)} 
                />
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;

    return (
      <View className="mb-2 px-4 items-start">
        <View className="flex-row">
          <View className="w-8 h-8 rounded-full overflow-hidden mr-2 mt-1">
            <Image 
              source={{ uri: 'https://picsum.photos/100/100?random=1' }} 
              className="w-full h-full"
            />
          </View>
          <View className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
            <View className="flex-row items-center">
              <Animated.View 
                style={{
                  opacity: typingAnimation
                }}
                className="w-2 h-2 bg-gray-400 rounded-full mr-1"
              />
              <Animated.View 
                style={{
                  opacity: typingAnimation
                }}
                className="w-2 h-2 bg-gray-400 rounded-full mr-1"
              />
              <Animated.View 
                style={{
                  opacity: typingAnimation
                }}
                className="w-2 h-2 bg-gray-400 rounded-full"
              />
            </View>
          </View>
        </View>
        <Text className="text-xs text-gray-500 mt-1 ml-10">
          {partnerName} is typing...
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-4 py-3">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="mr-3 p-1"
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          
          <View className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <Image 
              source={{ uri: 'https://picsum.photos/100/100?random=1' }} 
              className="w-full h-full"
            />
          </View>
          
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900">{partnerName}</Text>
            <Text className="text-sm text-green-600">Online</Text>
          </View>
          
          <TouchableOpacity className="p-2">
            <Ionicons name="call" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 ml-2">
            <Ionicons name="videocam" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          className="flex-1 bg-gray-50"
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
          ListFooterComponent={renderTypingIndicator}
        />

        {/* Input Bar */}
        <View className="bg-white border-t border-gray-200 px-4 py-3">
          <View className="flex-row items-end space-x-3">
            <TouchableOpacity className="p-2">
              <Ionicons name="add" size={24} color={Colors.gray500} />
            </TouchableOpacity>
            
            <View className="flex-1 max-h-24 bg-gray-100 rounded-2xl px-4 py-2">
              <TextInput
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Type a message..."
                placeholderTextColor={Colors.gray400}
                multiline
                className="text-base text-gray-900 min-h-[20px]"
                style={{ 
                  maxHeight: 80,
                  textAlignVertical: 'top'
                }}
              />
            </View>
            
            <TouchableOpacity 
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`p-3 rounded-full ${
                newMessage.trim() ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <Ionicons 
                name="send" 
                size={18} 
                color={newMessage.trim() ? 'white' : Colors.gray500} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 