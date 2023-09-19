import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
const ProfileItems = ({ name, iconName, handler }) => {
  return (
    <View style={styles.profileItemsConatiner}>
      <TouchableOpacity style={styles.profileItemButtonContainer} onPress={handler}>
        <Icon
          name={iconName}
          size={30}
          style={[
            styles.profileItemImg,
            name === 'Log Out'
              ? { color: '#FD3C4A', backgroundColor: '#FFE2E4' }
              : { color: '#7F3DFF', backgroundColor: '#EEE5FF' },
          ]}
        />
        <Text style={styles.profileItemsTxt}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileItems;

const styles = StyleSheet.create({
  profileItemsConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingLeft: 20,
  },
  profileItemImg: {
    color: '#000000',
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 20,
  },
  profileItemsTxt: {
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    color: '#000000',
  },
  profileItemButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
