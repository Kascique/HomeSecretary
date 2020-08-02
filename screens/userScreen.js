import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextBase } from 'react-native';
import { Title, Avatar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import * as firebase from 'firebase';

import global from '../styles/global';

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
    return(
        <View style={global.wrapper}>
            <View style={styles.wrapper}>
               <Title>To Do</Title>
               <View style={styles.toDoCon}>
                   <Title style={styles.toDoTxt}>Wash Dishes</Title>
                   <MaterialCommunityIcons style={styles.memberIcon} name="check" size={25}/>
               </View>
            </View>
        </View>
    )
}

function JobsScreen(){
    return(
        <View style={global.wrapper}>
            <View style={styles.wrapper}>
               <Title>Jobs</Title>
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
    },
    memberIcon: {
        color: '#DBDBDB',
        marginRight: 10
    },

    toDoCon: {
        width: '100%',
        height: 60,
        backgroundColor: 'red',
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    toDoTxt: {
        flex: 1,
        marginLeft: 20
    }
})