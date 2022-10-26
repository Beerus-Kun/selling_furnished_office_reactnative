import { Dimensions, StyleSheet } from "react-native";
import color from "../public/color";

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#DFDFDF'
  },
  checkoutButton: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: '#2ABB9C',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkoutButton1: {
    height: 50,
    margin: 10,
    marginTop: 0,
    backgroundColor: color.darkGray,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  main: {
    width, backgroundColor: '#DFDFDF'
  },
  checkoutTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium'
  },
  productStyle: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    shadowColor: '#3B5458',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2
  },
  productImage: {
    width: imageWidth,
    height: imageHeight,
    flex: 1,
    resizeMode: 'center'
  },
  mainRight: {
    flex: 3,
    justifyContent: 'space-between'
  },
  productController: {
    flexDirection: 'row'
  },
  numberOfProduct: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  txtName: {
    paddingLeft: 20,
    color: '#A7A7A7',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'sans-serif-medium'
  },
  txtPrice: {
    paddingLeft: 20,
    color: '#C21C70',
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'sans-serif-medium'
  },
  txtShowDetail: {
    color: '#C21C70',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: 'sans-serif-medium',
    textAlign: 'right',
  },
  showDetailContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#969696',
    width: 25,
    height: 25,
    // margin: 10
    // right: 15
  },
  buttonDeleteContainer: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#969696',
    width: 25,
    height: 25,
    // margin: 10
    right: 15
  },
  txtQuantity:{
    alignItems: 'center',
    justifyContent: 'center'
  }
});