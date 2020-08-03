
import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Modal, SafeAreaView, Alert, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Appbar, FAB, TextInput, Button, Card, Title } from 'react-native-paper';

import * as firebase from 'firebase';

import global from '../styles/global';

class Groups extends Component{
    state = {
        user: '',
        createGroupLoading: false,
        groupLoading: true,
        isModalVisible: false,
        isJoinModalVisible: false,

        groupName: '',
        groupPassword: '',

        joinID: '',
        joinPassword: '',

        groups: [],

        groupName: '',
        groupPassword: '',

        joinID: '',
        joinPassword: '',

    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((u)=>{
            if(u != null){
                this.setState({ 
                    user: u
                }, ()=> {
                    this.getGroups();
                })
            }
        });
    }

    getGroups = async () => {
       await firebase.database().ref(`Groups`).on('value', (snapshot) => {
        const data = snapshot.val();
        const uid = this.state.user.uid;
        
        if(data == null){

        }else{
            try{
                const dataArray = Object.values(data);
                for(let i = 0; i < dataArray.length; i++){
                    const members = dataArray[i].Members;
                    const memberArray = Object.values(members);
                    

                    for(let c = 0; c < memberArray.length; c++){
                        const userID = Object.values(memberArray[c])[2];
                        const key = Object.values(memberArray[c])[1];
                        // console.log('UserID '+userID+' key '+key);

                        // console.log(userID);
                        // console.log(this.state.user.uid);
    
                        if(userID == this.state.user.uid){
                            console.log('member');
                            this.state.groups.push(
                                { id: key, name: dataArray[i].name, key: key}
                            )
                        }
                    }
                }
                this.setState({
                    groupLoading: false
                })

                
            }catch(error){ 
                this.setState({ groupLoading: false });
                console.log(error);
            }
        }
       });
    }

    renderMain(){
        if(this.state.groupLoading){
            return <ActivityIndicator style={{marginTop: 40}} size="large"/>
        }else{
            return <FlatList
                    data={this.state.groups}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback onPress={() => console.log('card')}>
                            <Card style={styles.groupCon}>
                                <Card.Title title={item.name}/>
                                <Card.Content>
                                    <Title>{item.id}</Title>
                                </Card.Content>
                            </Card>
                        </TouchableWithoutFeedback>
                    ) }/>;
        }
    }

    openJoinModal = () => {
        this.setState({
            isJoinModalVisible: true
        })
    }

    closeJoinModal = () => {
        this.setState({
            isJoinModalVisible: false
        })
    }

    openModal = () => {
        this.setState({
            isModalVisible: true
        })
    }

    closeModal = () => {
        this.setState({
            isModalVisible: false
        })
    }

    submitNewGroup = async () => {
       if(this.state.groupName == '' || this.state.groupPassword == ''){
            Alert.alert(
                'Error',
                'Please full out the form and try again'
            );
       }else{
         const groupID = new Date().getUTCMilliseconds();
         const groupIdString = groupID.toString();

         this.setState({ createGroupLoading: true });
          console.log(groupID);
         await firebase.database().ref(`Groups/${groupIdString}`).set({
             name: this.state.groupName,
             password: this.state.groupPassword,
             groupID: groupIdString
         }).then(() => {
            const currDate = new Date();

            firebase.database().ref(`Groups/${groupIdString}/Members/${this.state.user.uid}`).set({
                userID: this.state.user.uid,
                key: groupIdString,
                joined: currDate.toString()
            }).then(() => {
                this.setState({ createGroupLoading: false });
                Alert.alert(
                    'Success',
                    `Group have been created successfully, you can share the group ID and password with users you would like to join the group`,
                );
            }).catch((error) => {
                alert(`${error}`);
            });
         }).catch((error) => {
             alert(`${error}`);
         })
       }
    }

    render(){
        return(
            <View style={global.wrapper}>
                <Modal 
                  animationType={'slide'}
                  visible={this.state.isJoinModalVisible}>
                    <SafeAreaView>
                        <Appbar>
                            <Appbar.BackAction onPress={this.closeJoinModal}/>
                            <Appbar.Content title="Join New Group"/>
                        </Appbar>
                    </SafeAreaView>
                    <View style={styles.wrapper}>

                    </View>

                </Modal>

                <Modal 
                  animationType={'slide'}
                  visible={this.state.isModalVisible}>
                    <SafeAreaView>
                        <Appbar>
                            <Appbar.BackAction onPress={this.closeModal}/>
                            <Appbar.Content title="Create Group"/>
                        </Appbar>
                    </SafeAreaView>
                    {
                        this.state.createGroupLoading
                        ? <View style={styles.wrapper}>
                             <ActivityIndicator style={{marginTop: 20}} size="large"/>
                          </View>
                        : <View style={styles.wrapper}>
                            <TextInput
                                label="Group Name"
                                style={global.textInput}
                                value={this.state.groupName}
                                onChangeText={(text) => this.setState({groupName: text}) }
                                onSubmitEditing={this.submitNewGroup} />
                            <TextInput
                                label="Group Password"
                                style={global.textInput}
                                value={this.state.groupPassword}
                                secureTextEntry={true}
                                onChangeText={(text) => this.setState({groupPassword: text}) }
                                onSubmitEditing={this.submitNewGroup} />
                            <Button
                                style={global.accessBtn}
                                onPress={this.submitNewGroup}>
                                <Text style={global.accessBtnTxt}>Create Group</Text>
                            </Button>
                        </View>
                    }

                </Modal>

                 <View style={global.container}>
                    <Button
                        style={{...global.accessBtn, ...{alignSelf: 'center'}}}
                        onPress={this.openJoinModal}>
                        <Text style={global.accessBtnTxt}>Join New Group</Text>
                    </Button>

                    { this.renderMain() }
                 </View>

                  <FAB
                    style={styles.fab}
                    label="Create Group"
                    color="#fff"
                    icon="plus"
                    onPress={this.openModal}/>
            </View>
        )
    }
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

export default Groups;
