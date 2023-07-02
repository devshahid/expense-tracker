import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import Login from './src/screens/LoginScreen';
import LoginHeader from './src/components/Login/Header';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AddExpense from './src/screens/AddExpense';

const NativeStack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <NativeStack.Navigator initialRouteName="OnBoardingScreen">
        <NativeStack.Screen
          name="MainScreen"
          options={{ headerShown: false }}
          component={MainScreen}
        />
        <NativeStack.Screen
          options={{
            header: ({ navigation }) => <LoginHeader navigation={navigation} />,
          }}
          name="Login"
          component={Login}
        />
        <NativeStack.Screen name="OnBoardingScreen" component={OnboardingScreen} />
        <NativeStack.Screen
          name="Add_Expense"
          options={{ headerShown: false }}
          component={AddExpense}
        />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
