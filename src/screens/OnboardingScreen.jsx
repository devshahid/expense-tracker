import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenNames } from '../constants/constant';
const OnboardingScreen = ({ navigation }) => {
  useEffect(() => {
    async function getItems() {
      const status = await AsyncStorage.getItem('isLoggedIn');
      if (JSON.parse(status) === true) {
        navigation.replace(ScreenNames.MAIN_SCREEN);
      } else {
        navigation.replace(ScreenNames.LOGIN_SCREEN);
      }
    }
    getItems();
  }, []);
  return (
    <View>
      <Text style={{ color: '#000000' }}>OnboardingScreen</Text>
    </View>
  );
};

export default OnboardingScreen;
