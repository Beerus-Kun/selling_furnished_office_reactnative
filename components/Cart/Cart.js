
import { View, Text, TouchableOpacity, FlatList, Image, Alert } from 'react-native'
import style from './style';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import func from '../public/function'
import publicStyle from '../public/style'
import { increaseAmount, decreaseAmount, deleteCart } from "../public/Redux/cartSlices"

export default function Cart({navigation}) {
    const { main, checkoutButton, checkoutTitle, wrapper, txtQuantity,
        productStyle, mainRight, productController, buttonContainer, buttonDeleteContainer,
        txtName, txtPrice, productImage, numberOfProduct,
        txtShowDetail, showDetailContainer, checkoutButton1 } = style;

    const data = useSelector((state) => state.cart.arrData)
    const dispatch = useDispatch()
    var total = 0
    for (var i of data) {
        // console.log(i)
        total += i.amount * i.current_price
    }
    // console.log(total)
    // const data1 = useSelector((state) => state.cart.data)
    // console.log(data)
    // console.log(data1)

    const increase = (id_product, index) => {
        dispatch(increaseAmount({ id_product: id_product, index: index }))
    }

    const decrease = (id_product, index) => {
        dispatch(decreaseAmount({ id_product: id_product, index: index }))
    }

    const del = (id_product, index) => {
        dispatch(deleteCart({ id_product: id_product, index: index }))
    }

    const alert = (title, content) => {
        Alert.alert(
            title,
            content,
            [
                { text: "OK" }
            ]
        );
    }

    const check = async () => {
        var arrProduct = ''
        var arrAmount = ''

        for (var item of data) {
            arrProduct += item.id_product + ','
            arrAmount += item.amount + ','
        }

        arrProduct = arrProduct.substring(0, arrProduct.length - 1)
        arrAmount = arrAmount.substring(0, arrAmount.length - 1)
        // address: str
        // isCredit: bool
        // product: str
        // amount: str
        const body = {
            'address': '',
            'isCredit': false,
            'product': arrProduct,
            'amount': arrAmount,
        }
        const res = await func.postAPI(`bill/check`, body);
        if (res.code == 200) {
            // finish()
            navigation.navigate('checkout')
        } else if (res.code == 400) {
            alert('Hết hàng', `Sản phẩm ${res.name} chỉ còn ${res.amount} sản phẩm`)
        }
    }

    return (
        <View style={wrapper}>
            <FlatList
                style={publicStyle.initSection}
                data={data}
                keyExtractor={(item) => item.id_product.toString()}
                renderItem={({ item, index }) => (
                    <View style={productStyle}>
                        <Image source={{ uri: item.image[0] }} style={productImage} />
                        <View style={[mainRight]}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={txtName}>{item.name}</Text>
                                <TouchableOpacity
                                    onPress={() => { del(item.id_product, index) }}
                                >
                                    <View
                                        style={buttonDeleteContainer}
                                        width={20}
                                        height={20}
                                    >
                                        <Text style={{ fontFamily: 'sans-serif-medium', color: '#969696' }}>X</Text>
                                    </View>

                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={txtPrice}>{func.currencyFormat(item.current_price)}</Text>
                            </View>
                            <View style={productController}>
                                <View style={numberOfProduct}>
                                    <TouchableOpacity style={buttonContainer}
                                        onPress={() => { increase(item.id_product, index) }}
                                    >
                                        <Text style={{ fontSize: 20 }} >+</Text>
                                    </TouchableOpacity>

                                    <Text style={txtQuantity} >{item.amount}</Text>

                                    <TouchableOpacity style={buttonContainer}
                                        onPress={() => { decrease(item.id_product, index) }}
                                    >
                                        <Text style={{ fontSize: 20 }} >-</Text>
                                    </TouchableOpacity>

                                </View>
                                {/* <TouchableOpacity style={showDetailContainer} >
                                    <Text style={txtShowDetail}>Xem sản phẩm</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>

                )}
            />
            {total > 0 ? (
                <TouchableOpacity style={checkoutButton}
                onPress={check}
                >
                    <Text style={checkoutTitle}>Mua hàng ({func.currencyFormat(total)})</Text>
                </TouchableOpacity>
            ) : (
                <View style={checkoutButton1} >
                    <Text style={checkoutTitle}>Bạn chưa thêm vào giỏ</Text>
                </View>
            )}

        </View>
    )
}