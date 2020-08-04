import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { Card, Paragraph, Button, ProgressBar, Colors, Title, FAB, Chip } from 'react-native-paper';

import * as firebase from 'firebase';
import global from '../../styles/global';

export default function JobScreen({ navigation }){
    const events = [
        { title: 'Water plants', date: '11 April', assigned: 'Kascique', details: 'Water the plants in the garden', key: 0},
    ];
    const [eventLoading, seteventLoading] = useState(false);

    const getEvents = async () => {
        await firebase.database().ref('Events').on('value', (snapshot) => {
            const data = snapshot.val();
            if(data == null){
                console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
                console.log('data is null');  
            }else{
                try{
                    const dataArray = Object.values(data);
                    // console.log(dataArray[0].date);
                    for(let i = 0; i < dataArray.length; i++){
                        events.push(
                            { title: dataArray[i].title, date: dataArray[i].date, assigned: dataArray[i].assigned,  details: dataArray[i].desc, key: i+1},
                        )
                    }
                }catch(error){ console.log(error) }
            }
        })
    }

    getEvents();

    return(
        <View style={global.wrapper}>
            <View style={styles.wrapper}>
                <Title style={{marginLeft: 10, marginTop: 10}}>Assigned Tasks</Title>
                {
                    eventLoading
                    ? <ActivityIndicator style={{marginTop: 40}} size="large"/>
                    : <FlatList 
                        data={events}
                        renderItem={({ item }) => (
                                <Card style={styles.container}>
                                    <Card.Title title={item.title} subtitle={'Event assigned '+item.assigned} />
                                    <Card.Content>
                                        <Paragraph>{ item.details }</Paragraph>
                                    </Card.Content>
                                </Card>
                        )}/>
                }
            </View>
            <FAB
                style={global.fab}
                label="Create Job"
                color="#fff"
                icon="plus"
                onPress={() => navigation.navigate('CreateJob')}/>
        </View>
    )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  container: {
      width: '100%',
      alignSelf: 'center',
      borderRadius: 10,
      marginTop: 10
  }
})