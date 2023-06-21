import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MyRewardsStackNavigator from './stack-navigators/MyRewardsStackNavigator';
import LocationsStackNavigator from './stack-navigators/LocationsStackNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import HeaderComponent from '../components/Home/Header';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeTabs"
        options={{
          header: ({ navigation }) => (
            <HeaderComponent
              notification="Notification"
              navigation={navigation}
              onProfileClick={() => navigation.openDrawer()}
            />
          ),
        }}
        component={BottomTabNavigator}
      />
      <Drawer.Screen name="MyRewardsStack" component={MyRewardsStackNavigator} />
      <Drawer.Screen name="LocationsStack" component={LocationsStackNavigator} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
