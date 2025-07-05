import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const useAuthStore = create((set, get) => ({
  // State
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
  userId: null,
  isLoading: false,
  
  // Actions
  setLoading: (loading) => set({ isLoading: loading }),
  
  setRole: async (role) => {
    try {
      await SecureStore.setItemAsync('role', role);
      set({ role });
      console.log('✅ Role saved:', role);
    } catch (error) {
      console.error('❌ Error saving role:', error);
    }
  },
  
  login: async (userData, token) => {
    try {
      const userId = userData.id || userData.userId || Date.now().toString();
      
      await SecureStore.setItemAsync('token', token);
      await SecureStore.setItemAsync('userId', userId);
      await SecureStore.setItemAsync('user', JSON.stringify(userData));
      
      set({
        isAuthenticated: true,
        user: userData,
        token: token,
        role: userData.role,
        userId: userId,
        isLoading: false,
      });
      
      console.log('✅ Login successful:', { userId, role: userData.role });
    } catch (error) {
      console.error('❌ Error storing auth data:', error);
      set({ isLoading: false });
    }
  },
  
  logout: async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('userId');
      await SecureStore.deleteItemAsync('user');
      await SecureStore.deleteItemAsync('role');
      
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
        userId: null,
        isLoading: false,
      });
      
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Error clearing auth data:', error);
    }
  },
  
  updateUser: async (userData) => {
    try {
      const newUserData = { ...get().user, ...userData };
      
      // Update SecureStore with the new user data
      await SecureStore.setItemAsync('user', JSON.stringify(newUserData));
      
      set((state) => ({
        user: newUserData
      }));
      
      console.log('✅ User data updated and persisted');
    } catch (error) {
      console.error('❌ Error updating user data:', error);
      throw error;
    }
  },
  
  loadStoredAuth: async () => {
    try {
      set({ isLoading: true });
      
      const token = await SecureStore.getItemAsync('token');
      const userId = await SecureStore.getItemAsync('userId');
      const userString = await SecureStore.getItemAsync('user');
      const role = await SecureStore.getItemAsync('role');
      
      if (token && userId && userString) {
        const user = JSON.parse(userString);
        set({
          isAuthenticated: true,
          user: user,
          token: token,
          role: role || user.role,
          userId: userId,
          isLoading: false,
        });
        
        console.log('✅ Auth loaded:', { userId, role: role || user.role });
      } else {
        // If we have a role but no auth, keep the role
        if (role) {
          set({ role, isLoading: false });
        } else {
          set({ isLoading: false });
        }
      }
    } catch (error) {
      console.error('❌ Error loading stored auth:', error);
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore; 