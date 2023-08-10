import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Colours, ScreenNames } from '../../constants/constant';

const ProfileTab = () => {
  const navigation = useNavigation();
  useEffect(() => {
    GoogleSignin.configure({
      androidClientId: __DEV__
        ? process.env.ANDROID_CLIENT_ID
        : process.env.ANDROID_RELEASE_CLIENT_ID,
    });
  }, []);
  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('token');
      navigation.replace(ScreenNames.ON_BOARDING_SCREEN);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.profileContainerView}>
        <Text style={{ color: Colours.BLACK }}>Profile Screen</Text>
      </View>
      <View style={styles.profileContainerView}>
        <TouchableOpacity style={styles.LogoutBtnContainer} onPress={handleLogout}>
          <Text style={styles.LogoutBtn}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileContainerView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  LogoutBtnContainer: {
    justifyContent: 'flex-end',
    backgroundColor: '#FD3C4A',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 1,
    marginBottom: 20,
  },
  LogoutBtn: { color: Colours.WHITE_PURE, fontSize: 16, fontWeight: 'bold' },
});
