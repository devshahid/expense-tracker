import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colours, Images, ScreenNames } from '../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/slices/users';
import HorizontalOR from '../components/HorizontalOR';
import GoogleLoginBtn from '../components/GoogleLoginBtn';
import LoginSignupBottomText from '../components/LoginSignupBottomText';
import { loginSignupStyle } from '../common-styles/loginSignup';
import InputText from '../components/InputText';
import { toastMessage } from '../utils/toastMessage';
import { validateInput } from '../utils/loginValidationHandler';
import { ErrorText } from './SignupScreen';
import ActivityLoader from '../components/Loaders/ActivityLoader';

const Login = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { token, isLoading } = useSelector((state) => state.userDetails);

  // useEffect handler to display toast when registration completed
  useEffect(() => {
    if (route?.params?.success) {
      toastMessage('REGISTRATION SUCCESSFULL', 'success');
    }
  }, [route.params]);

  // handler to navigate the user to main screen when logged in
  useEffect(() => {
    if (token) {
      navigation.replace(ScreenNames.MAIN_SCREEN);
    }
  }, [navigation, token]);

  // defining local state
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    isEmailValid: false,
    isPasswordValid: false,
  });

  // handler to update the state based on user input
  const handleFormData = (value, name) => {
    const [key, output] = validateInput(name, value);
    setUserDetails({
      ...userDetails,
      [name]: value,
      [key]: output,
    });
  };
  if (isLoading) {
    return <ActivityLoader />;
  }
  return (
    <ScrollView style={loginSignupStyle.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={loginSignupStyle.mainContainer}>
        <View>
          <Image source={Images.LOGIN_IMAGE} style={loginSignupStyle.loginImage} />
        </View>

        {/* View for displaying Login input fields and a forget password text */}
        <View style={loginSignupStyle.labelContainer}>
          <View style={{ alignItems: 'center' }}>
            <InputText
              placeholder="Enter your email"
              title="email"
              handleFormData={handleFormData}
              userDetails={userDetails}
            />
          </View>
          <View style={loginSignupStyle.errorTxtView}>
            {!userDetails.isEmailValid && userDetails.email.length > 0 && (
              <Text style={loginSignupStyle.errorTxt}>Please enter a valid email</Text>
            )}
          </View>
          <View style={{ alignItems: 'center' }}>
            <InputText
              placeholder="Enter your password"
              title="password"
              handleFormData={handleFormData}
              userDetails={userDetails}
            />
          </View>
          <View style={loginSignupStyle.errorTxtView}>
            <ErrorText
              condition={!userDetails.isPasswordValid && userDetails.password.length > 0}
              text="Please enter a valid password"
            />

            <ErrorText
              condition={
                userDetails.isPasswordValid &&
                userDetails.password.length > 0 &&
                userDetails.password.length < 8
              }
              text="Please enter a password with at least 8 characters"
            />
          </View>

          <View style={styles.forgotPsdContainer}>
            <TouchableOpacity>
              <Text style={styles.forgotPsdTxt}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          disabled={!userDetails.isEmailValid || !userDetails.isPasswordValid}
          style={[
            loginSignupStyle.loginButton,
            {
              backgroundColor:
                userDetails.isEmailValid && userDetails.isPasswordValid
                  ? Colours.PURPLE_THEME
                  : Colours.GREY_WHITE,
            },
          ]}
          onPress={() => dispatch(userLogin(userDetails))}>
          <Text style={loginSignupStyle.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* ---------- OR ------- component */}
        <HorizontalOR />

        {/* Google Login button */}
        <GoogleLoginBtn />

        {/* Bottom text to switch b/w register and login */}
        <LoginSignupBottomText
          navigation={navigation}
          title="Don't have an account yet? "
          navigateBtn="Sign Up"
        />
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  forgotPsdContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginRight: 20,
    marginTop: 5,
  },
  forgotPsdTxt: {
    color: '#7F3DFF',
    fontWeight: '600',
  },
});
