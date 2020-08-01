import React from 'react';
import { StyleSheet, View, Image, Text, ActivityIndicator } from 'react-native';

import global from '../styles/global';

import * as firebase from 'firebase';

export default function Splash({ navigation }){
    return(
        <View style={{...global.container, ...{backgroundColor: '#D2F8F6'}}}>
           <View style={{...global.wrapper, ...styles.wrapper}}>
                <Image
                    style={styles.logo}
                    source={require('../assets/HomeSecretaryLogo.png')}/>
                <View style={styles.ActivityIndicator}>
                   <ActivityIndicator style={{marginTop: 10}} size="large"/>
                </View>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    logo: {
        width: 500,
        resizeMode: 'contain',
      },
    ActivityIndicator: {
        height: 150,
        justifyContent: 'center'
    },
    loadingText: {
      color: '#adadad'
    }
})