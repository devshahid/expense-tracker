import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native';
import { BALANCE_DROPDOWN, Colours, Images, tableNames } from '../../constants/constant';
import { SQLite } from '../../sqlite/sql';
import { useSelector } from 'react-redux';
const HeaderComponent = ({ selectedOption, setSelectedOption }) => {
  const [userData, setUserData] = useState(null);
  const { userId, profilePhoto } = useSelector((state) => state.userDetails);
  const [isFocus, setIsFocus] = useState(false);
  const data = [
    { label: 'Total Balance', value: BALANCE_DROPDOWN.TOTAL_BALANCE },
    { label: 'Bank', value: BALANCE_DROPDOWN.BANK },
    { label: 'Cash', value: BALANCE_DROPDOWN.CASH },
  ];

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
        height: 75,
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
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: Colours.PURPLE_THEME }]}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={selectedOption}
          itemTextStyle={{ color: Colours.BLACK, fontWeight: '800', fontSize: 18 }}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setSelectedOption(item.value);
            setIsFocus(false);
          }}
        />
      </View>
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
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 40,
    width: 200,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: Colours.BLACK,
    fontWeight: '800',
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    color: Colours.BLACK,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
export default HeaderComponent;
