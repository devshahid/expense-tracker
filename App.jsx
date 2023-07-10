import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import Login from './src/screens/LoginScreen';
import LoginHeader from './src/components/Login/Header';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AddExpense from './src/screens/AddExpense';
import { ScreenNames } from './src/constants/constant';
const NativeStack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <NativeStack.Navigator initialRouteName={ScreenNames.ON_BOARDING_SCREEN}>
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
        <NativeStack.Screen name={ScreenNames.ON_BOARDING_SCREEN} component={OnboardingScreen} />
        <NativeStack.Screen
          name={ScreenNames.ADD_EXPENSE_SCREEN}
          options={{ headerShown: false }}
          component={AddExpense}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
