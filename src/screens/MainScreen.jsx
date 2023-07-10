import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeStackNavigator from '../navigations/stack-navigators/HomeStackNavigator';
import ProfileTab from '../components/Profile/ProfileTab';
const Tab = createBottomTabNavigator();
const MainScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
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
                <Icon name="home" size={30} style={{ color: focused ? '#7F3DFF' : '#C6C6C6' }} />
              );
            },
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Icon name="user" size={30} style={{ color: focused ? '#7F3DFF' : '#C6C6C6' }} />
              );
            },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default MainScreen;
