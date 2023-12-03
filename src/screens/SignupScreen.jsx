import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colours, Images, ScreenNames } from '../constants/constant';
import { resetUserDetails, userRegister } from '../redux/slices/users';
import { useSelector, useDispatch } from 'react-redux';
import HorizontalOR from '../components/HorizontalOR';
import GoogleLoginBtn from '../components/GoogleLoginBtn';
import LoginSignupBottomText from '../components/LoginSignupBottomText';
import { loginSignupStyle } from '../common-styles/loginSignup';
import InputText from '../components/InputText';
import { validateInput } from '../utils/loginValidationHandler';

export const ErrorText = ({ condition, text }) => {
  return condition ? <Text style={loginSignupStyle.errorTxt}>{text}</Text> : null;
};

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { message, status } = useSelector((state) => state.userDetails);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    cpassword: '',
    hasName: false,
    isMobileNumberValid: false,
    isEmailValid: false,
    isPasswordValid: false,
    isPasswordMatched: false,
  });

  useEffect(() => {
    if (message === 'User created successfully') {
      navigation.replace(ScreenNames.LOGIN_SCREEN, { success: true });
    }
    return () => {
      dispatch(resetUserDetails()); // Define and dispatch this action to reset the flag
    };
  }, [dispatch, message, navigation]);

  const handleFormData = (value, name) => {
    const [key, output] = validateInput(name, value, userDetails);
    setUserDetails({
      ...userDetails,
      [name]: value,
      [key]: output,
    });
  };
  const handleSubmitData = async () => {
    dispatch(userRegister(userDetails));
    if (status === true) {
      navigation.replace(ScreenNames.LOGIN_SCREEN, { success: true });
    }
  };

  return (
    <ScrollView style={loginSignupStyle.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={loginSignupStyle.mainContainer}>
        <View>
          <Image source={Images.SIGNUP_IMAGE} style={loginSignupStyle.loginImage} />
        </View>

        {/* write logic to handle all erros at once */}
        <View style={loginSignupStyle.errorTxtView}>
          <ErrorText
            condition={!userDetails.hasName && userDetails.name.length > 0}
            text="Please enter your name"
          />
          <ErrorText
            condition={!userDetails.isEmailValid && userDetails.email.length > 0}
            text="Please enter a valid email"
          />
          <ErrorText
            condition={!userDetails.isMobileNumberValid && userDetails.mobileNumber.length > 0}
            text="Please enter a valid number"
          />
          <ErrorText
            condition={!userDetails.isPasswordValid && userDetails.password.length > 0}
            text="Please enter a valid password"
          />
          <ErrorText
            condition={
              !userDetails.isPasswordValid &&
              userDetails.password.length > 0 &&
              userDetails.password.length < 8
            }
            text="Please enter a password with at least 8 characters"
          />
          <ErrorText
            condition={!userDetails.isPasswordMatched && userDetails.password.length > 0}
            text="Entered password doesn't matched"
          />
        </View>
        {/* View for displaying Signup input fields */}
        <View style={loginSignupStyle.labelContainer}>
          <View style={{ alignItems: 'center' }}>
            <InputText
              placeholder="Enter you full name"
              title="name"
              handleFormData={handleFormData}
              userDetails={userDetails}
            />
            <InputText
              placeholder="Enter your email"
              title="email"
              handleFormData={handleFormData}
              userDetails={userDetails}
            />
            <InputText
              placeholder="Enter your mobile number"
              title="mobileNumber"
              handleFormData={handleFormData}
              userDetails={userDetails}
            />
            <InputText
              placeholder="Enter your password"
              title="password"
              handleFormData={handleFormData}
              userDetails={userDetails}
            />
            <InputText
              placeholder="Confirm your password"
              title="cpassword"
              handleFormData={handleFormData}
              userDetails={userDetails}
            />
          </View>
        </View>

        <TouchableOpacity
          disabled={
            !userDetails.isEmailValid ||
            !userDetails.isPasswordValid ||
            !userDetails.isPasswordMatched ||
            !userDetails.hasName ||
            !userDetails.isMobileNumberValid
          }
          style={[
            loginSignupStyle.loginButton,
            {
              backgroundColor:
                userDetails.isEmailValid &&
                userDetails.isPasswordValid &&
                userDetails.isPasswordMatched &&
                userDetails.hasName &&
                userDetails.isMobileNumberValid
                  ? Colours.PURPLE_THEME
                  : Colours.GREY_WHITE,
            },
          ]}
          onPress={handleSubmitData}>
          <Text style={loginSignupStyle.loginButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* ---------- OR ------- component */}
        <HorizontalOR />

        {/* Google Login button */}
        <GoogleLoginBtn />

        {/* Bottom text to switch b/w register and login */}
        <LoginSignupBottomText
          navigation={navigation}
          title="Already have an account? "
          navigateBtn="Login"
        />
      </View>
    </ScrollView>
  );
};

export default SignupScreen;
