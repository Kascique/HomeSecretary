import React, { useState } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { View, Text, StyleSheet, Platform, SafeAreaView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './screens/homeScreen';

import loginScreen from './screens/loginScreen';
import signupScreen from './screens/signupScreen';


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

  const [isLoggedIn, setisLoggedIn] = useState(false);

  const Stack = createStackNavigator();

  const headerOptions = {
      title: "",
      headerStyle: {
        backgroundColor: '#fff',
        shadowOpacity: 0,
        elevation: 0,
        shadowOffset: {
          height: 0,
        },
      },
  }

  return(
    <PaperProvider theme={theme}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss() }>
            <NavigationContainer>
              <Stack.Navigator>

                <Stack.Screen 
                  name="Welcome" 
                  component={Welcome}
                  options={{
                    headerShown: false
                  }}/>

                    {
                      isLoggedIn ? (
                        <>
                          {/** If user is logged in */}
                        </>
                      ) : (
                        <>
                          {/** If user NOT logged in */}
                          <Stack.Screen 
                            name="Login" 
                            component={loginScreen}
                            options={{
                              headerShown: true
                            }}/>

                          <Stack.Screen 
                            name="SignUp" 
                            component={signupScreen}
                            options={headerOptions}/>

                        </>
                      )
                    }


               {/* <SafeAreaView style={styles.droidSafeArea}>
                  <Stack.Screen 
                    name="Welcome" 
                    component={Welcome}
                    options={{
                      headerShown: false
                    }}/>
                </SafeAreaView> */}


              </Stack.Navigator>
            </NavigationContainer>
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