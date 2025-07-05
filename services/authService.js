import { mockUsers } from './mockData';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Login with email/phone - accepts ANY identifier
  login: async (identifier) => {
    await delay(1000);
    
    console.log('🔐 Demo Login:', identifier);
    
    // Accept any email/phone for demo
    return {
      success: true,
      message: 'OTP sent successfully',
      data: {
        identifier,
        otpSent: true
      }
    };
  },

  // Verify OTP - hardcoded as 123456
  verifyOTP: async (identifier, otp) => {
    await delay(1500);
    
    console.log('🔑 Demo OTP Verification:', { identifier, otp });
    
    // Only accept hardcoded OTP: 123456
    if (otp === '123456') {
      // Check if it's a known demo user
      const existingUser = Object.values(mockUsers).find(
        user => user.email === identifier
      );
      
      if (existingUser) {
        console.log('✅ Existing user found:', existingUser.name);
        return {
          success: true,
          message: 'Login successful',
          data: {
            token: 'demo_token_' + Date.now(),
            user: existingUser,
            isNewUser: false
          }
        };
      } else {
        console.log('🆕 New user - requires role selection');
        // New user - needs to select role
        return {
          success: true,
          message: 'OTP verified - new user',
          data: {
            token: 'demo_token_' + Date.now(),
            user: {
              email: identifier,
              isNewUser: true
            },
            requiresRoleSelection: true
          }
        };
      }
    } else {
      console.log('❌ Invalid OTP provided:', otp);
      return {
        success: false,
        message: 'Invalid OTP. Please use 123456 for demo.',
        error: 'INVALID_OTP'
      };
    }
  },

  // Complete signup with role selection
  completeSignup: async (userData) => {
    await delay(1000);
    
    const newUser = {
      userId: 'demo_' + userData.role + '_' + Date.now(),
      name: userData.name || `Demo ${userData.role}`,
      email: userData.email,
      role: userData.role,
      isNewUser: true,
      createdAt: new Date().toISOString()
    };
    
    console.log('👤 Demo user created:', newUser);
    
    return {
      success: true,
      message: 'Account created successfully',
      data: {
        user: newUser,
        token: 'demo_token_' + Date.now()
      }
    };
  },

  // Get user profile
  getProfile: async (userId) => {
    await delay(500);
    
    const user = Object.values(mockUsers).find(u => u.userId === userId);
    
    if (user) {
      return {
        success: true,
        data: user
      };
    } else {
      return {
        success: false,
        message: 'User not found',
        error: 'USER_NOT_FOUND'
      };
    }
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    await delay(800);
    
    console.log('📝 Profile updated for:', userId, updates);
    
    return {
      success: true,
      message: 'Profile updated successfully',
      data: {
        userId,
        ...updates,
        updatedAt: new Date().toISOString()
      }
    };
  },

  // Logout
  logout: async () => {
    await delay(300);
    
    console.log('👋 User logged out');
    
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }
}; 