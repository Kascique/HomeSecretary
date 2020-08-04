import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import * as firebase from 'firebase';
import global from '../styles/global';
import styles from '../styles/groupStyle';

export default function JoinGroup(){
    const [user, setUser] = useState('');

    firebase.auth().onAuthStateChanged((u) => {
        if(u != null){
            setUser(u);
        }
    });

    const [joinID, setjoinID] = useState('');
    const [joinPassword, setjoinPassword] = useState('');
    const [joinGroupLoading, setjoinGroupLoading] = useState(false);


    const submitJoinGroup = async () => {
        if(joinID == '' || joinPassword == ''){
            Alert.alert(
                'Error',
                'Please full out the form and try again'
            );
        }else{
            await firebase.database().ref(`Groups`).on('value', (snapshot) => {
                const data = snapshot.val();
                try{
                   const dataArray = Object.values(data);
                   let isFound = false;

                   for(let i = 0; i < dataArray.length; i++){
                       const members = dataArray[i].Members;
                       const memberArray = Object.values(members);
                       const groupID = dataArray[i].groupID;
                       const Password = dataArray[i].password;
                       const name = dataArray[i].name;
                       const currDate = new Date();

                       if(joinID == groupID){
                           if(joinPassword == Password){
                               isFound = true;
                               console.log('We have a match yessssssss');
                               firebase.database().ref(`Groups/${groupID}/Members/${user.uid}`).set({
                                    userID: user.uid,
                                    key: groupID,
                                    joined: currDate.toString()
                                }).then(() => {
                                    setjoinID('');
                                    setjoinPassword('');
                                    Alert.alert(
                                        'Success',
                                        `You have successfully joined ${name}`,
                                        {
                                            text: 'OK',
                                        }
                                    )
                                }).catch((error) => console.error(error));
                           }
                       }
                   }

                   if(!isFound){
                       alert('Invalid group credentials, please try again');
                       setjoinPassword('');
                       setjoinID('');
                   }
               
                }
                catch(error){ 
                    console.log(error) 
                }
            })
        }
    
    }
    
    return(
        <View style={global.wrapper}>
           {
               joinGroupLoading
               ? <ActivityIndicator style={{alignSelf: 'center', marginTop: 30}} size="large"/>
               : <View style={styles.wrapper}>
                    <TextInput
                        style={global.textInput}
                        value={joinID}
                        onChangeText={(text) => {setjoinID(text)}}
                        onSubmitEditing={submitJoinGroup}
                        label="Group ID"/>
                    <TextInput
                        style={global.textInput}
                        value={joinPassword}
                        secureTextEntry={true}
                        onChangeText={(text) => {setjoinPassword(text)}}
                        onSubmitEditing={submitJoinGroup}
                        label="Group Password"/>

                    <Button
                        style={global.accessBtn}
                        onPress={submitJoinGroup}>
                        <Text style={global.accessBtnTxt}>Join Group</Text>
                    </Button>
                </View>
           }
        </View>
    )
}