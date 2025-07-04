import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Routes } from '../constants';

// Brand Screens
import BrandHomeScreen from '../screens/brand/BrandHomeScreen';
import BrandCampaignsScreen from '../screens/brand/BrandCampaignsScreen';
import BrandCreatorDiscoveryScreen from '../screens/brand/BrandCreatorDiscoveryScreen';
import BrandChatScreen from '../screens/brand/BrandChatScreen';
import BrandProfileScreen from '../screens/brand/BrandProfileScreen';
import BrandOnboardingScreen from '../screens/brand/BrandOnboardingScreen';
import BrandCreateCampaignScreen from '../screens/brand/BrandCreateCampaignScreen';
import ChatDetailScreen from '../screens/common/ChatDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Brand Tab Navigator
function BrandTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case Routes.TABS.BRAND.HOME:
              iconName = focused ? 'home' : 'home-outline';
              break;
            case Routes.TABS.BRAND.CAMPAIGNS:
              iconName = focused ? 'megaphone' : 'megaphone-outline';
              break;
            case Routes.TABS.BRAND.DISCOVER:
              iconName = focused ? 'search' : 'search-outline';
              break;
            case Routes.TABS.BRAND.CHAT:
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case Routes.TABS.BRAND.PROFILE:
              iconName = focused ? 'business' : 'business-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.brand.primary,
        tabBarInactiveTintColor: Colors.gray400,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name={Routes.TABS.BRAND.HOME} 
        component={BrandHomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name={Routes.TABS.BRAND.CAMPAIGNS} 
        component={BrandCampaignsScreen}
        options={{ title: 'Campaigns' }}
      />
      <Tab.Screen 
        name={Routes.TABS.BRAND.DISCOVER} 
        component={BrandCreatorDiscoveryScreen}
        options={{ title: 'Discover' }}
      />
      <Tab.Screen 
        name={Routes.TABS.BRAND.CHAT} 
        component={BrandChatScreen}
        options={{ title: 'Chat' }}
      />
      <Tab.Screen 
        name={Routes.TABS.BRAND.PROFILE} 
        component={BrandProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// Brand Stack Navigator (includes onboarding and other screens)
export default function BrandNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.brand.background,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name={Routes.BRAND_ONBOARDING}
        component={BrandOnboardingScreen}
        options={{ 
          title: 'Complete Your Profile',
          headerLeft: null, // Prevent going back
        }}
      />
      <Stack.Screen
        name={Routes.BRAND_TAB}
        component={BrandTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.BRAND_CREATE_CAMPAIGN}
        component={BrandCreateCampaignScreen}
        options={{ 
          title: 'Create Campaign',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name={Routes.CHAT_DETAIL}
        component={ChatDetailScreen}
        options={({ route }) => ({ 
          title: route.params?.title || 'Chat',
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
} 