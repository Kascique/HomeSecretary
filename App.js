import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { View, Text, StyleSheet, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './screens/homeScreen';

export default function Main(){
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#147cbc',
      accent: '#3b8ccc'
    }
  }

  const Stack = createStackNavigator();

  return(
    <PaperProvider theme={theme}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
          <SafeAreaView style={styles.droidSafeArea}>
            <NavigationContainer>
              <Stack.Navigator>

                <Stack.Screen 
                  name="Welcome" 
                  component={Welcome}
                  options={{
                    headerShown: false
                  }}/>

              </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  }
})