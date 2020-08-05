import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, FlatList, Modal } from 'react-native';
import { Appbar, TextInput, Card, Paragraph, Button, ProgressBar, Colors, Title, FAB, Chip } from 'react-native-paper';
import MapView from 'react-native-maps';
import MapPicker from 'react-location-picker';

import * as firebase from 'firebase';
import global from '../../styles/global';

export default function FavouriteScreen(){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const defaultPosition = {
        lat: 13.1561864,
        lng: -61.2279621
      };
      
    return(
        <View style={global.wrapper}>

            <Modal
               animationType={'slide'}
               visible={isModalVisible}>
                <SafeAreaView style={{flex: 1}}>
                    <Appbar>
                        <Appbar.BackAction onPress={() => setIsModalVisible(false)}/>
                        <Appbar.Content title="Add Place"/>
                    </Appbar>
                    <View style={{...styles.wrapper, ...{marginTop: 20, alignItems: 'center'}}}>
                        <TextInput 
                            style={global.textInput}
                            label="Location Title"
                            // value={newToDo}
                            // onSubmitEditing={submitNewToD}
                            // onChangeText={(newToDo) => setNewToDo(newToDo)}
                            />
                        <TextInput 
                            style={global.textInput}
                            label="Location"
                            // value={newToDo}
                            // onSubmitEditing={submitNewToD}
                            // onChangeText={(newToDo) => setNewToDo(newToDo)}
                            />

                        <Button 
                            style={global.accessBtn}
                            // onPress={submitNewToD}
                            >
                            <Text style={global.accessBtnTxt}>Submit</Text>
                        </Button>
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
    mapStyle: {
        width: '100%',
        height: '100%',
     },
     mapPickerStyle: {
        width: '100%',
        height: 200,
     },
     btn: {
        height: 50, 
        width: 220, 
        alignSelf: 'center', 
        borderRadius: 10,
        backgroundColor: '#2e7bff',
        // position: 'absolute',
        // bottom: 10,
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