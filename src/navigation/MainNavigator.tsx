import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Map, Tent, CalendarDays, User } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';
import { HomeScreen } from '../screens/home/HomeScreen';
import { TrailsScreen } from '../screens/trails/TrailsScreen';
import { TrailDetailsScreen } from '../screens/trails/TrailDetailsScreen';
import { GlampingScreen } from '../screens/glamping/GlampingScreen';
import { GlampingDetailsScreen } from '../screens/glamping/GlampingDetailsScreen';
import { ExcursionsScreen } from '../screens/excursions/ExcursionsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import type {
  ExcursionsStackParamList,
  GlampingStackParamList,
  HomeStackParamList,
  MainTabParamList,
  ProfileStackParamList,
  TrailsStackParamList,
} from './types';

const Tabs = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const TrailsStack = createNativeStackNavigator<TrailsStackParamList>();
const GlampingStack = createNativeStackNavigator<GlampingStackParamList>();
const ExcursionsStack = createNativeStackNavigator<ExcursionsStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

function useStackScreenOptions() {
  const theme = useTheme();
  return {
    headerStyle: { backgroundColor: theme.colors.surface },
    headerTitleStyle: { color: theme.colors.text },
    headerTintColor: theme.colors.primary,
    contentStyle: { backgroundColor: theme.colors.background },
  } as const;
}

function HomeStackNavigator() {
  const screenOptions = useStackScreenOptions();
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'TrailNest' }}
      />
      <HomeStack.Screen
        name="TrailDetails"
        component={TrailDetailsScreen}
        options={{ title: 'Detalii traseu' }}
      />
      <HomeStack.Screen
        name="GlampingDetails"
        component={GlampingDetailsScreen}
        options={{ title: 'Detalii cazare' }}
      />
    </HomeStack.Navigator>
  );
}

function TrailsStackNavigator() {
  const screenOptions = useStackScreenOptions();
  return (
    <TrailsStack.Navigator screenOptions={screenOptions}>
      <TrailsStack.Screen
        name="Trails"
        component={TrailsScreen}
        options={{ title: 'Trasee' }}
      />
      <TrailsStack.Screen
        name="TrailDetails"
        component={TrailDetailsScreen}
        options={{ title: 'Detalii traseu' }}
      />
    </TrailsStack.Navigator>
  );
}

function GlampingStackNavigator() {
  const screenOptions = useStackScreenOptions();
  return (
    <GlampingStack.Navigator screenOptions={screenOptions}>
      <GlampingStack.Screen
        name="Glamping"
        component={GlampingScreen}
        options={{ title: 'Glamping' }}
      />
      <GlampingStack.Screen
        name="GlampingDetails"
        component={GlampingDetailsScreen}
        options={{ title: 'Detalii cazare' }}
      />
    </GlampingStack.Navigator>
  );
}

function ExcursionsStackNavigator() {
  const screenOptions = useStackScreenOptions();
  return (
    <ExcursionsStack.Navigator screenOptions={screenOptions}>
      <ExcursionsStack.Screen
        name="Excursions"
        component={ExcursionsScreen}
        options={{ title: 'Excursii' }}
      />
      <ExcursionsStack.Screen
        name="TrailDetails"
        component={TrailDetailsScreen}
        options={{ title: 'Detalii traseu' }}
      />
      <ExcursionsStack.Screen
        name="GlampingDetails"
        component={GlampingDetailsScreen}
        options={{ title: 'Detalii cazare' }}
      />
    </ExcursionsStack.Navigator>
  );
}

function ProfileStackNavigator() {
  const screenOptions = useStackScreenOptions();
  return (
    <ProfileStack.Navigator screenOptions={screenOptions}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
    </ProfileStack.Navigator>
  );
}

export function MainNavigator() {
  const theme = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.tabBarActive,
        tabBarInactiveTintColor: theme.colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: theme.colors.tabBarBackground,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: 'Acasă',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="TrailsTab"
        component={TrailsStackNavigator}
        options={{
          title: 'Trasee',
          tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="GlampingTab"
        component={GlampingStackNavigator}
        options={{
          title: 'Glamping',
          tabBarIcon: ({ color, size }) => <Tent color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="ExcursionsTab"
        component={ExcursionsStackNavigator}
        options={{
          title: 'Excursii',
          tabBarIcon: ({ color, size }) => <CalendarDays color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs.Navigator>
  );
}
