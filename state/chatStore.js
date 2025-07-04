import { create } from 'zustand';

const useChatStore = create((set, get) => ({
  // State
  chats: {},
  activeChats: [],
  messages: {},
  currentChat: null,
  isLoading: false,
  error: null,
  
  // Actions
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  
  setChats: (chats) => {
    const activeChats = Object.values(chats).filter(chat => chat.isActive);
    set({ chats, activeChats });
  },
  
  addChat: (chat) => {
    set((state) => {
      const newChats = { ...state.chats, [chat.id]: chat };
      const activeChats = Object.values(newChats).filter(c => c.isActive);
      
      return {
        chats: newChats,
        activeChats,
      };
    });
  },
  
  updateChat: (chatId, updates) => {
    set((state) => {
      const updatedChats = {
        ...state.chats,
        [chatId]: { ...state.chats[chatId], ...updates }
      };
      
      const activeChats = Object.values(updatedChats).filter(c => c.isActive);
      
      return {
        chats: updatedChats,
        activeChats,
        currentChat: state.currentChat?.id === chatId
          ? { ...state.currentChat, ...updates }
          : state.currentChat,
      };
    });
  },
  
  setMessages: (chatId, messages) => {
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: messages
      }
    }));
  },
  
  addMessage: (chatId, message) => {
    set((state) => {
      const currentMessages = state.messages[chatId] || [];
      const newMessages = [...currentMessages, message];
      
      // Update chat with last message info
      const updatedChat = {
        ...state.chats[chatId],
        lastMessage: message.text,
        lastMessageTime: message.timestamp,
        unreadCount: state.chats[chatId]?.unreadCount || 0
      };
      
      return {
        messages: {
          ...state.messages,
          [chatId]: newMessages
        },
        chats: {
          ...state.chats,
          [chatId]: updatedChat
        }
      };
    });
  },
  
  markAsRead: (chatId) => {
    set((state) => ({
      chats: {
        ...state.chats,
        [chatId]: {
          ...state.chats[chatId],
          unreadCount: 0
        }
      }
    }));
  },
  
  setCurrentChat: (chat) => set({ currentChat: chat }),
  
  clearChats: () => set({
    chats: {},
    activeChats: [],
    messages: {},
    currentChat: null,
  }),
  
  getChatById: (id) => {
    const { chats } = get();
    return chats[id];
  },
  
  getMessagesByChatId: (chatId) => {
    const { messages } = get();
    return messages[chatId] || [];
  },
}));

export default useChatStore; 