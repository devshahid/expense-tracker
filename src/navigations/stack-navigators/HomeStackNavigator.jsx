import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeMain from '../../components/Home/HomeMain';
const Stack = createStackNavigator();
import HeaderComponent from '../../components/Home/Header';
import AddExpense from '../../screens/AddExpense';
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
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
      <Stack.Screen name="Add_Expense" options={{ headerShown: false }} component={AddExpense} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
