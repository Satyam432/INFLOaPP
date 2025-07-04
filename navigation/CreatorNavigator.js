import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Routes } from '../constants';

// Creator Screens
import CreatorHomeScreen from '../screens/creator/CreatorHomeScreen';
import CreatorPortfolioScreen from '../screens/creator/CreatorPortfolioScreen';
import CreatorOffersScreen from '../screens/creator/CreatorOffersScreen';
import CreatorChatScreen from '../screens/creator/CreatorChatScreen';
import CreatorProfileScreen from '../screens/creator/CreatorProfileScreen';
import CreatorOnboardingScreen from '../screens/creator/CreatorOnboardingScreen';
import ChatDetailScreen from '../screens/common/ChatDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Creator Tab Navigator
function CreatorTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case Routes.TABS.CREATOR.HOME:
              iconName = focused ? 'home' : 'home-outline';
              break;
            case Routes.TABS.CREATOR.PORTFOLIO:
              iconName = focused ? 'briefcase' : 'briefcase-outline';
              break;
            case Routes.TABS.CREATOR.OFFERS:
              iconName = focused ? 'mail' : 'mail-outline';
              break;
            case Routes.TABS.CREATOR.CHAT:
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case Routes.TABS.CREATOR.PROFILE:
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.creator.primary,
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
        name={Routes.TABS.CREATOR.HOME} 
        component={CreatorHomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name={Routes.TABS.CREATOR.PORTFOLIO} 
        component={CreatorPortfolioScreen}
        options={{ title: 'Portfolio' }}
      />
      <Tab.Screen 
        name={Routes.TABS.CREATOR.OFFERS} 
        component={CreatorOffersScreen}
        options={{ title: 'Offers' }}
      />
      <Tab.Screen 
        name={Routes.TABS.CREATOR.CHAT} 
        component={CreatorChatScreen}
        options={{ title: 'Chat' }}
      />
      <Tab.Screen 
        name={Routes.TABS.CREATOR.PROFILE} 
        component={CreatorProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// Creator Stack Navigator (includes onboarding and other screens)
export default function CreatorNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.creator.background,
        },
        headerTintColor: Colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name={Routes.CREATOR_ONBOARDING}
        component={CreatorOnboardingScreen}
        options={{ 
          title: 'Complete Your Profile',
          headerLeft: null, // Prevent going back
        }}
      />
      <Stack.Screen
        name={Routes.CREATOR_TAB}
        component={CreatorTabNavigator}
        options={{ headerShown: false }}
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