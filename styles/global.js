import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({

    droidSafeArea: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    wrapper: {
        flex: 1,
    },
    container: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        backgroundColor: 'red',
    },
    accessForm: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    accessBase: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70
    },
    logo: {
        width: 250,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    textInput:{
        width: '80%',
        marginTop: 20,
        backgroundColor: '#fafafa'
    },
    helper: {
      alignSelf: 'flex-start',
      marginLeft: 30
    },
    checkContainer:{
        height: 50,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accessBtn: {
        width: '80%',
        paddingTop: 8,
        paddingBottom: 8,
        marginTop: 30,
        borderRadius: 8,
        backgroundColor: '#4ECDC4',
    }
})