import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ScreenNames } from '../../constants/constant';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/slices/users';
import ProfileModal from '../Modal/ProfileModal';

const Logout = ({ state, setLogout, navigation }) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(userLogout());
      navigation.replace(ScreenNames.ON_BOARDING_SCREEN);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ProfileModal state={state} setState={setLogout}>
      <Text style={styles.logOutTitle}>Log Out?</Text>
      <Text style={styles.logOutDesc}>Are you sure you want to logout?</Text>
      <View style={styles.confirmBtnContainer}>
        <TouchableOpacity onPress={() => setLogout(false)}>
          <Text style={styles.confirmBtnTxt}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.confirmBtnTxt, { backgroundColor: '#7F3DFF', color: '#FFFFFF' }]}>
            Yes
          </Text>
        </TouchableOpacity>
      </View>
    </ProfileModal>
  );
};

export default Logout;

const styles = StyleSheet.create({
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
