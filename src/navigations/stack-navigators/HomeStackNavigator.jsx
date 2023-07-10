import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeMain from '../../components/Home/HomeMain';
const Stack = createStackNavigator();
import HeaderComponent from '../../components/Home/Header';
import { ScreenNames } from '../../constants/constant';
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ScreenNames.HOME_MAIN_SCREEN}
        component={HomeMain}
        options={{
          header: () => <HeaderComponent />,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
