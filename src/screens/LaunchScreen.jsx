import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Images, ScreenNames } from '../constants/constant';
import { Image } from 'react-native';

const LaunchScreen = ({ navigation }) => {
  useEffect(() => {
    async function getItems() {
      const status = await AsyncStorage.getItem('isLoggedIn');
      if (JSON.parse(status) === true) {
        navigation.replace(ScreenNames.MAIN_SCREEN);
      } else {
        navigation.replace(ScreenNames.ON_BOARDING_SCREEN);
      }
    }
    setTimeout(() => {
      getItems();
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={Images.LAUNCH_IMAGE} style={styles.launchImage} />
    </View>
  );
};

export default LaunchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  launchImage: {
    width: 200,
    height: 200,
  },
});