import React from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

import * as firebase from 'firebase';

import global from '../styles/global';

export default function User({ navigation }){
    return(
        <SafeAreaView style={global.droidSafeArea}>
            <View style={{...global.container, ...{backgroundColor: '#fff'}}}>
                <Text>Welcome User</Text>
            </View>
        </SafeAreaView>
    )
}