import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#fff',
    },
    accessBase: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    logo: {
        width: 250,
        resizeMode: 'contain',
        alignSelf: 'center'
    }
})