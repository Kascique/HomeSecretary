import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Modal, Dimensions } from 'react-native';
import { Appbar, TextInput, Card, Paragraph, Button, ProgressBar, Colors, Title, FAB, Chip } from 'react-native-paper';
import MapView from 'react-native-maps';
import MapPicker from "react-native-map-picker";

import * as firebase from 'firebase';
import global from '../../styles/global';

export default function FavouriteScreen(){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const defaultPosition = {
        lat: 13.1561864,
        lng: -61.2279621
      };

    const [mapTitle, setMapTitle] = useState('');
    const [mapDesc, setMapDesc] = useState('');

    const [markers, setmarkers] = useState([
        { title: 'Anna Shopping', desc: 'Anna favourite shopping location', lat: 13.1561864, lng: -61.2279621}
    ]);
      
    const [setBtn, setSetBtn] = useState('Confirm');

    const addLocation = (lat, lng) => {
        if(mapTitle == '' || mapDesc == ''){
            alert('Please full out form');
            return;
        }else{
            setmarkers([...markers,                 
                { title: mapTitle, desc: mapDesc, lat: lat, lng: lng},  
            ]);
            alert('Location added successfully');
            setMapTitle('');
            setMapDesc('');
            console.log(markers);
            return;
        }
    }

    return(
        <View style={global.wrapper}>

            <Modal
               animationType={'slide'}
               visible={isModalVisible}>
                <SafeAreaView style={styles.safeArea}>
                    <Appbar>
                        <Appbar.BackAction onPress={() => setIsModalVisible(false)}/>
                        <Appbar.Content title="Add Place"/>
                    </Appbar>
                    <View style={{...styles.wrapper, ...{marginTop: 20, alignItems: 'center'}}}>
                        
                        <View style={styles.locationDetails}>
                            <TextInput 
                                style={{...global.textInput, ...styles.textInput}}
                                label="Location Title"
                                value={mapTitle}
                                onChangeText={(text) => setMapTitle(text)}
                                />
                            <TextInput 
                                style={{...global.textInput, ...styles.textInput}}
                                label="Location Description"
                                value={mapDesc}
                                onChangeText={(text) => setMapDesc(text)}
                                />
                        </View>

                        <MapPicker
                            initialCoordinate={{
                                latitude: defaultPosition.lat,
                                longitude: defaultPosition.lng,
                            }}
                            buttonText={setBtn}
                            style={styles.mapPickerStyle}
                            buttonStyle={styles.btn}
                            textStyle={global.accessBtnTxt}
                            onLocationSelect={({latitude, longitude}) => {
                                addLocation(latitude, longitude);
                            }}
                            />
                    </View>
                </SafeAreaView>
            </Modal>

            <MapView 
              style={styles.mapStyle}
              zoomEnabled={true}
              initialRegion={{
                 latitude: 13.1561864,
                 longitude: -61.2279621,
                 latitudeDelta: 0.009,
                 longitudeDelta: 0.009,
              }}>

                  {
                      markers.map(marker => (
                        <MapView.Marker
                            coordinate={{
                                latitude: marker.lat,
                                longitude: marker.lng,
                            }}
                            pinColor={Colors.cyan300}
                            title={marker.title}
                                description={marker.desc}
                            />
                      ))
                  }
              </MapView>
              <FAB
                style={global.fab}
                label="Add Location"
                color="#fff"
                icon="plus"
                onPress={() => setIsModalVisible(true)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },
    locationDetails: {
       width: '95%',
       height: 145,
       position: 'absolute',
       backgroundColor: '#fff',
       top: 10,
       left: 0,
       zIndex: 10,
       alignSelf: 'center',
       marginLeft: 10,
       marginRight: 10,
       borderRadius: 10,
       overflow: 'hidden'
    },
    textInput: {
        width: '96%', alignSelf: 'center',
    },
    mapStyle: {
        width: '100%',
        height: '100%',
     },
     mapPickerStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
     },
     mapBtn: {
        height: 50, 
        width: 220, 
        alignSelf: 'center', 
        borderRadius: 10,
        backgroundColor: '#2e7bff',
        position: 'absolute',
        bottom: 50,
     },
     btn: {
        height: 50, 
        width: 200, 
        borderRadius: 10,
        backgroundColor: '#4ECDC4',
        
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