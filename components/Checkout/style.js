import { Dimensions, StyleSheet } from "react-native";
import color from "../public/color";

const { width, height } = Dimensions.get('window');
const swiperWidth = (width) - 60;
const swiperHeight = (swiperWidth * 1.2) / 2;

export default StyleSheet.create({
    textBlack: {
        fontSize: 25,
        fontWeight: 'bold',
        color: color.darkGreen,
        margin: 10
    },
    textSmoke: {
        fontSize: 20,
        color: 'black'
    },
    textHighlight: {
        fontSize: 20,
        color: color.midGreen,
        fontWeight: 'bold'
    },
    wrapperContent: {
        // height: height * 0.33,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 5,
        padding: 10,
        paddingTop: 0
    },
    wrapperProduct: {
        backgroundColor: '#fff',
        margin: 5,
        borderRadius: 5,
        padding: 5,
        borderWidth: 0.3
    },
    inputStyle: {
        borderWidth: 0.2,
        borderRadius: 3,
        paddingRight: 10,
        paddingLeft: 5,
        width: width * 0.5
    },
    inputStyle1:{
        borderWidth: 0.2,
        borderRadius: 3,
        paddingRight: 10,
        paddingLeft: 5,
        width: width * 0.4
    },
    inputStyle2:{
        borderWidth: 0.2,
        borderRadius: 3,
        paddingRight: 10,
        paddingLeft: 5,
        width: width * 0.3
    },
    textTitle: {
        paddingLeft: 5,
        fontWeight: 'bold',
        color: '#cc0001',
        marginTop: 7
    },
    textInformation: {
        paddingLeft: 5,
        width: 200
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        backgroundColor: '#2ABB9C',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium'
    },
});