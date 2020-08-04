import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Modal, SafeAreaView, Alert, FlatList, TouchableWithoutFeedback, Group } from 'react-native';
import { Appbar, FAB, TextInput, Button, Card, Title } from 'react-native-paper';

import * as firebase from 'firebase';

import global from '../styles/global';

export default function Groups({ navigation }){
    
    const [user, setUser] = useState('');

    firebase.auth().onAuthStateChanged((u) => {
        if(u != null){
            setUser(u);
        }
    });

    const [groupLoading, setGroupLoading] = useState(false);

    let groups = [
             {
              "id": 0,
              "key": 0,
              "name": "Default Group",
            },
    ];

    const getGroups = async () => {
        await firebase.database().ref(`Groups`).on('value', (snapshot) => {
            const data = snapshot.val();
            const uid = user.uid;
            if(data == null){
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                console.log('data is null');
            }else{
                try{
                    const dataArray = Object.values(data);
                        
                    for(let i = 0; i < dataArray.length; i++){
                        const members = dataArray[i].Members;
                        const memberArray = Object.values(members);

                        for(let c = 0; c < memberArray.length; c++){
                            const userID = Object.values(memberArray[c])[2];
                            const key = Object.values(memberArray[c])[1];
                                                          
                           if(userID == user.uid){
                               console.log('member');
                               groups.push(
                                 { id: key, name: dataArray[i].name, key: key}
                               );
                           }
                           console.log('###########################################################');
                           console.log(groups);
                        }
                    }

                }catch(error){ 
                   // console.log('###########################################################');
                    console.log(error);
                }
               //(false);
            }
        });
    }

    useEffect(() => {
       getGroups();
    });

    return(
        <View style={global.wrapper}>

            <View style={global.container}>
                 <Button
                     style={{...global.accessBtn, ...{alignSelf: 'center'}}}
                     onPress={() => {navigation.navigate('JoinGroup')}}>
                    <Text style={global.accessBtnTxt}>Join New Group</Text>
                 </Button>
                 
                {
                    groupLoading
                    ? groups 
                      ? <Title style={{marginTop: 30, alignSelf: 'center'}}>You're not a mamber of a group</Title>
                      : <ActivityIndicator style={{marginTop: 40}} size="large"/>
                    : <FlatList
                        data={groups}
                        renderItem={({ item }) => (
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('Group', { groupID: item.id, name: item.name})}>
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
              onPress={() => { navigation.navigate('AddGroup') } }/>
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
