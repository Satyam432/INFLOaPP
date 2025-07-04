import { mockUsers } from './mockData';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Login with email/phone
  login: async (identifier) => {
    await delay(1000);
    
    // Mock success response
    return {
      success: true,
      message: 'OTP sent successfully',
      data: {
        identifier,
        otpSent: true
      }
    };
  },

  // Verify OTP
  verifyOTP: async (identifier, otp) => {
    await delay(1500);
    
    // Mock verification logic
    if (otp === '123456') {
      // Check if user exists
      const existingUser = Object.values(mockUsers).find(
        user => user.email === identifier
      );
      
      if (existingUser) {
        return {
          success: true,
          message: 'Login successful',
          data: {
            token: 'mock_jwt_token_' + Date.now(),
            user: existingUser,
            isNewUser: false
          }
        };
      } else {
        // New user - needs to select role
        return {
          success: true,
          message: 'OTP verified',
          data: {
            token: 'mock_jwt_token_' + Date.now(),
            user: {
              email: identifier,
              isNewUser: true
            },
            requiresRoleSelection: true
          }
        };
      }
    } else {
      return {
        success: false,
        message: 'Invalid OTP',
        error: 'INVALID_OTP'
      };
    }
  },

  // Complete signup with role selection
  completeSignup: async (userData) => {
    await delay(1000);
    
    const newUser = {
      userId: 'usr_' + userData.role + '_' + Date.now(),
      ...userData,
      createdAt: new Date().toISOString()
    };
    
    return {
      success: true,
      message: 'Account created successfully',
      data: {
        user: newUser,
        token: 'mock_jwt_token_' + Date.now()
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
    
    return {
      success: true,
      message: 'Logged out successfully'
    };
  }
}; 