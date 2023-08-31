import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenNames } from '../../constants/constant';

const Logout = ({ state, setLogout, navigation }) => {
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
    <View>
      <Modal isVisible={state}>
        <View style={styles.logoutModalContainer}>
          <Text style={styles.logOutTitle}>Log Out?</Text>
          <Text style={styles.logOutDesc}>Are you sure you want to logout?</Text>
          <View style={styles.confirmBtnContainer}>
            <TouchableOpacity onPress={() => setLogout(false)}>
              <Text style={styles.confirmBtnTxt}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text
                style={[styles.confirmBtnTxt, { backgroundColor: '#7F3DFF', color: '#FFFFFF' }]}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  logoutModalContainer: {
    backgroundColor: '#ffffff',
    minHeight: 200,
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },
  logOutTitle: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    padding: 10,
  },
  logOutDesc: {
    fontSize: 16,
    color: '#000000',
    padding: 10,
    marginBottom: 5,
  },
  confirmBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  confirmBtnTxt: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: '#EEE5FF',
  },
});
