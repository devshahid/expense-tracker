import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ScreenNames } from '../constants/constant';

const LoginSignupBottomText = ({ navigation, title, navigateBtn }) => {
  const handleNavigation = (btn) => {
    if (btn === 'Login') {
      navigation.navigate(ScreenNames.LOGIN_SCREEN);
    } else {
      navigation.navigate(ScreenNames.SIGNUP_SCREEN);
    }
  };
  return (
    <View style={styles.signupTextContainer}>
      <Text style={styles.signUpMainText}>{title}</Text>
      <TouchableOpacity onPress={() => handleNavigation(navigateBtn)}>
        <Text style={styles.signupText}>{navigateBtn}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginSignupBottomText;

const styles = StyleSheet.create({
  signupTextContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signUpMainText: {
    color: '#333',
    fontSize: 14,
  },
  signupText: {
    color: '#7F3DFF',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
