import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';

import { ShoppingListProvider } from './context/ShoppingListContext';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import SettingsScreen from './screens/SettingsScreen';
import { colors } from './styles/styles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ShoppingListProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: '700' },
            tabBarActiveTintColor: colors.primary,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Indkøbsliste' }}
          />
          <Tab.Screen
            name="AddItem"
            component={AddItemScreen}
            options={{ title: 'Tilføj vare' }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: 'Indstillinger' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ShoppingListProvider>
  );
}