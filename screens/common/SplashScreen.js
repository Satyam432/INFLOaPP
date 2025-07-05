import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../../components/AuthProvider';

export default function SplashScreen({ navigation }) {
  const { isAuthenticated, role } = useAuth();

  useEffect(() => {
    // Show splash for 3 seconds then navigate appropriately
    const timer = setTimeout(() => {
      if (isAuthenticated && role) {
        // Navigate to appropriate navigator based on role
        if (role === 'creator') {
          navigation.replace('CreatorNavigator');
        } else if (role === 'brand') {
          navigation.replace('BrandNavigator');
        }
      } else {
        // Navigate to role selection screen
        navigation.replace('RoleSelection');
      }
    }, 3000); // 3 second splash

    return () => clearTimeout(timer);
  }, [isAuthenticated, role, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: '#FF6B7A' }} className="justify-center items-center">
      {/* Inflo Logo in white */}
      <Text 
        style={{ 
          fontSize: 48, 
          fontWeight: 'bold', 
          color: 'white',
          fontFamily: 'cursive' // This will use the system's cursive font
        }}
      >
        Inflo
      </Text>
    </View>
  );
} 