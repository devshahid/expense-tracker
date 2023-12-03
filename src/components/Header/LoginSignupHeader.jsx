import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const LoginSignUpHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.loginTxt}>{title}</Text>
    </View>
  );
};
export default LoginSignUpHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  loginTxt: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: '#000000',
  },
});
