import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const LoginHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loginTxt}>Login</Text>
    </View>
  );
};
export default LoginHeader;

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
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
  },
});
