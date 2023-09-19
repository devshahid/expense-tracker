import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Images, ScreenNames } from '../constants/constant';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateUserTokenAndId } from '../redux/slices/users';
const LaunchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getItems() {
      const userData = await AsyncStorage.getItem('userData');
      const data = JSON.parse(userData);
      console.log('data => ', data);
      if (data) {
        // write logic to fetch data from database and update the state
        // const data = JSON.parse(await AsyncStorage.getItem('userData'));
        dispatch(updateUserTokenAndId(data));
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
