import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import * as firebase from 'firebase';
import global from '../../styles/global';
import styles from '../../styles/groupStyle';
import { useSafeArea } from 'react-native-safe-area-context';

export default function CreateJob(){
    const [user, setUser] = useState('');

    firebase.auth().onAuthStateChanged((u) => {
        if(u != null){
            setUser(u);
        }
    });

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    const [eventTitle, setEventTitle] = useState('');
    const [eventDesc, setEventDesc] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventDate, setEventDate] = useState('');

    const [createEventLoading, setCreateEventLoading] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
     
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
     
      const handleConfirm = (date) => {
        setEventDate(date.toString());
        hideDatePicker();
      };


    const submitNewEvent = async () => {
      if(eventTitle == '' || eventDesc == '' || eventType == '' || eventDate == ''){
          Alert.alert(
              'Error',
              'Please full out the form and try again'
          );
      }else{
          setCreateEventLoading(true);
          let eventID = new Date().getUTCMilliseconds();

          await firebase.database().ref(`Events/${eventID}`).set({
              title: eventTitle,
              desc: eventDesc,
              type: eventType,
              date: eventDate
          }).then(() => {
            setEventTitle('');
            setEventType('');
            setEventDesc('');
            setEventDate('');

            Alert.alert(
                'Success',
                'Event was created successfully',
                {
                    text: 'OK',
                }
            )
          }).catch((error) => alert(error));
          setCreateEventLoading(false);
      }
    }

    return(
        <View style={global.wrapper}>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

           {
               createEventLoading
               ? <ActivityIndicator style={{alignSelf: 'center', marginTop: 30}} size="large"/>
               : <View style={styles.wrapper}>
                    <TextInput
                        style={global.textInput}
                        value={eventTitle}
                        onChangeText={(text) => {setEventTitle(text)}}
                        onSubmitEditing={submitNewEvent}
                        label="Job Title"/>
                    <TextInput
                        style={global.textInput}
                        value={eventType}
                        onChangeText={(text) => {setEventType(text)}}
                        onSubmitEditing={submitNewEvent}
                        label="Assigned To"/>
                    
                    <TextInput
                        style={global.textInput}
                        value={eventDate}
                        disabled={true}
                        onChangeText={(text) => {setEventDesc(text)}}
                        onSubmitEditing={submitNewEvent}
                        label="Date and Time"/>

                    <Button onPress={showDatePicker}>Select Date</Button>
  

                    <TextInput
                        style={global.textInput}
                        multiline={true}
                        label="Job description"/>
                

                    <Button
                        style={global.accessBtn}
                        onPress={() => submitNewEvent()}>
                        <Text style={global.accessBtnTxt}>Add Job</Text>
                    </Button>
                </View>
           }
        </View>
    )
}
