import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native';
import { Colours, Images, tableNames } from '../../constants/constant';
import { SQLite } from '../../sqlite/sql';
import { useSelector } from 'react-redux';
const HeaderComponent = () => {
  const [userData, setUserData] = useState(null);
  const { userId, profilePhoto } = useSelector((state) => state.userDetails);
  useEffect(() => {
    async function getUserInfo() {
      try {
        if (profilePhoto?.length > 0) {
          setUserData(profilePhoto);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
      <View style={styles.iconContainer}>
        {userData ? (
          <Image source={{ uri: userData }} style={styles.userImage} />
        ) : (
          <Image source={Images.DEFAULT_IMAGE} style={[styles.userImage]} />
        )}
      </View>
      <TouchableOpacity>
        <Text
          style={{
            color: Colours.BLACK,
            fontSize: 18,
            fontWeight: '800',
          }}>
          Total Balance
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => [
          console.log(await SQLite.getAllTables()),
          console.log(await SQLite.getTableData(tableNames.TRANSACTION_TABLE, userId)),
          console.log(await SQLite.getTableData(tableNames.USER_TABLE, userId)),
        ]}>
        <Icon name="bell" size={30} style={{ color: Colours.PURPLE_THEME }} />
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
