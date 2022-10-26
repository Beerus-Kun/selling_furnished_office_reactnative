import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
    center: {
        justifyContent: 'center', 
        alignItems: 'center',
        // flex: 1,
        // flexShrink: 1
    },
    initSection: {
        paddingTop: Constants.statusBarHeight + 5,
        marginBottom: 100
    },
    twoSide:{
        flexDirection: 'row',
        alignContent: 'center',
        padding: 5,
        justifyContent: 'space-between'
    },
    paddingHorizontal:{
        paddingHorizontal:5
    },
    paddingVertical:{
        paddingVertical:5
    },
    paddingTop:{
        paddingTop: 5
    },
    paddingBottom:{
        paddingBottom: 5
    }
})