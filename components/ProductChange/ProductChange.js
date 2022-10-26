import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, ScrollView, Text, TextInput, TouchableOpacity, Keyboard, Alert, ActivityIndicator } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
// import AddPostView from './AddPostView';
import color from '../public/color';
import publicStyle from '../public/style'
import Carousel from "react-native-snap-carousel";
import _function from '../public/function'
import { SliderBox } from "react-native-image-slider-box";
import { StyleSheet, Dimensions } from "react-native";
import { useSelector } from 'react-redux';

// var RNFS = require('react-native-fs');
const { width, height } = Dimensions.get('window');
const swiperWidth = (width) - 60;
const swiperHeight = (swiperWidth *1.5 );

// DropDownPicker.setListMode("SCROLLVIEW");

export default function ProductChange({route}) {
    // console.log(route.params.idProduct)
    // console.log(route.params.item)
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('')
    // const imageArr = image.split(',').slice(0, -1)
    const [code, setCode] = useState('')
    const [category, setCategory] = useState([])
    const [description, setDescription] = useState('')
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [quantity, setQuantity] = useState(0)
    // drop down
    const [type, setType] = useState('')
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('0')
    const [open, setOpen] = useState(false);
    const [idCategory, setIdCategory] = useState(0);

    const token = useSelector((state) => state.account.token)

    const changeType = () => {
        var data = []
        for (var item of category) {
            if (item.type == type) {
                data.push(item)
            }
        }

        setItems(data)
    }

    function currencyFormat(num) {
        try {
            num = num.replace(/,/g, '')
            num = parseInt(num)
            if (isNaN(num)) num = 0
            var money = num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return money;
        } catch (e) {
            console.log(e)
        }
    }


    const click = async () => {

        setIsLoading(true)
        if (idCategory > 0) {
            if (name) {
                if (description) {
                    const intPrice = parseInt(price.replace(/,/g, ''))
                    if (intPrice > 1000) {
                        if (quantity < 0) {
                            alert("Thiếu", "Vui lòng nhập số lượng sản phẩm")
                        } else {
                            if (image) {
                                // const imageLink = await upFile()
                                const body = {
                                    "id_category": idCategory,
                                    "name": name,
                                    "description": description,
                                    "quantity": quantity,
                                    "listed_price": intPrice,
                                    "image": image
                                }
                                const res = await _function.putAPI(`product/${route.params.item.id_product}`, body, token)

                                if (res.code == 200) {
                                    alert("Thông báo", "Thay đổi thành công")
                                }
                            } else {
                                alert("Thiếu", "Vui lòng chọn hình ảnh")
                            }
                        }
                    } else {
                        alert("Thiếu", "Vui lòng nhập giá")
                    }
                } else {
                    alert("Thiếu", "Vui lòng nhập mô tả")
                }
            } else {
                alert("Thiếu", "Vui lòng nhập tên sản phẩm")
            }
        } else {
            alert("Thiếu", "Vui lòng chọn loại sản phẩm")
        }
        setIsLoading(false)
    }

    const getCategory = async () => {
        const res = await _function.getAPI('product/category', '')
        if (res.code == 203) {
            var data = []
            
            for (var item of res.data) {
                var temp = {}
                temp.label = item.name
                temp.value = item.id_category
                // temp.type = item.type
                data.push(temp)
            }
            // console.log(data)
            setItems(data)
        }
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

    const someInit = async ()=>{
        const res = await _function.getAPI(`product/staff/${route.params.item.id_product}`, token)
        if(res.code == 200){
            // console.log(res)
            // console.log(res.data)
            setQuantity(String(res.data.quantity))
            setName(res.data.name)
            setPrice(currencyFormat(String(res.data.current_price)))
            setDescription(res.data.description)
            setIdCategory(res.data.id_category)
            setImage(res.data.image)
        }
        // 
    }

    useEffect(() => {
        getCategory()
        someInit()
    }, [])

    useEffect(() => {
        changeType()
    }, [type])

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <>
            {isLoading ? (<ActivityIndicator size="large" color='red' />) : null}
            <ScrollView style={{ flex: 1, height: height * 0.8 }} nestedScrollEnabled={true} >
                <View style={style.wrapperContent}>
                    <Text style={style.textBlack} >Hình ảnh</Text>
                    <View style={style.imageContainer}>
                        <SliderBox
                            images={route.params.item.image}
                            sliderBoxHeight={350}
                            dotColor={color.midGreen}
                            inactiveDotColor={color.gray}
                            dotStyle={{
                                width: 15,
                                height: 15,
                                borderRadius: 15,
                                marginHorizontal: 10,
                                padding: 0,
                                margin: 0
                            }}
                        />
                    </View>
                    {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}><Button title="Pick an image" onPress={pickImage} /></View> */}
                </View>
                <View style={style.wrapperContent} >
                    <Text style={style.textBlack} >Chi tiết</Text>
                    <View style={publicStyle.twoSide}>
                        {/* <Text style={style.textHighlight} > Loại:  </Text>
                        <View style={{
                            backgroundColor: color.white,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 2
                        }}>
                            <DropDownPicker
                                // style
                                // style={{backgroundColor: 'crimson',}}
                                open={open1}
                                value={type}
                                items={items1}
                                // disabled={step > 0}
                                setOpen={setOpen1}
                                setValue={setType}
                                setItems={setItems1}
                                listMode="SCROLLVIEW"
                            />
                        </View> */}
                    </View>
                    <View style={publicStyle.twoSide}>
                        <Text style={style.textHighlight} > Loại:  </Text>
                        <View style={{
                            backgroundColor: color.white,
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1
                        }}>
                            <DropDownPicker
                                style
                                open={open}
                                value={idCategory}
                                items={items}
                                // disabled={step > 0}
                                // max={7}
                                setOpen={setOpen}
                                setValue={setIdCategory}
                                setItems={setItems}
                                listMode="MODAL"
                            />
                        </View>
                    </View>

                    <View style={publicStyle.twoSide} >
                        <Text style={style.textHighlight} >Tên sản phẩm: </Text>
                        <TextInput

                            style={style.inputStyle}
                            value={name}
                            onChangeText={text => setName(text)}
                        />

                    </View>

                    <View style={publicStyle.twoSide} >
                        <Text style={style.textHighlight} >Giá sản phẩm: </Text>
                        <TextInput
                            keyboardType='numeric'

                            style={style.inputStyle}
                            value={currencyFormat(price)}
                            onChangeText={text => setPrice(text)}
                        />
                        <Text>VND</Text>

                    </View>

                    <View style={publicStyle.twoSide} >
                        <Text style={style.textHighlight} >Số lượng sản phẩm: </Text>
                        <TextInput
                            keyboardType='numeric'

                            style={style.inputStyle}
                            value={quantity}
                            onChangeText={text => setQuantity(text)}
                        />

                    </View>


                    <View style={publicStyle.twoSide}>
                        <Text style={style.textHighlight} > Chi tiết sản phẩm:  </Text>
                    </View>

                    <TextInput
                        style={style.textContent}
                        // placeholder="Nhập nội dung bạn muốn đóng góp"
                        autoCapitalize="none"
                        value={description}
                        multiline={true}
                        onChangeText={text => setDescription(text)}
                        underlineColorAndroid="transparent"
                        selectTextOnFocus={true}
                    />


                </View>


            </ScrollView>
            {!isKeyboardVisible ? (
                <TouchableOpacity style={style.checkoutButton}
                    onPress={click}
                    disabled={isLoading}
                >
                    <Text style={style.checkoutTitle}> Đổi thông tin </Text>
                </TouchableOpacity>) : null}
        </>
    );
}

const style = StyleSheet.create({
    image: {
        height: height / 3,
        width: width * 0.8,
        backgroundColor: color.light,
        margin: 10,
        marginHorizontal: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        // flexDirection: ''
    },
    imageContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 10,
        paddingTop: 20,
        width: swiperWidth,
    },
    slide: {
        height: height / 3,
        width: width * 0.8,
    },
    wrapperContent: {
        // height: height * 0.33,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 5,
        padding: 10,
        paddingTop: 0
    },
    textHighlight: {
        fontSize: 20,
        color: color.midGreen,
        fontWeight: 'bold'
    },
    textBlack: {
        fontSize: 25,
        fontWeight: 'bold',
        color: color.darkGreen,
        margin: 10
    },
    inputStyle: {
        borderWidth: 0.2,
        borderRadius: 3,
        paddingRight: 10,
        paddingLeft: 5,
        width: width * 0.5
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
    textContent: {
        height: height * 0.4,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        paddingLeft: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#2ABB9C',
        borderWidth: 1
    }
})