import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/HomeScreen';
import Login from './src/screens/LoginScreen';

const NativeStack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <NativeStack.Navigator initialRouteName="Home">
        <NativeStack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <NativeStack.Screen name="Login" component={Login} />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
