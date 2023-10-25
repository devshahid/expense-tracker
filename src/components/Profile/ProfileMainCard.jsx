import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
const ProfileMainCard = () => {
  const { userName } = useSelector(state => state.userDetails);
  return (
    <View style={styles.profileMainCardContainer}>
      <View style={styles.profileImageConatiner}>
        <Image
          source={{ uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg' }}
          style={styles.profileUserImage}
        />
      </View>
      <View>
        <Text style={styles.profileNameTxt}>{userName}</Text>
      </View>
    </View>
  );
};

export default ProfileMainCard;

const styles = StyleSheet.create({
  profileMainCardContainer: {
    // flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 9,
    paddingVertical: 10,
  },
  profileImageConatiner: {
    marginBottom: 10,
  },
  profileUserImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileNameTxt: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
});
