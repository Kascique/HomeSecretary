import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, ScrollView, Keyboard, Alert } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';


import * as firebase from 'firebase';

import global from '../styles/global';

export default function Login(){
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailHelper, setEmailHelper] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelper, setPasswordHelper] = useState('');

    const [loading, setLoading] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState('Loading...');

    const validateEmail = (value) => {
        setEmail(value);
        if(value == ""){
          setEmailError(true);
          setEmailHelper('Please enter email address');
          return;
        }else if(!checkEmail(value)){
           setEmailError(true);
           setEmailHelper('Invalid email address');
           return;
        }else{
            setEmailError(false);
        }
      }
  
      const validatePassword = (value) => {
          setPassword(value);
          if(value == ''){
              setPasswordError(true);
              setPasswordHelper('Password is required');
          }else{
              setPasswordError(false);
          }
      }
  
     const checkEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
     }

     const loginSubmit = async () => {
        Keyboard.dismiss();
        if(email == '' || password == ''){
            Alert.alert(
                'Invalid Login',
                'Please enter your email and password to login',
                [
                    {
                        text: 'OK'
                    }
                ]
            )
        }else{
            setLoading(true);
            try{
               let response = await firebase.auth().signInWithEmailAndPassword(email, password)
                   .then(function(user){
                       //Logging In
                   })
            }
            catch(error){
                setPassword(null);
                Alert.alert(
                    'Login Error',
                    'Please check your email and password and try again',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                setLoading(false);
                            }
                        }
                    ]
                )
            }
        }
     }

    return(
       <SafeAreaView style={global.droidSafeArea}>
          <View style={global.container}>
            <Spinner
                visible={loading}
                textContent={loadingMsg}
                textStyle={global.loadingText}/>

             <ScrollView style={global.accessScrollView}>
             <View style={global.accessForm}>
                <View style={global.accessBase}>
                    <Image 
                        style={global.logo}
                        source={require('../assets/HomeSecretaryLogo.png')}/>
                    <TextInput 
                        style={global.textInput}
                        label="Email Address"
                        value={email}
                        error={emailError}
                        onSubmitEditing={loginSubmit}
                        onChangeText={validateEmail}/>
                    <HelperText
                        style={global.helper}
                        type='error'
                        visible={emailError}>
                        {emailHelper}
                    </HelperText>

                    <TextInput 
                        style={global.textInput}
                        label="Password"
                        value={password}
                        error={passwordError}
                        secureTextEntry={true}
                        onSubmitEditing={loginSubmit}
                        onChangeText={validatePassword}/>
                    <HelperText
                        style={global.helper}
                        type='error'
                        visible={passwordError}>
                        {passwordHelper}
                    </HelperText>

                    <Button
                        style={global.accessBtn}
                        mode="contained"
                        onPress={loginSubmit}>
                        <Text style={global.accessBtnTxt}>Log In</Text>
                    </Button>
                </View>
             </View>
             </ScrollView>
          </View>
       </SafeAreaView>
    )
}
