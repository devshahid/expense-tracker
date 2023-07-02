import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
const OnboardingScreen = ({ navigation }) => {
  useEffect(() => {
    async function getItems() {
      const status = await AsyncStorage.getItem('isLoggedIn');
      if (JSON.parse(status) === true) {
        navigation.replace('MainScreen');
      } else {
        navigation.replace('Login');
      }
    }
    getItems();
  }, []);
  return (
    <View>
      <Text>OnboardingScreen</Text>
    </View>
  );
};

export default OnboardingScreen;
