import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Modal, Alert, ActivityIndicator, RefreshControl } from 'react-native';
// import Global from '../../../Global';
import _function from '../public/function';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useDispatch, useSelector } from "react-redux";

export default function DetailBill({ navigation, route }) {
    const [hasCancelButton, setHasCancelButton] = useState(false)
    const [data, setData] = useState([])
    const info = route.params.info
    // console.log(route.params.info)
    const [state, setStat] = useState()
    const token = useSelector((state) => state.account.token)
    const [showModal, setShowModal] = useState(false);
    const [score, setScore] = useState(5)
    const [name, setName] = useState('')
    const [idProduct, setIdProduct] = useState(0)

    const {
        checkoutButton, checkoutTitle, wrapperProduct, inputStyle, textTitle,
        textBlack, textInformation, textSmoke, textHighlight, wrapperContent,
    } = styles;

    const ratingCompleted = (rating) => {
        setScore(rating)
        // setShowModal(!showModal)
        // console.log(`product/rate?idProduct=${idProduct}&score=${score}&idBill=${info.id_bill}`)
    }

    const pressButtonRating = async () => {
        // setIsRating(!isRating);
        // console.log(123)
        await _function.putAPI(`product/rate?idProduct=${idProduct}&score=${score}&idBill=${info.id_bill}`, {}, 'token')
        const res = await _function.getAPI(`bill/historyP?id=${info.id_bill}`, token)
        if (res.code == 200) {
            for (var item of res.data) {
                item.image = item.image.split(',')
            }
            setData(res.data)
        }
        setShowModal(!showModal);
    }

    const getData = async () => {
        if (info.id_status == 1 || info.id_status == 2) {
            setHasCancelButton(true)
        }

        const res = await _function.getAPI(`bill/historyP?id=${info.id_bill}`, token)
        if (res.code == 200) {
            for (var item of res.data) {
                item.image = item.image.split(',')
            }
            setData(res.data)
            // console.log(res.data)
        }

        const res1 = await _function.getAPI(`bill/state?id=${info.id_bill}`, token)
        // console.log(res1)
        if(res1.code == 200){
            setStat(res1.data)
        }
    }

    const cancel = async () => {
        const res = await _function.putAPI(`bill/cancel?id=${info.id_bill}`, {}, token)
        if (res.code == 400) {
            Alert.alert(
                "Lỗi",
                "Bạn không thể hủy đơn này",
                [
                    { text: "ok" }

                ]
            );
        } else if (res.code == 200) {
            setHasCancelButton(false)
            const res1 = await _function.getAPI(`bill/state?id=${info.id_bill}`, token)
            if(res1.code == 200){
                setStat(res1.data)
            }
            // info.id_state = 0
        }
    }

    const clickCancel = () => {
        Alert.alert(
            "Thông báo",
            "Bạn có chắc chắn muốn hủy đơn này?",
            [
                { text: "không", style: 'destructive' },
                { text: "Đồng ý", onPress: () => { cancel() } }

            ]
        );
    }

    const show = (item)=>{
        setName(item.name)
        setIdProduct(item.id_product)
        setShowModal(true)
    }

    useEffect(() => {
        getData()
        // cancel()
    }, [])

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Đánh giá sản phẩm {name}</Text>
                        <AirbnbRating
                            count={5}
                            reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
                            defaultRating={5}
                            size={25}
                            onFinishRating={ratingCompleted}
                        // isDisabled={isRating}
                        />
                        <TouchableOpacity onPress={pressButtonRating}>
                            <View style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>GỬI ĐÁNH GIÁ</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
            <ScrollView style={{ height: height * (hasCancelButton ? 0.83 : 1) }}
            >
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
                            <Text style={textSmoke} > {_function.getStatus(state)} </Text>
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

                            {item.is_rating == 0 && info.id_status == 5 ? (
                                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
                                    <TouchableOpacity style={{ width: 125, height: 45, borderWidth: 0.5, borderRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: 'green' }}
                                        onPress = {()=>{show(item)}}
                                    >
                                        <Text style={{ fontSize: 15, color: 'white' }} >Đánh giá</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}
                        </View>
                    ))}
                </View>
                <View style={{ height: height * 0.2 }} >

                </View>
            </ScrollView>

            {hasCancelButton ? (
                <TouchableOpacity style={checkoutButton} onPress={clickCancel} >
                    <Text style={checkoutTitle}> Hủy đơn hàng </Text>
                </TouchableOpacity>
            ) : null}
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
