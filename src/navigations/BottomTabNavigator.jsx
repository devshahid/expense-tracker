import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackNavigator from './stack-navigators/HomeStackNavigator';
import BookStackNavigator from './stack-navigators/BookStackNavigator';
import ContactStackNavigator from './stack-navigators/ContactStackNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFontisto from 'react-native-vector-icons/Fontisto';
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#7F3DFF',
        tabBarInactiveTintColor: '#C6C6C6',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon name="home" size={25} style={{ color: focused ? '#7F3DFF' : '#C6C6C6' }} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Add Expense"
        component={BookStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <IconFontisto
                name="arrow-swap"
                size={25}
                style={{ color: focused ? '#7F3DFF' : '#C6C6C6' }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Pay"
        component={ContactStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon name="qrcode" size={25} style={{ color: focused ? '#7F3DFF' : '#C6C6C6' }} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Buget"
        component={ContactStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <IconFontisto
                name="wallet"
                size={25}
                style={{ color: focused ? '#7F3DFF' : '#C6C6C6' }}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ContactStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Icon name="user" size={25} style={{ color: focused ? '#7F3DFF' : '#C6C6C6' }} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
