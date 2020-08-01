import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, ScrollView, Keyboard, Alert } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';

import * as firebase from 'firebase';

import global from '../styles/global';

export default function SignUp({ navigation }){

    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState(false);
    const [fullNameHelper, setFullNameHelper] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailHelper, setEmailHelper] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordHelper, setPasswordHelper] = useState('');

    const validateFullName = (value) => {
        setFullName(value);
        if(value == ""){
          setFullNameError(true);
          setFullNameHelper('Please enter your full name');
          return;
        }else{
            setFullNameError(false);
        }
      }

    const validateEmail = (value) => {
        setEmail(value);
        if(value == ""){
          setEmailError(true);
          setEmailHelper('Please enter email address');
          return;
        }else if(!checkEmail(value)){
          setEmailError(true);
          setEmailHelper('Invalid email format');
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


    const signupSubmit = async () => {
       Keyboard.dismiss();
       if(fullName == '' || email == '' || password == ''){
          Alert.alert(
              'Signup Error',
              'Please fill out the form and try again',
              [
                  {
                      text: 'OK'
                  }
              ]
          )
       }else{

       }
    }

    return(
       <SafeAreaView style={global.droidSafeArea}>
          <View style={global.container}>
             <ScrollView style={global.accessScrollView}>
                <View style={global.accessForm}>
                    <View style={global.accessBase}>
                        <Image 
                            style={global.logo}
                            source={require('../assets/HomeSecretaryLogo.png')}/>
                        <TextInput 
                            style={global.textInput}
                            error={fullNameError}
                            label="Full name"
                            value={fullName}
                            onSubmitEditing={signupSubmit}
                            onChangeText={validateFullName}/>
                        <HelperText
                            style={global.helper}
                            type='error'
                            visible={fullNameError}>
                            {fullNameHelper}
                        </HelperText>

                        <TextInput 
                            style={global.textInput}
                            error={emailError}
                            label="Email Address"
                            value={email}
                            onSubmitEditing={signupSubmit}
                            onChangeText={validateEmail}/>
                        <HelperText
                            style={global.helper}
                            type='error'
                            visible={emailError}>
                            {emailHelper}
                        </HelperText>

                        <TextInput 
                            style={global.textInput}
                            error={passwordError}
                            label="Password"
                            value={password}
                            onSubmitEditing={signupSubmit}
                            onChangeText={validatePassword}/>
                        <HelperText
                            style={global.helper}
                            type='error'
                            visible={passwordError}>
                            {passwordHelper}
                        </HelperText>

                        <Button
                            style={global.accessBtn}
                            mode="contained">
                            <Text style={global.accessBtnTxt}>Create Account</Text>
                        </Button>
                    </View>
                </View>
             </ScrollView>
          </View>
       </SafeAreaView>
    )
}
