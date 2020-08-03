import React, { useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Modal, SafeAreaView, Alert } from 'react-native';
import { Appbar, FAB, TextInput, Button } from 'react-native-paper';

import * as firebase from 'firebase';

import global from '../styles/global';

export default function Groups(){
    
    const [user, setUser] = useState('');

    firebase.auth().onAuthStateChanged((u) => {
        if(u != null){
            setUser(u);
        }
    });

    const [createGroupLoading, setCreateGroupLoading] = useState(false);
    const [groupLoading, setGroupLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);

    const [groupName, setGroupName] = useState('');
    const [groupPassword, setGroupPassword] = useState('');

    const openModal = () => {
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    }

    const openJoinModal = () => {
        setIsJoinModalVisible(true);
    }

    const closeJoinModal = () => {
        setIsJoinModalVisible(false);
    }

    const submitJoinGroup = async () => {
    
    }

    const submitNewGroup = async () => {
       if(groupName == '' || groupPassword == ''){
           Alert.alert(
               'Error',
               'Please full out the form and try again'
           );
       }else{
           setCreateGroupLoading(true);
           let groupID = new Date().getUTCMilliseconds();
           await firebase.database().ref(`Groups/${groupID}`).set({
               name: groupName,
               password: groupPassword,
           }).then(() => {

             const currDate = new Date();
              
              firebase.database().ref(`Groups/${groupID}/Members/${user.uid}`).set({
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

            <Modal
              animationType={'slide'}
              visible={isJoinModalVisible}>
                <SafeAreaView>
                    <Appbar>
                        <Appbar.BackAction onPress={()=> closeJoinModal()}/>
                        <Appbar.Content title="Join New Group"/>
                    </Appbar>
                    <View style={styles.wrapper}>
                       <TextInput
                         style={global.textInput}
                         label="Group ID"/>
                       <TextInput
                         style={global.textInput}
                         secureTextEntry={true}
                         label="Group Password"/>
    
                       <Button
                         style={global.accessBtn}
                         onPress={submitJoinGroup}>
                         <Text style={global.accessBtnTxt}>Join</Text>
                       </Button>
                    </View>
                </SafeAreaView>
            </Modal>

            <Modal
              animationType={'slide'}
              visible={isModalVisible}>
                <SafeAreaView>
                    <Appbar>
                        <Appbar.BackAction onPress={()=> closeModal()}/>
                        <Appbar.Content title="Create Group"/>
                    </Appbar>
                    <View style={styles.wrapper}>
                       <TextInput
                         style={global.textInput}
                         value={groupName}
                         disabled={createGroupLoading}
                         onChangeText={(text) => {setGroupName(text)}}
                         onSubmitEditing={submitNewGroup}
                         label="Group Name"/>
                       <TextInput
                         style={global.textInput}
                         value={groupPassword}
                         secureTextEntry={true}
                         disabled={createGroupLoading}
                         onChangeText={(text) => {setGroupPassword(text)}}
                         onSubmitEditing={submitNewGroup}
                         label="Create group Password"/>

                       <Button
                         style={global.accessBtn}
                         onPress={submitNewGroup}
                         disabled={createGroupLoading}>
                         <Text style={global.accessBtnTxt}>Create Group</Text>
                       </Button>
                    </View>
                </SafeAreaView>
            </Modal>

            <View style={global.container}>
                 <Button
                     style={{...global.accessBtn, ...{alignSelf: 'center'}}}
                     onPress={openJoinModal}>
                    <Text style={global.accessBtnTxt}>Join New Group</Text>
                 </Button>
                {
                    groupLoading
                    ? <ActivityIndicator style={{marginTop: 40}} size="large"/>
                    : <Text>Show Groups</Text>
                }
            </View>
            <FAB
              style={styles.fab}
              label="Create Group"
              color="#fff"
              icon="plus"
              onPress={() => openModal()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    fab: {
        backgroundColor: "#4ECDC4",
        position: 'absolute',
        alignSelf: 'center',
        margin: 16,
        bottom: 30,
    }
})