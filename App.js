import React, { useState, useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as firebase from 'firebase';

import SplashScreen from './screens/splashScreen';

import Welcome from './screens/homeScreen';

import loginScreen from './screens/loginScreen';
import signupScreen from './screens/signupScreen';

import userScreen from './screens/userScreen';

//initialize firebase
const firebaseconfig = {
  apiKey: "AIzaSyDkIOVp253_4e6Bnc8hx55RA5aeNpsCGYY",
  authDomain: "home-secretary-233da.firebaseapp.com",
  databaseURL: "https://home-secretary-233da.firebaseio.com",
  projectId: "home-secretary-233da",
  storageBucket: "home-secretary-233da.appspot.com",
}

if(!firebase.apps.length){
  firebase.initializeApp(firebaseconfig);
}


export default function Main(){
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#4ECDC4',
      accent: '#3b8ccc'
    }
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    if(user){
       setIsLoggedIn(true);
    }else{
       setIsLoggedIn(false);
    }
  })

  const Stack = createStackNavigator();

  const headerOptions = {
      title: "",
      headerTintColor: '#222',
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
            <NavigationContainer>
              <Stack.Navigator>

                <Stack.Screen 
                  name="Splash" 
                  component={SplashScreen}
                  options={{
                    headerShown: false
                  }}/>

                    {
                      isLoggedIn ? (
                        <>
                          {/** If user is logged in */}
                          <Stack.Screen 
                            name="User" 
                            component={userScreen}
                            options={({ navigation }) => ({
                              headerRight: () => (
                                <Button
                                  color="#fff"
                                  onPress={() => {

                                  }}>
                                  Log Out
                                </Button>
                              )
                            })}/>
                        </>
                      ) : (
                        <>
                          {/** If user NOT logged in */}
                          <Stack.Screen 
                            name="Welcome" 
                            component={Welcome}
                            options={{
                              headerShown: false
                            }}/>
                          <Stack.Screen 
                            name="Login" 
                            component={loginScreen}
                            options={headerOptions}/>

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