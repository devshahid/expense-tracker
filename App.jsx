import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './src/screens/MainScreen';
import Login from './src/screens/LoginScreen';

const NativeStack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <NativeStack.Navigator initialRouteName="MainScreen">
        <NativeStack.Screen
          name="MainScreen"
          options={{ headerShown: false }}
          component={MainScreen}
        />
        <NativeStack.Screen name="Login" component={Login} />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
