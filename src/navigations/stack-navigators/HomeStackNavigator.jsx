import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeMain from '../../components/Home/HomeMain';
const Stack = createStackNavigator();
import HeaderComponent from '../../components/Home/Header';
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={HomeMain}
        options={{
          header: ({ navigation }) => (
            <HeaderComponent
              navigation={navigation}
              onProfileClick={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
