import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
const ProfileMainCard = () => {
  const { userName, profilePhoto } = useSelector((state) => state.userDetails);
  return (
    <View style={styles.profileMainCardContainer}>
      <View style={styles.profileImageConatiner}>
        <Image
          source={{
            uri:
              profilePhoto?.length > 0
                ? profilePhoto
                : 'https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_1280.png',
          }}
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
