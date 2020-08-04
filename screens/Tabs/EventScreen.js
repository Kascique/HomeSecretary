import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { Card, Paragraph, Button, ProgressBar, Colors, Title, FAB } from 'react-native-paper';

import * as firebase from 'firebase';
import global from '../../styles/global';

export default function EventScreen({ navigation }){
    const events = [
        { title: 'Welcome', assigned: 'Kascique', details: 'Nothing much', progress: .4, key: 1},
        { title: 'Welcome', assigned: 'Kascique', details: 'Nothing much', progress: .4, key: 2}
    ];
    const [eventLoading, seteventLoading] = useState(false);

    return(
        <View style={global.wrapper}>
            <View style={styles.wrapper}>
                <Title style={{marginLeft: 10, marginTop: 10}}>Events</Title>
                {
                    eventLoading
                    ? <ActivityIndicator style={{marginTop: 40}} size="large"/>
                    : <FlatList 
                        data={events}
                        renderItem={({ item }) => (
                                <Card style={styles.container}>
                                    <Card.Title title={item.title} subtitle={'Created By '+item.assigned} />
                                    <Card.Content>
                                        <Paragraph>{ item.details }</Paragraph>
                                    </Card.Content>
                                </Card>
                        )}/>
                }
            </View>
            <FAB
                style={global.fab}
                label="Create Group"
                color="#fff"
                icon="plus"
                onPress={() => navigation.navigate('CreateEvent')}/>
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