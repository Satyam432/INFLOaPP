import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const useAuthStore = create((set, get) => ({
  // State
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
  isLoading: false,
  
  // Actions
  setLoading: (loading) => set({ isLoading: loading }),
  
  login: async (userData, token) => {
    try {
      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
      
      set({
        isAuthenticated: true,
        user: userData,
        token: token,
        role: userData.role,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error storing auth data:', error);
      set({ isLoading: false });
    }
  },
  
  logout: async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
      
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  },
  
  updateUser: (userData) => {
    set((state) => ({
      user: { ...state.user, ...userData }
    }));
  },
  
  loadStoredAuth: async () => {
    try {
      set({ isLoading: true });
      
      const token = await SecureStore.getItemAsync('token');
      const userString = await SecureStore.getItemAsync('user');
      
      if (token && userString) {
        const user = JSON.parse(userString);
        set({
          isAuthenticated: true,
          user: user,
          token: token,
          role: user.role,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore; 