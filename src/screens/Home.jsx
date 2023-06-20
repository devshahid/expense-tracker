import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import DrawerNavigator from '../navigations/DrawerNavigator';
const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <DrawerNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    overflow: 'hidden',
  },
});

export default Home;
