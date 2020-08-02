import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, SafeAreaView, FlatList, Keyboard, Alert, ActivityIndicator } from 'react-native';
import { Appbar,Title, Paragraph, Card, Avatar, IconButton, Button, FAB, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import * as firebase from 'firebase';

import global from '../styles/global';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function EventsScreen(){
    return(
        <View style={global.wrapper}>
           <Calendar
                markingType={'period'}
                markedDates={{
                    '2020-08-15': {marked: true, dotColor: '#50cebb'},
                    '2012-05-16': {marked: true, dotColor: '#50cebb'},
                    '2012-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
                    '2012-05-22': {color: '#70d7c7', textColor: 'white'},
                    '2012-05-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
                    '2012-05-24': {color: '#70d7c7', textColor: 'white'},
                    '2012-05-25': {endingDay: true, color: '#50cebb', textColor: 'white'},
                }}
            />
        </View>
    )
}

function MembersScreen(){
    return(
        <View style={global.wrapper}>
            <View style={styles.wrapper}>
               <Title>Members</Title>
               <View style={styles.member}>
                  <View style={styles.memberCon}>
                     <Avatar.Image size={70} source={{ uri: 'https://image.freepik.com/free-photo/boy-taking-selfie_23-2148155644.jpg'}}/>
                     <View style={styles.memberMid}>
                         <Title style={{fontSize: 20}}>John Doe</Title>
                         <Text>John.Doe@gmail.com</Text>
                     </View>
                     <MaterialCommunityIcons style={styles.memberIcon} name="account-edit" size={40}/>
                  </View>
               </View>
            </View>
        </View>
    )
}

function ToDoScreen(){
     const [isModalVisible, setisModalVisible] = useState(false);

     const [newToDo, setNewToDo] = useState('');

    //  const [toDo, setToDo] = useState([]);

     let toDo = [];

     const [toDoList, setToDoList] = useState(null)

     const [loading, setloading] = useState(true)

     const [user, setUser] = useState('');

     useEffect(() => {
         (async () => {
            getToDo();
         })();
     });

     firebase.auth().onAuthStateChanged((u) => {
        if (u != null) {
          setUser(u);
         // console.log(u);
        }
      });

     const closeModal = () => {
         setisModalVisible(false);
     }

     const getToDo = async () => {
         
         await firebase.database().ref(user.uid+'/ToDo/').on('value', (snapshot) => {
             const test = snapshot.val();
             toDo.pop();
             //  console.log('ToDo listing '+ JSON.stringify(test));
             try{
                const testArray = Object.values(test);
                console.log('Array '+testArray[0].key);  
                for(let i = 0; i < testArray.length; i++){
                    toDo.push(testArray[i]);
                }
                 setloading(false);            
             }catch(error){ console.log(error) }       
         });
     }

     const deleteToDo = async (deleteID) => {
       let removedToDo = firebase.database().ref(user.uid+'/ToDo/'+deleteID);
       removedToDo.remove();
     }

     const submitToDo = async () => {
         Keyboard.dismiss();
         if(newToDo == ''){
             alert('Please enter To Do Info');
         }else{
            // console.log(user.uid);
             var newID = new Date().getUTCMilliseconds();
             setNewToDo('');
              await firebase.database().ref(user.uid+'/ToDo/'+newID).set({
                  text: newToDo,
                  key: newID
              }).then(() => {
                  Alert.alert(
                      'Success',
                      'To Do added successfully, do you want to add more?',
                      [
                          {
                              text: 'YES'
                          },
                          {
                              text: 'NO',
                              onPress: closeModal
                          }
                      ]
                  )
              }).catch((error) => {
                  alert(`${error}`);
              });
         }
     }
    return(
        <View style={{...global.wrapper, ...{backgroundColor: '#fff'}}}>
            
            <Modal
               animationType={'slide'}
               visible={isModalVisible}
               onRequestClose={() => {
                   console.log('Modal Close')
               }}>
                <SafeAreaView>
                            <Appbar>
                            <Appbar.BackAction onPress={closeModal}/>
                            <Appbar.Content title="Create To Do"/>
                            </Appbar>
                            <View style={{...styles.wrapper, ...{marginTop: 20, alignItems: 'center'}}}>
                                <TextInput 
                                    style={global.textInput}
                                    label="Enter New To Do"
                                    value={newToDo}
                                    onSubmitEditing={submitToDo}
                                    onChangeText={(newToDo) => setNewToDo(newToDo)}/>
                                <Button 
                                  style={global.accessBtn}
                                  onPress={submitToDo}>
                                   <Text style={global.accessBtnTxt}>Submit</Text>
                                </Button>
                            </View>
                    </SafeAreaView>
             </Modal>

             <View style={{...styles.wrapper, ...{flex: 1}}}>
                <Title>To Do</Title>

                {
                    loading 
                    ? <ActivityIndicator size="large"/>
                    :  <FlatList 
                            data={toDo}
                            renderItem={({ item }) => (  
                                    <View style={styles.toDoCon}>
                                        <Title style={styles.toDoTxt}>{ item.text }</Title>
                                        <IconButton 
                                            icon="close"
                                            size={25}
                                            onPress={() => deleteToDo(item.key)}
                                            />
                                    </View>
                            )}/>
                }

             </View>

            <FAB 
               style={styles.fab}
               label="Create"
               color="#fff"
               expanded
               icon="plus"
               onPress={() => setisModalVisible(true)}/>
        </View>
    )
}

function JobsScreen(){
    return(
        <View style={global.wrapper}>
            <View style={styles.wrapper}>
               <Title>Jobs</Title>
               <Card>
                   <Card.Content>
                       <Title>Card Title</Title>
                       <Paragraph>Card COntent</Paragraph>
                   </Card.Content>
                   <Card.Actions>
                       <View style={styles.jobFooter}>
                           <View style={styles.jobLeft}>
                               <Button>1/4</Button>
                               <Button>IN PROGRESS</Button>
                           </View>
                           <View style={styles.jobRight}>
                               <Button>Accept Task</Button>
                           </View>
                       </View>
                   </Card.Actions>
               </Card>
            </View>
        </View>
    )
}

export default function User({ navigation }){
    const Tab = createMaterialBottomTabNavigator();

    return(
            <View style={{...global.container, ...{backgroundColor: '#fff'}}}>
                    <Tab.Navigator
                        initialRouteName="Home"
                        activeColor="#fff"
                        inactiveColor="#222"
                        barStyle={{
                            size: 100
                        }}
                        tabBarOptions={{
                            activeTintColor: '#42f44b',
                        }}
                        barStyle={{ backgroundColor: '#4ECDC4' }}>
                        <Tab.Screen 
                           name="Events" 
                           component={EventsScreen}
                           options={{
                               tabBarIcon: ({ color }) => (
                                 <MaterialCommunityIcons name="calendar" color={color} size={26}/>
                               )
                           }}/>
                        <Tab.Screen 
                           name="Members" 
                           component={MembersScreen}
                           options={{
                               tabBarIcon: ({ color }) => (
                                 <MaterialCommunityIcons name="account-group" color={color} size={26}/>
                               )
                           }}/>
                        <Tab.Screen 
                           name="ToDo" 
                           component={ToDoScreen}
                           options={{
                               tabBarLabel: "To Do",
                               tabBarIcon: ({ color }) => (
                                 <MaterialCommunityIcons name="format-list-checks" color={color} size={26}/>
                               )
                           }}/>
                        <Tab.Screen 
                           name="Jobs" 
                           component={JobsScreen}
                           options={{
                               tabBarIcon: ({ color }) => (
                                 <MaterialCommunityIcons name="checkbox-marked-outline" color={color} size={26}/>
                               )
                           }}/>
                    </Tab.Navigator>
            </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        width: '90%',
        alignSelf: 'center'
    },
    member: {
       width: '100%',
       height: 100,
       backgroundColor: '#F7F7F7',
       borderRadius: 20,
       marginTop: 10,
       justifyContent: 'center',
    },
    memberCon: {
        width: '96%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    memberMid: {
        flex: 1,
        marginLeft: 10,
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingBottom: 10
    },
    memberIcon: {
        color: '#DBDBDB',
        marginRight: 10
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

    jobFooter: {
        flexDirection: 'row',
        alignContent: 'space-between'
    },
    jobLeft: {
        alignSelf: 'flex-start'
    },
    jobRight: {
        alignSelf: 'flex-end'
    },
    fab: {
        backgroundColor: "#4ECDC4",
        position: 'absolute',
        alignSelf: 'center',
        margin: 16,
        bottom: 0,
    }
})