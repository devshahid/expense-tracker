import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';

const NativeStack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <NativeStack.Navigator initialRouteName="Home">
        <NativeStack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
        <NativeStack.Screen name="Login" component={Login} />
      </NativeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
