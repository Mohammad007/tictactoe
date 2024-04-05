// In App.js in a new project

import React, { useEffect } from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screen/Home';
import NewGame from './src/screen/NewGame';
import SplashScreen from 'react-native-splash-screen';


const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    if (Platform.OS == 'android') {
      // Add a delay of 3 seconds before hiding the splash screen
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000); // 2000 milliseconds = 3 seconds
    }
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NewGame" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="NewGame" component={NewGame} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;