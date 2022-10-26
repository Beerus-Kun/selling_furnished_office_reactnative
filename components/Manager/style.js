import { StyleSheet, Dimensions } from "react-native";
import Constants from 'expo-constants';
// import global from "../../global";
import color from "../public/color";

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
    scrollSection: {
        // backgroundColor: global.lightColor
    },
    mainSection: {
        paddingTop: Constants.statusBarHeight + 5
    },
    userSection: {
        flexDirection: 'row',
        alignContent: 'center',
        padding: 10,
        justifyContent: 'center'
    },
    avatar: {
        borderColor: color.midGreen,
        borderWidth: 4,
        overflow: 'hidden'
    },
    profile: {
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: width / 19
    },
    textName: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'serif',
    },
    textChange: {
        fontStyle: 'italic',
    },
    topicSection: {
        // flexDirection: 'row',
        paddingTop: height / 30,
        paddingLeft: width / 15
    },
    topicText: {
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
    },
    contentSection: {
        flexDirection: 'row',
        marginLeft: width / 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        paddingVertical: 15,
        borderBottomWidth: 0.2,
        width: width * 0.8,
                
    },
    contentText: {
        fontSize: 15,
        // fontWeight: 'bold',
        // fontFamily: 'sans-serif-medium',
    },
    contentIcon: {
        right: 0
    }
})