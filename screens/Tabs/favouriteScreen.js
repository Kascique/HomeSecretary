import React, { useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from 'react-native';
import { Card, Paragraph, Button, ProgressBar, Colors, Title, FAB, Chip } from 'react-native-paper';
import MapView from 'react-native-maps';

import * as firebase from 'firebase';
import global from '../../styles/global';

export default function FavouriteScreen(){
    return(
        <View style={global.wrapper}>
            <MapView 
              style={styles.mapStyle}
              zoomEnabled={true}
              initialRegion={{
                 latitude: 13.1561864,
                 longitude: -61.2279621,
                 latitudeDelta: 0.009,
                 longitudeDelta: 0.009,
              }}>
                  <MapView.Marker
                        coordinate={{
                            latitude: 13.1561864,
                            longitude: -61.2279621,
                        }}
                        pinColor={Colors.green500}
                        title={"Anna Shopping"}
                         description={"Anna favourite shopping location"}
                        />
              </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    mapStyle: {
        width: '100%',
        height: '100%',
     }
})