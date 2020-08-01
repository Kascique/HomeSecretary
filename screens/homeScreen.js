import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Button, Title } from 'react-native-paper';

import global from '../styles/global';

export default function Welcome({ navigation }){
    
    return (
        <View style={{...global.container, ...{backgroundColor: '#D2F8F6'}}}>
            <View style={styles.test}>
                <Image 
                    style={global.logo}
                    source={require('../assets/HomeSecretaryLogo.png')}/>
                <Title style={styles.title}>Life Management Made Easy</Title>
            </View>
           
            <View style={styles.footer}>
               <ImageBackground
                   style={styles.footerBackground}
                   resizeMode='cover'
                   source={require('../assets/temp/footer_image.png')}>
                  <View style={styles.footerWrapper}>
                      <TouchableWithoutFeedback onPress={() => navigation.navigate('SignUp')}> 
                          <Text style={styles.btnTxt}>Sign Up</Text>
                      </TouchableWithoutFeedback>
                      <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                          <Text style={styles.btnTxt}>Login</Text>
                      </TouchableWithoutFeedback>
                   </View>
                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    test: {
       width: '90%',
       height: 300,
       alignSelf: 'center',
       marginTop: 120,
       alignItems: 'center'
    },
    title: {
       fontSize: 20,
       color: '#4B4B4B',
       fontWeight: '800'
    },
    footer:{
        width: '100%',
        height: 200,
        position: 'absolute',
        bottom: 0,
    },
    footerBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'relative',
        bottom: - 20
    },
    footerWrapper: {
        width: '90%',
        height: 60,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 50
    },
    btnTxt: {
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})
