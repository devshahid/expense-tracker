import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileMainCard from './ProfileMainCard';
import ProfileItems from './ProfileItems';
import Logout from './Logout';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AddBalance from './AddBalance';
const ProfileTab = () => {
  const navigation = useNavigation();
  const [logout, setLogout] = useState(false);
  const [addBalance, setAddBalance] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      androidClientId: __DEV__
        ? process.env.ANDROID_CLIENT_ID
        : process.env.ANDROID_RELEASE_CLIENT_ID,
    });
  }, []);

  return (
    <View style={styles.container}>
      <ProfileMainCard />
      <View style={{ height: '100%', padding: 10 }}>
        <ScrollView>
          <ProfileItems name="Add Balance" iconName="wallet" handler={() => setAddBalance(true)} />
          <ProfileItems name="Settings" iconName="settings" />
          <ProfileItems name="Export Data" iconName="share" />
          <ProfileItems name="Log Out" iconName="log-out" handler={() => setLogout(true)} />
        </ScrollView>
        <Logout state={logout} setLogout={setLogout} navigation={navigation} />
        <AddBalance state={addBalance} setAddBalance={setAddBalance} navigation={navigation} />
      </View>
    </View>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F6F6' },
});
