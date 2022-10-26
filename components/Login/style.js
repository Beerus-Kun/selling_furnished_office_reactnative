import { StyleSheet, Dimensions } from "react-native";
import Constants from 'expo-constants'
// import global from "../../global";
import color from "../public/color";

const {width, height} = Dimensions.get('window')

//1200, 630
const rate = width / 1200

export default StyleSheet.create({
    inputStyle: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30
    },
    bigButton: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.darkGreen,
        top: 20,
        width: width /2
    },
    loginButton:{
        alignItems: 'center',
        justifyContent: 'center',
        width: width
    },
    extraFeature:{
        // flexDirection: 'row',
        // justifyContent:'space-between',
        // width: width * 0.8,
        // height: 80
    },
    buttonText: {
        fontFamily: 'sans-serif-medium',
        color: '#fff',
        fontWeight: '400'
    },
    forgot: {
        fontStyle: 'italic',
        textAlign: 'right',
        fontWeight: '900',
        color: '#1f51b8',
        right: 5,
        textDecorationLine: 'underline',
        marginTop: 20,
        marginRight: 20
    },
    text: {
        fontFamily: 'sans-serif-medium',
        color: color.midGreen,
        fontWeight: '400',
        fontSize: 20,
        padding: 10,
        // top: 5,
        paddingTop: 5
    },
    mess: {
        color: 'red',
        padding: 10,
    },
    messContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainSection:{
        justifyContent: 'flex-end',
        // alignContent: 'flex-end',
        // height: height * 4 /5
    },
    logo:{
        width: width * 0.6,
        height: 630 * rate * 0.6,
        marginTop: Constants.statusBarHeight + 5
    },
    logoSection:{
        height: 630 * rate * 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        width: width
    }
});