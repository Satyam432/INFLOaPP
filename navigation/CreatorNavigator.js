import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Routes } from '../constants';
import { useAuth } from '../components/AuthProvider';

// Creator Screens
import CreatorHomeScreen from '../screens/creator/CreatorHomeScreen';
import CreatorOffersScreen from '../screens/creator/CreatorOffersScreen';
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
            case Routes.TABS.CREATOR.CAMPAIGNS:
              iconName = focused ? 'megaphone' : 'megaphone-outline';
              break;
            case Routes.TABS.CREATOR.PROFILE:
              iconName = focused ? 'person' : 'person-outline';
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
        name={Routes.TABS.CREATOR.HOME} 
        component={CreatorHomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name={Routes.TABS.CREATOR.CAMPAIGNS} 
        component={CreatorOffersScreen}
        options={{ title: 'Campaigns' }}
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
          name={Routes.CREATOR_ONBOARDING}
          component={CreatorOnboardingScreen}
          options={{ 
            title: 'Complete Your Profile',
            headerLeft: null, // Prevent going back
          }}
        />
      ) : (
        <>
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
        </>
      )}
    </Stack.Navigator>
  );
} 