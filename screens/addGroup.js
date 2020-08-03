import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import * as firebase from 'firebase';
import global from '../styles/global';
import styles from '../styles/groupStyle';

export default function AddGroup(){
    const [user, setUser] = useState('');

    firebase.auth().onAuthStateChanged((u) => {
        if(u != null){
            setUser(u);
        }
    });

    const [groupName, setGroupName] = useState('');
    const [groupPassword, setGroupPassword] = useState('');
    const [createGroupLoading, setCreateGroupLoading] = useState(false);


    const submitNewGroup = async () => {
        if(groupName == '' || groupPassword == ''){
            Alert.alert(
                'Error',
                'Please full out the form and try again'
            );
        }else{
            console.log('yesss');
            setCreateGroupLoading(true);
            let groupID = new Date().getUTCMilliseconds();
            await firebase.database().ref(`Groups/${groupID}`).set({
                name: groupName,
                password: groupPassword,
                groupID: groupID
            }).then(() => {
 
              const currDate = new Date();
               
               firebase.database().ref(`Groups/${groupID}/Members/${user.uid}`).set({
                   userID: user.uid,
                   key: groupID,
                   joined: currDate.toString()
               }).then(() => {
                      setGroupName(''); 
                      setGroupPassword('');
                     Alert.alert(
                         'Success',
                         `Group have been created successfully, you can share the group ID and password with users you would like to join the group`,
                         {
                             text: 'OK',
                             onPress: () => {
                             setGroupPassword('');
                             }
                         }
                     );
               }).catch((error) => {
                  alert(`${error}`);
               });
 
            }).catch((error) => {
                alert(`${error}`);
            }); 

            setCreateGroupLoading(false);
        }
     }
    
    return(
        <View style={global.wrapper}>
           {
               createGroupLoading
               ? <ActivityIndicator style={{alignSelf: 'center', marginTop: 30}} size="large"/>
               : <View style={styles.wrapper}>
                    <TextInput
                        style={global.textInput}
                        value={groupName}
                        onChangeText={(text) => {setGroupName(text)}}
                        onSubmitEditing={submitNewGroup}
                        label="Group Name"/>
                    <TextInput
                        style={global.textInput}
                        value={groupPassword}
                        secureTextEntry={true}
                        onChangeText={(text) => {setGroupPassword(text)}}
                        onSubmitEditing={submitNewGroup}
                        label="Group Password"/>

                    <Button
                        style={global.accessBtn}
                        onPress={submitNewGroup}>
                        <Text style={global.accessBtnTxt}>Create Group</Text>
                    </Button>
                </View>
           }
        </View>
    )
}