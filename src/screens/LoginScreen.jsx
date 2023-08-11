import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { Images, ScreenNames } from '../constants/constant';
import client from '../utils/axios';
import Snackbar from 'react-native-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserTokenAndId } from '../redux/slices/users';
const Login = ({ navigation, route }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    GoogleSignin.configure({
      androidClientId: __DEV__
        ? process.env.ANDROID_CLIENT_ID
        : process.env.ANDROID_RELEASE_CLIENT_ID,
    });
  }, []);

  useEffect(() => {
    if (route?.params?.success) {
      Snackbar.show({
        text: 'REGISTRATION SUCCESSFULL',
        duration: Snackbar.LENGTH_LONG,
        marginBottom: 20,
        backgroundColor: '#3AC279',
        textColor: '#000000',
      });
      setTimeout(() => {
        Snackbar.dismiss();
      }, 3000);
    }
  }, [route.params]);

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });
  const handleFormData = (value, name) => {
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };
  const handleSubmitData = async () => {
    if (userDetails.email && userDetails.password) {
      try {
        const response = await client.post('/api/user/login', userDetails);
        const { token, message, userId } = response.data;
        if (token) {
          // store the token in the global store
          const data = { token, userId };
          dispatch(updateUserTokenAndId(data));
          await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
          await AsyncStorage.setItem('userData', JSON.stringify(data));
          navigation.replace(ScreenNames.MAIN_SCREEN);
        } else {
          console.log('mymsg => ', message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Invalid user');
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const userDetails = {
        name: userInfo?.user?.name,
        email: userInfo?.user?.email,
        isGoogleLogin: true,
        googleLoginId: userInfo?.user?.id,
      };
      const response = await client.post('/api/user/login', userDetails);
      console.log('response => ', response.data);
      const { token, userId } = response.data;
      if (token) {
        console.log('token => ', token, userId);
        const data = { token, userId };
        dispatch(updateUserTokenAndId(data));
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        navigation.replace(ScreenNames.MAIN_SCREEN);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // alert('sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // alert('sign in progress');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // alert('sign in not available');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const handleNavigation = () => {
    navigation.navigate(ScreenNames.SIGNUP_SCREEN);
  };
  return (
    <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.mainContainer}>
        <View>
          <Image source={Images.LOGIN_IMAGE} style={styles.loginImage} />
        </View>
        <View style={styles.labelContainer}>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={styles.input}
              placeholder="Enter you email"
              placeholderTextColor="#696969"
              keyboardType="email-address"
              autoCapitalize="none"
              value={userDetails.email}
              onChangeText={value => handleFormData(value, 'email')}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#696969"
              secureTextEntry
              value={userDetails.password}
              onChangeText={value => handleFormData(value, 'password')}
            />
          </View>
          <View style={styles.forgotPsdContainer}>
            <TouchableOpacity>
              <Text style={styles.forgotPsdTxt}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleSubmitData}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.horizontalDiv} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.horizontalDiv} />
        </View>

        <TouchableOpacity style={styles.loginWithGoogleContainer} onPress={handleGoogleSignIn}>
          <Image style={styles.googleIconContainer} source={Images.GOOGLE_IMAGE} />
          <Text style={styles.loginWithGoogleText}>Login with Google</Text>
        </TouchableOpacity>
        <View style={styles.signupTextContainer}>
          <Text style={styles.signUpMainText}>Don't have an account yet? </Text>
          <TouchableOpacity onPress={handleNavigation}>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loginImage: {
    width: 380,
    height: 350,
    borderWidth: 2,
  },
  labelContainer: {
    flex: 1,
    width: '100%',
    marginVertical: 0,
    paddingVertical: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#000000',
    margin: 10,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '80%',
    margin: 20,
    backgroundColor: '#000000',
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#7F3DFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 1,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
  loginWithGoogleContainer: {
    flex: 1,
    backgroundColor: '#F1F5F6',
    borderRadius: 10,
    paddingVertical: 5,
    marginTop: 20,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#D9DBE4',
    elevation: 1,
  },
  googleIconContainer: {
    width: 50,
    height: 30,
    paddingVertical: 5,
  },
  googleLoginTxtContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginWithGoogleText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '80%',
  },
  horizontalDiv: {
    flex: 1,
    height: 1,
    backgroundColor: '#999',
  },
  orText: {
    marginHorizontal: 10,
    color: '#999',
    fontWeight: 'bold',
    fontSize: 16,
  },
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
