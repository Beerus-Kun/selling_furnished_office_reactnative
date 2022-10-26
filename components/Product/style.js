import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
const swiperWidth = (width) - 60;
const swiperHeight = (swiperWidth *1.5 );
import color from "../public/color";

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#D6D6D6',
    },
    cardStyle: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 20
    },
    cartStyle: {
        width: 25,
        height: 25
    },
    backStyle: {
        width: 25,
        height: 25
    },
    productStyle: {
        width: width / 2,
        height: width / 2
    },
    imageContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingTop: 20,
        width: swiperWidth,
    },
    textMain: {
        paddingLeft: 20,
        marginVertical: 10,
    },
    textInformation: {
        paddingLeft: 20
    },
    textBlack: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fe0204'
    },
    txtQuantity:{
        alignItems: 'center',
        justifyContent: 'center'
      },
    buttonContainer1: {
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#969696',
        width: 25,
        height: 25,
        // margin: 10
        // right: 15
      },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30
      },
    textSmoke: {
        fontSize: 20,
        color: 'black'
    },
    textHighlight: {
        fontSize: 20,
        color: '#7D59C8',
        fontWeight: 'bold'
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderColor: '#F6F6F6',
        marginHorizontal: 20,
        paddingBottom: 5
    },
    informationContainer: {
        borderTopWidth: 1,
        borderColor: '#F6F6F6',
        marginHorizontal: 20,
        paddingBottom: 5,
        paddingTop: 10
    },
    descContainer: {
        margin: 10,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    descStyle: {
        color: '#AFAFAF'
    },
    linkStyle: {
        color: '#7D59C8'
    },
    productImageStyle: {
        width: swiperWidth,
        height: swiperHeight,
        marginHorizontal: 5
    },
    mainRight: {
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingLeft: 20
    },
    txtColor: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
    },
    txtMaterial: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigButton: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        width: 300,
        borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        top: 20,
        backgroundColor: '#6fddaa'
    },
    buttonText: {
        fontFamily: 'sans-serif-medium',
        color: '#0b8a02',
        fontWeight: '400',
        fontSize: 20
    },
    reciever: {
        padding: 15,
        
        backgroundColor: '#add8e6',
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        // maxWidth: '80%',
        position: 'relative',
      },
      recieverText: {
        color: 'black',
        fontWeight: '500',
        marginBottom: 15,
      },
      recieverTitle: {
        // color: 'white',
        // fontWeight: '500',
        fontWeight:'bold',
        marginLeft: 10,
        // marginBottom: 15,
        fontSize: 18
      },
      senderTitle: {
        // color: 'white',
        // fontWeight: '500',
        fontWeight:'bold',
        marginLeft: 10,
        // marginBottom: 15,
        fontSize: 18
      },
      senderText: {
        // color: 'white',
        fontWeight: '500',
        marginLeft: 10,
        marginBottom: 15,
      },
      sender: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-start',
        borderRadius: 20,
        margin: 15,
        // maxWidth: '80%',
        position: 'relative',
      },
    empty: {
        padding: 50
    }
});