import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Agenda } from 'react-native-calendars';

import * as firebase from 'firebase';
import global from '../styles/global';

import EventScreen from './Tabs/EventScreen';


function FavouriteScreen(){
    return(
        <View style={global.wrapper}>
            <Text>Favourite Screen</Text>
        </View>
    )
}

function ToDoScreen(){
    return(
        <View style={global.wrapper}>
            <Text>Todo Screen</Text>
        </View>
    )
}

function JobScreen(){
    return(
        <View style={global.wrapper}>
            <Text>Jobs Screen</Text>
        </View>
    )
}

export default function userGroup({ navigation }){
    const Tab = createMaterialBottomTabNavigator();
    return(
        <View style={global.container}>
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
                        component={EventScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="calendar" color={color} size={26}/>
                        )
                    }}/>
                    <Tab.Screen 
                        name="Favourite" 
                        component={FavouriteScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="heart" color={color} size={26}/>
                        )
                    }}/>
                    <Tab.Screen 
                        name="To Do" 
                        component={ToDoScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="format-list-checks" color={color} size={26}/>
                        )
                    }}/>
                    <Tab.Screen 
                        name="Jobs" 
                        component={JobScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="checkbox-marked-outline" color={color} size={26}/>
                        )
                    }}/>

            </Tab.Navigator>
        </View>
    )
}