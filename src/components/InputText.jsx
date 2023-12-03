import { TextInput } from 'react-native';
import React from 'react';
import { loginSignupStyle } from '../common-styles/loginSignup';

const InputText = ({ userDetails, handleFormData, placeholder, title }) => {
  const keyboardType =
    title === 'email' ? 'email-address' : title === 'mobileNumber' ? 'numeric' : 'default';
  const isPassword = title === 'password' || title === 'cpassword' ? true : false;
  const maxLength = title === 'mobileNumber' ? 10 : undefined;
  return (
    <TextInput
      style={loginSignupStyle.input}
      placeholder={placeholder}
      placeholderTextColor="#696969"
      autoCapitalize="none"
      value={userDetails[title]}
      keyboardType={keyboardType}
      secureTextEntry={isPassword}
      onChangeText={(value) => handleFormData(value, title)}
      maxLength={maxLength}
    />
  );
};

export default InputText;
