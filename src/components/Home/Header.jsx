import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const HeaderComponent = ({ onBalanceClick, navigation }) => {
  useEffect(() => {
    GoogleSignin.configure({
      androidClientId: process.env.ANDROID_CLIENT_ID,
    });
  }, []);
  const showLocalData = async () => {
    const transactionData = await AsyncStorage.getItem('transactionData');
    console.log('transactionData value => ', transactionData);
  };
  const handleLogout = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('isLoggedIn');
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        padding: 10,
        backgroundColor: '#FFFFFF',
      }}>
      <TouchableOpacity style={styles.iconContainer} onPress={showLocalData}>
        <Icon
          onPress={() => navigation.openDrawer()}
          name="user"
          size={30}
          style={{
            color: '#000000',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Text
          style={{
            color: '#000000',
          }}>
          Drop Down
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBalanceClick}>
        <Icon name="bell" size={30} style={{ color: '#7F3DFF' }} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7F3DFF',
  },
});
export default HeaderComponent;
