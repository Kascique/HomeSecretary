import React, { useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, Modal, SafeAreaView, Alert } from 'react-native';
import { Card, Paragraph, Button, ProgressBar, IconButton, Colors, Title, FAB, Chip, Appbar, TextInput } from 'react-native-paper';

import * as firebase from 'firebase';
import global from '../../styles/global';

export default function ToDoScreen(){

    const [isModalVisiable, setisModalVisiable] = useState(false);

    const [newToDo, setNewToDo] = useState('')

    const [toDo, settoDo] = useState([
        { title: 'Wash the dishes', key: 1}
     ]);

    const openModal = () => {
        setisModalVisiable(true);
    }

    const closeModal = () => {
        setisModalVisiable(false);
    }

    const submitNewToD = () => {
        if(newToDo == ''){
            Alert.alert(
                'Error',
                'Please fill out the form and try again'
            );
        }else{
            var newID = new Date().getUTCMilliseconds();
            settoDo([
                ...toDo,
                { title: newToDo, key: newID}
            ]);
            
            // toDo.push(
            //     { title: newToDo, key: newID}
            // );
            Alert.alert(
                'Success',
                'New to do have been posted successfully'
            );
            setNewToDo('');
            console.log(toDo);
        }
    }

    return(
        <View style={global.wrapper}>
            <Modal
               animationType={'slide'}
               visible={isModalVisiable}>
                <SafeAreaView style={{flex: 1}}>
                    <Appbar>
                        <Appbar.BackAction onPress={() => closeModal()}/>
                        <Appbar.Content title="Add To Do"/>
                    </Appbar>
                    <View style={{...styles.wrapper, ...{marginTop: 20, alignItems: 'center'}}}>
                        <TextInput 
                            style={global.textInput}
                            label="Enter New To Do"
                            value={newToDo}
                            onSubmitEditing={submitNewToD}
                            onChangeText={(newToDo) => setNewToDo(newToDo)}/>
                        <Button 
                            style={global.accessBtn}
                            onPress={submitNewToD}>
                            <Text style={global.accessBtnTxt}>Submit</Text>
                        </Button>
                    </View>
                </SafeAreaView>
            </Modal>

            <View style={styles.wrapper}>
                <Title style={{marginLeft: 10, marginTop: 10}}>To Do</Title>
                <FlatList 
                  data={toDo}
                  renderItem={({ item }) => (
                        <View style={styles.toDoCon}>
                            <Title style={styles.toDoTxt}> { item.title }</Title>
                            <IconButton 
                                icon="close"
                                size={25}
                                // onPress={() => deleteToDo(item.key)}
                                />
                        </View>
                  )}/>
            </View>
            <FAB
                style={global.fab}
                label="Add To Do"
                color="#fff"
                icon="plus"
                onPress={() => openModal()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: '100%',
        height: '100%',
     },
     wrapper: {
        flex: 1,
        width: '90%',
        height: '100%',
        alignSelf: 'center',
      },
     toDoCon: {
        width: '100%',
        height: 60,
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    toDoTxt: {
        flex: 1,
        marginLeft: 20
    },
})