import React, { useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Modal, SafeAreaView, Alert, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Appbar, FAB, TextInput, Button, Card, Title } from 'react-native-paper';

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

    const [joinID, setjoinID] = useState('');
    const [joinPassword, setjoinPassword] = useState('');

    let groups = [
       
    ];

    const getGroups = async () => {
        await firebase.database().ref(`Groups`).on('value', (snapshot) => {
            const data = snapshot.val();
            const uid = user.uid;
            try{
                const dataArray = Object.values(data);

                for(let i = 0; i < dataArray.length; i++){
                    const members = dataArray[i].Members;
                    const memberArray = Object.values(members);
                    const userID = Object.values(memberArray[0])[2];
                    const key = Object.values(memberArray[0])[1];

                    //console.log(dataArray[i].name);

                   // console.log('UserID '+userID+' key '+key);

                    if(userID == user.uid){
                       // console.log('member');
                        
                        groups.push(
                            { id: key, name: dataArray[i].name, key: key.toString()}
                        );
                    }
                }
                setGroupLoading(false);
                
            }catch(error){ 
              //  console.log(error) 
            }
        })
    }

    getGroups();

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

                   for(let i = 0; i < dataArray.length; i++){
                       const members = dataArray[i].Members;
                       const memberArray = Object.values(members);
                       const groupID = dataArray[i].groupID;
                       const groupPassword = dataArray[i].password;
                       console.log(dataArray[i].groupID);
                   }
               
                }
                catch(error){ 
                  //  console.log(error) 
                }
            })
        }
    
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
                         value={joinID}
                         label="Group ID"
                         onSubmitEditing={submitJoinGroup}
                         onChangeText={(text) => setjoinID(text)}/>
                       <TextInput
                         style={global.textInput}
                         value={joinPassword}
                         secureTextEntry={true}
                         label="Group Password"
                         onSubmitEditing={submitJoinGroup}
                         onChangeText={(text) => setjoinPassword(text)}/>
    
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
                    : <FlatList
                        data={groups}
                        renderItem={({ item }) => (
                            <TouchableWithoutFeedback onPress={()=>{console.log('card')}}>
                                <Card style={styles.groupCon}>
                                    <Card.Title title={item.name}/>
                                    <Card.Content>
                                        <Title>{item.id}</Title>
                                    </Card.Content>
                                </Card>
                            </TouchableWithoutFeedback>
                        ) }/>
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
    groupCon: {
        width: '80%',
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10
    },
    fab: {
        backgroundColor: "#4ECDC4",
        position: 'absolute',
        alignSelf: 'center',
        margin: 16,
        bottom: 30,
    }
})