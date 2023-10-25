import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import Login from './src/screens/LoginScreen';
import LoginHeader from './src/components/Login/Header';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AddExpense from './src/screens/AddExpense';
import LaunchScreen from './src/screens/LaunchScreen';
import { ScreenNames } from './src/constants/constant';
import SignupScreen from './src/screens/SignupScreen';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
const NativeStack = createNativeStackNavigator();
function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <NativeStack.Navigator initialRouteName={ScreenNames.LAUNCH_SCREEN}>
            <NativeStack.Screen
              name={ScreenNames.MAIN_SCREEN}
              options={{ headerShown: false }}
              component={MainScreen}
            />
            <NativeStack.Screen
              options={{
                header: ({ navigation }) => <LoginHeader navigation={navigation} />,
              }}
              name={ScreenNames.LOGIN_SCREEN}
              component={Login}
            />
            <NativeStack.Screen
              name={ScreenNames.ON_BOARDING_SCREEN}
              options={{ headerShown: false }}
              component={OnboardingScreen}
            />
            <NativeStack.Screen
              name={ScreenNames.LAUNCH_SCREEN}
              options={{ headerShown: false }}
              component={LaunchScreen}
            />
            <NativeStack.Screen
              name={ScreenNames.ADD_EXPENSE_SCREEN}
              options={{ headerShown: false }}
              component={AddExpense}
            />
            <NativeStack.Screen
              name={ScreenNames.SIGNUP_SCREEN}
              options={{ headerShown: false }}
              component={SignupScreen}
            />
          </NativeStack.Navigator>
        </NavigationContainer>
      </Provider>
      <FlashMessage position="bottom" />
    </>
  );
}

export default App;
