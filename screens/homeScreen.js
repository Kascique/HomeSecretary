import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { Button } from 'react-native-paper';

import global from '../styles/global';

export default function Welcome(){
    
    return (
        <View style={{...global.container, ...{backgroundColor: '#D2F8F6'}}}>
            <View style={styles.test}>
                <Image 
                    style={global.logo}
                    source={require('../assets/HomeSecretaryLogo.png')}/>
            </View>
           
            <View style={styles.footer}>
                <View style={styles.footerWrapper}>
                   <Button>Sign Up</Button>
                   <Button>Login</Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    test: {
       width: '90%',
       height: 300,
       alignSelf: 'center',
       marginTop: 50,
    },
    footer:{
        width: '100%',
        height: 200,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 0,
    },
    footerWrapper: {
        width: '70%',
        height: 60,
        backgroundColor: 'pink',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0
    }
})
