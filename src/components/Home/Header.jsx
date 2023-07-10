import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import DefaultImage from '../../assets/default-image.png';
const HeaderComponent = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    async function getUserInfo() {
      try {
        const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
        if (userInfo.photo) {
          setUserData(userInfo.photo);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, []);
  const showLocalData = async () => {
    const transactionData = await AsyncStorage.getItem('transactionData');
    console.log('transactionData value => ', transactionData);
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
        elevation: 5,
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      }}>
      <View style={styles.iconContainer} onPress={showLocalData}>
        {userData ? (
          <Image source={{ uri: userData }} style={styles.userImage} />
        ) : (
          <Image source={DefaultImage} style={[styles.userImage]} />
        )}
      </View>
      <TouchableOpacity>
        <Text
          style={{
            color: '#000000',
            fontSize: 18,
            fontWeight: '800',
          }}>
          Total Balance
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
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
    overflow: 'hidden',
  },
  userImage: {
    width: 40,
    height: 40,
  },
});
export default HeaderComponent;
