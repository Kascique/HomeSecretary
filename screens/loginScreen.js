import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import global from '../styles/global';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    return(
       <SafeAreaView style={global.droidSafeArea}>
          <View style={global.container}>
             <View style={global.accessForm}>
                <View style={global.accessBase}>
                    <Image 
                        style={global.logo}
                        source={require('../assets/HomeSecretaryLogo.png')}/>
                    <TextInput 
                        style={global.textInput}
                        label="Email Address"
                        value={email}
                        onChangeText={email => setEmail(email)}/>

                    <TextInput 
                        style={global.textInput}
                        label="Password"
                        value={password}
                        onChangeText={password => setPassword(password)}/>
                    <Button
                        style={global.accessBtn}
                        mode="contained">
                        Log In
                    </Button>
                </View>
             </View>
          </View>
       </SafeAreaView>
    )
}
