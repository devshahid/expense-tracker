import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MyRewardsStackNavigator from './stack-navigators/MyRewardsStackNavigator';
import LocationsStackNavigator from './stack-navigators/LocationsStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="HomeTabs" component={BottomTabNavigator} />
      <Drawer.Screen name="MyRewardsStack" component={MyRewardsStackNavigator} />
      <Drawer.Screen name="LocationsStack" component={LocationsStackNavigator} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
