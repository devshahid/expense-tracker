import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from '../../components/Home/Tabs';
import HomeMain from '../../components/Home/HomeMain';

const Stack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeMain} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
