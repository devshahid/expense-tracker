import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Images } from '../constants/constant';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/slices/users';

const GoogleLoginBtn = () => {
  useEffect(() => {
    GoogleSignin.configure({
      androidClientId: __DEV__
        ? process.env.ANDROID_CLIENT_ID
        : process.env.ANDROID_RELEASE_CLIENT_ID,
    });
  }, []);

  const dispatch = useDispatch();

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const userDetails = {
        name: userInfo?.user?.name,
        email: userInfo?.user?.email,
        isGoogleLogin: true,
        googleLoginId: userInfo?.user?.id,
        profilePhoto: userInfo?.user?.photo ?? '',
      };
      dispatch(userLogin(userDetails));
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
  return (
    <TouchableOpacity style={styles.loginWithGoogleContainer} onPress={handleGoogleSignIn}>
      <Image style={styles.googleIconContainer} source={Images.GOOGLE_IMAGE} />
      <Text style={styles.loginWithGoogleText}>Login with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleLoginBtn;

const styles = StyleSheet.create({
  loginWithGoogleContainer: {
    flex: 1,
    backgroundColor: '#F1F5F6',
    borderRadius: 10,
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
  loginWithGoogleText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 20,
  },
});
