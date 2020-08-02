import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TextBase } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

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
        <View>
            <Text>Members</Text>
        </View>
    )
}

function ToDoScreen(){
    return(
        <View>
            <Text>ToDo</Text>
        </View>
    )
}

function JobsScreen(){
    return(
        <View>
            <Text>Jobs</Text>
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