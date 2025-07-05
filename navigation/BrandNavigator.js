import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Routes } from '../constants';
import { useAuth } from '../components/AuthProvider';

// Brand Screens
import BrandHomeScreen from '../screens/brand/BrandHomeScreen';
import BrandCampaignsScreen from '../screens/brand/BrandCampaignsScreen';
import BrandCreatorDiscoveryScreen from '../screens/brand/BrandCreatorDiscoveryScreen';
import BrandProfileScreen from '../screens/brand/BrandProfileScreen';
import BrandOnboardingScreen from '../screens/brand/BrandOnboardingScreen';
import BrandCreateCampaignScreen from '../screens/brand/BrandCreateCampaignScreen';
import BrandConnectInstagramScreen from '../screens/brand/BrandConnectInstagramScreen';
import BrandApproveCreatorsScreen from '../screens/brand/BrandApproveCreatorsScreen';
import BrandViewCreatorDetailsScreen from '../screens/brand/BrandViewCreatorDetailsScreen';
import BrandApproveContentScreen from '../screens/brand/BrandApproveContentScreen';
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
            case Routes.TABS.BRAND.CREATORS:
              iconName = focused ? 'people' : 'people-outline';
              break;
            case Routes.TABS.BRAND.PROFILE:
              iconName = focused ? 'business' : 'business-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B7A',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: '#E5E7EB',
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
        name={Routes.TABS.BRAND.CREATORS} 
        component={BrandCreatorDiscoveryScreen}
        options={{ title: 'Creators' }}
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
  const { onboardingCompleted } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: '#1F2937',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!onboardingCompleted ? (
        <Stack.Screen
          name={Routes.BRAND_ONBOARDING}
          component={BrandOnboardingScreen}
          options={{ 
            title: 'Complete Your Profile',
            headerLeft: null, // Prevent going back
          }}
        />
      ) : (
        <>
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
            name={Routes.BRAND_CONNECT_INSTAGRAM}
            component={BrandConnectInstagramScreen}
            options={{ 
              title: 'Connect Instagram',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name={Routes.BRAND_APPROVE_CREATORS}
            component={BrandApproveCreatorsScreen}
            options={{ 
              title: 'Approve Creators',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name={Routes.BRAND_VIEW_CREATOR_DETAILS}
            component={BrandViewCreatorDetailsScreen}
            options={{ 
              title: 'Creator Details',
              headerBackTitleVisible: false,
            }}
          />
          <Stack.Screen
            name={Routes.BRAND_APPROVE_CONTENT}
            component={BrandApproveContentScreen}
            options={{ 
              title: 'Approve Content',
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
        </>
      )}
    </Stack.Navigator>
  );
} 