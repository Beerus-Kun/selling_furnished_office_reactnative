import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Modal, Alert, ActivityIndicator, RefreshControl } from 'react-native';
// import Global from '../../../Global';
import _function from '../public/function';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useDispatch, useSelector } from "react-redux";

export default function ManagerDetailBill({ navigation, route }) {
    const [data, setData] = useState([])
    const info = route.params.info
    const token = useSelector((state) => state.account.token)

    const {
        checkoutButton, checkoutTitle, wrapperProduct, inputStyle, textTitle,
        textBlack, textInformation, textSmoke, textHighlight, wrapperContent,
    } = styles;


    const getData = async () => {

        const res = await _function.getAPI(`bill/historyP2?id=${info.id_bill}`, token)
        if (res.code == 200) {
            for (var item of res.data) {
                item.image = item.image.split(',')
            }
            setData(res.data)
            // console.log(res.data)
        }
    }

    useEffect(() => {
        getData()
        // cancel()
    }, [])

    return (
        <View>
            <ScrollView >
                <View style={wrapperContent} >
                    <View>
                        <Text style={textBlack} > Đơn hàng</Text>
                        <View flexDirection='row' >
                            <Text style={textHighlight} >Mã số đơn: </Text>
                            <Text style={textSmoke} > {info.id_bill} </Text>
                        </View>
                        <View flexDirection='row' >
                            <Text style={textHighlight} >Người nhận: </Text>
                            <Text style={textSmoke} > {info.name} </Text>
                        </View>
                        <View flexDirection='row' >
                            <Text style={textHighlight} >Địa chỉ nhận: </Text>
                            <Text style={textSmoke} > {info.address} </Text>
                        </View>
                        <View flexDirection='row' >
                            <Text style={textHighlight} >Trạng thái: </Text>
                            <Text style={textSmoke} > {_function.getStatus(info.id_status)} </Text>
                        </View>
                        <View flexDirection='row' >
                            <Text style={textHighlight} >Ngày đặt: </Text>
                            <Text style={textSmoke} > {info.date} </Text>
                        </View>
                        <View flexDirection='row' >
                            <Text style={textHighlight} >Giờ đặt: </Text>
                            <Text style={textSmoke} > {info.time} </Text>
                        </View>
                        <View flexDirection='row' >
                            <Text style={textHighlight} >Giá tiền: </Text>
                            <Text style={textSmoke} > {_function.currencyFormat(info.total)} </Text>
                        </View>
                    </View>
                </View>

                <View style={wrapperContent} >
                    <Text style={textBlack}> Sản phẩm </Text>

                    {data.map(item => (
                        <View style={wrapperProduct} key={item.name} >
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                                <Image source={{ uri: item.image[0] }}
                                    style={{ width: 130, height: 90 }}
                                />
                                <View>
                                    <Text style={textTitle} >Tên sản phẩm: </Text>
                                    <Text style={textInformation} > {item.name} </Text>

                                    <Text style={textTitle} >Số lượng: </Text>
                                    <Text style={textInformation} >{item.quantity} sản phẩm</Text>

                                    <Text style={textTitle} >Tổng giá trị sản phẩm: </Text>
                                    <Text style={textInformation} >{_function.currencyFormat(item.price)}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>

        </View>
    )
}

const { width, height } = Dimensions.get('window');
const swiperWidth = (width) - 60;
const swiperHeight = (swiperWidth * 1.2) / 2;

const styles = StyleSheet.create({
    textBlack: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fe0204',
        margin: 10
    },
    textSmoke: {
        fontSize: 20,
        color: 'black',
        // textAlign: 'justify',
        maxWidth: width * 0.62
    },
    textHighlight: {
        fontSize: 20,
        color: '#cd6001',
        fontWeight: 'bold',
        width: width * 0.3
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
        width: width * 0.6
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
        backgroundColor: '#ff7802',
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        // marginBottom: 0,
        textAlign: "center",
        fontSize: 20,
        fontWeight: '800',
        color: 'green'
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#01a14b',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 15
    },
    modalButtonText: {
        color: '#fff',
    },
});
