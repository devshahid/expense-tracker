import * as React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// import HeaderComponent from '../components/Home/Header';
import HomeMain from '../components/Home/HomeMain';

import ProfileTab from '../components/Profile/ProfileTab';
import { ScreenNames } from '../constants/constant';
const Tab = createBottomTabNavigator();
const MainScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#7F3DFF',
          tabBarInactiveTintColor: '#C6C6C6',
          tabBarLabelStyle: {
            width: '100%',
            fontSize: 13,
          },
        }}>
        <Tab.Screen
          name={ScreenNames.HOME_TAB}
          component={HomeMain}
          options={{
            // header: () => <HeaderComponent />,
            headerShown: false,
            tabBarIcon: ({ focused }) => {
              return (
                <Icon name="home" size={30} style={{ color: focused ? '#7F3DFF' : '#C6C6C6' }} />
              );
            },
          }}
        />

        <Tab.Screen
          name={ScreenNames.PROFILE_TAB}
          component={ProfileTab}
          options={{
            headerShown: false,
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
