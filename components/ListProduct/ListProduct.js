// import { createDrawerNavigator } from '@react-navigation/drawer'
import { useState, useEffect } from 'react'
import { View, Text, Button, FlatList, TouchableOpacity, Image, RefreshControl, TextInput, Dimensions, Alert, StyleSheet, ScrollView } from 'react-native'
import publicStyle from '../public/style'
import { Rating, AirbnbRating } from 'react-native-ratings';
import Template from '../public/template'
import func from '../public/function'
import _function from '../public/function'
import color from '../public/color'
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker'
import { addCart, changeArr } from "../public/Redux/cartSlices"
// import color from '../public/color'
import Icon from 'react-native-vector-icons/FontAwesome5'
// import { TouchableOpacity } from "react-native-gesture-handler"
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// const {height, width} = Dimensions.get('window');

const { width, height } = Dimensions.get('window')

// const Drawer = createDrawerNavigator()

export default function ListProduct({ navigation, route }) {
    // route.params.type ? console.log(): null
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const dispatch = useDispatch()
    const dic = useSelector((state) => state.cart.data)
    const idRole = useSelector((state) => state.account.role)
    const token = useSelector((state) => state.account.token)
    const [name, setName] = useState('')
    const [idCategory, setIdCategory] = useState(0)
    const [min, setMin] = useState()
    const [max, setMax] = useState()
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([])
    // console.log(data)

    const loadDataOnlyOnce = async () => {
        // setSocket(io("ws://192.168.0.7:8000/ws/123"))
        // const socket = io("http://192.168.0.7:8000/");
        var responseJson = await _function.getAPI(`product/all?id_category=${idCategory}`)
        // console.log(responseJson)
        if (responseJson.data) {
            for (var item of responseJson.data) {
                item.image = item.image.split(',')
            }
            setData(responseJson.data)
            // console.log(responseJson.data)
        }
        const res = await _function.getAPI('product/category')
        var arr = [{ value: 0, label: 'Tất cả' }]
        if (res.code == 203) {

            for (var i of res.data) {
                // console.log(i.id_category)
                arr.push({ value: i.id_category, label: i.name })
            }
            setItems(arr)
        }

    };

    function currencyFormat(num) {
        // sendMessage()
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

    const loadAgain = async () => {
        setRefreshing(true)
        var responseJson = await _function.getAPI(`product/all?id_category=${idCategory}`)
        if (responseJson.data) {
            for (var item of responseJson.data) {
                item.image = item.image.split(',')
            }
            setData(responseJson.data)

        }

        const res = await _function.getAPI('product/category')
        var arr = [{ value: 0, label: 'Tất cả' }]
        if (res.code == 203) {

            for (var i of res.data) {
                // console.log(i.id_category)
                arr.push({ value: i.id_category, label: i.name })
            }
            setItems(arr)
        }

        setRefreshing(false)
    };

    const add = (item) => {
        // console.log(item)
        dispatch(addCart(item))
        dispatch(changeArr(func.transDictToArray(dic, item)))
    }

    const filter = async () => {
        var realMin = min ? min.replace(/,/g, '') : 0
        var realMax = max ? max.replace(/,/g, '') : 10000000000
        if (parseInt(realMin) > parseInt(realMax))
            alert("Thông báo", "Giá sàn phải nhỏ hơn giá trần")
        else {
            var res = await func.getAPI(`product/filter?min=${realMin}&max=${realMax}&id_category=${idCategory}`)
            if (res.code == 203) {
                for (var item of res.data) {
                    item.image = item.image.split(',')
                }
                setData(res.data)
            }
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

    const search = async () => {
        setRefreshing(true)
        var responseJson = await _function.getAPI(`product/search?id_category=${idCategory}&name=${name}`)
        if (responseJson.data) {
            for (var item of responseJson.data) {
                item.image = item.image.split(',')
            }
            setData(responseJson.data)

        }

        setRefreshing(false)
    }

    const deleteProduct2 = async (idProduct) => {
        const res = await _function.putAPI(`product/delete/${idProduct}`, {}, token)
        if (res.code == 200) {
            alert("Thông báo", "Xóa sản phẩm thành công")
            loadDataOnlyOnce()
        } else if (res.code == 400) {
            alert("Thông báo", "Sản phẩm này không thể xóa")
        }
    }

    const deleteProduct = async (idProduct, name) => {
        Alert.alert(
            "Thông báo",
            `Bạn có muốn xóa sản phẩm ${name} không?`,
            [
                {
                    text: "Không",
                    style: "cancel"
                },
                { text: "Có", onPress: () => deleteProduct2(idProduct) }
            ]
        );
    }

    useEffect(() => {
        loadDataOnlyOnce(); // this will fire only on first render
    }, []);

    useEffect(()=>{
        loadAgain()
    },[idCategory])

    return (
        <View style={publicStyle.initSection}>
            <View style={style.drbtMain}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{width: width*0.3}}>
                        <DropDownPicker
                            open={open}
                            value={idCategory}
                            items={items}
                            setOpen={setOpen}
                            setValue={setIdCategory}
                            placeholder='Trạng thái'
                        />
                    </View>
                    <TextInput
                        style={style.textInput}
                        placeholder='Nhập sản phẩm cần tìm'
                        value={name}
                        onChangeText={text => setName(text)}
                        onSubmitEditing={search}
                    />

                    <FontAwesome5
                        name='search'
                        size={20}
                        color='green'
                        style={style.searchIcon}
                    />

                </View>
            </View>

            <View style={{ paddingVertical: 10 }} >
                <View style={styles.twoSide} >
                    <Text style={{ marginTop: 5 }}>Sàn</Text>
                    <TextInput
                        style={styles.combo1}
                        value={min}
                        onChangeText={text => setMin(currencyFormat(text))}
                        keyboardType='numeric'
                    />

                    <Text style={{ marginTop: 5 }}>Trần</Text>
                    <TextInput
                        style={styles.combo1}
                        value={max}
                        onChangeText={text => setMax(currencyFormat(text))}
                        keyboardType='numeric'
                    />

                    <TouchableOpacity
                        onPress={filter}
                    >
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                            }}

                            source={require('../../assets/filter.jpg')}
                        />

                    </TouchableOpacity>

                </View>

            </View>

            <FlatList

                // onEndReached={this._onEndReach.bind(this)}

                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={loadAgain}
                    />
                }

                keyExtractor={(item) => item.id_product.toString()}
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ padding: 20, borderWidth: 1 }}
                        onPress={() => { navigation.navigate('product', { item: item }) }}
                    >
                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                            <Image source={{ uri: `${item.image[0]}` }}
                                style={{ width: 130, height: 90 }}
                            />
                            <View>
                                <Text style={{ width: 200, color: color.midGreen }}  > {item.name} </Text>

                                <View style={{ flexDirection: 'row' }}>
                                    <Rating
                                        ratingCount={5}
                                        imageSize={15}
                                        jumpValue={0.1}
                                        startingValue={item.score}
                                        style={{ marginLeft: 5 }}

                                    />

                                    <Text>({item.review_turn})</Text>
                                </View>
                                <Text style={{ width: 200, color: color.blue }}  > {item.category_name} </Text>

                                {item.quantity == 0 ? (
                                    <View style={publicStyle.twoSide}>
                                        <Text style={{ width: 100, color: color.darkRed }}  > Hết hàng </Text>
                                        {idRole == 2 ? (
                                            <>
                                                <TouchableOpacity
                                                    onPress={() => { navigation.navigate('productChange', { item: item }) }}
                                                >
                                                    <Image
                                                        style={{
                                                            width: 30,
                                                            height: 30,
                                                        }}

                                                        source={require('../../assets/tool.jpg')}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => { deleteProduct(item.id_product, item.name) }}
                                                >
                                                    <Image
                                                        style={{
                                                            width: 30,
                                                            height: 30,
                                                        }}

                                                        source={require('../../assets/delete.jpg')}
                                                    />
                                                </TouchableOpacity>
                                            </>
                                        ) : null}
                                    </View>
                                ) : (
                                    <>
                                        <View style={publicStyle.twoSide}>
                                            <Text style={{ width: 100 }}> {func.currencyFormat(item.current_price)}</Text>


                                            {idRole == 0 || idRole == 3 ? (
                                                <TouchableOpacity
                                                    onPress={() => { add(item) }}
                                                >
                                                    <Image
                                                        style={{
                                                            width: 30,
                                                            height: 30,
                                                        }}

                                                        source={require('../../assets/cart.jpg')}
                                                    />
                                                </TouchableOpacity>
                                            ) : (
                                                <>
                                                    <TouchableOpacity
                                                        onPress={() => { navigation.navigate('productChange', { item: item }) }}
                                                    >
                                                        <Image
                                                            style={{
                                                                width: 30,
                                                                height: 30,
                                                            }}

                                                            source={require('../../assets/tool.jpg')}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => { deleteProduct(item.id_product, item.name) }}
                                                    >
                                                        <Image
                                                            style={{
                                                                width: 30,
                                                                height: 30,
                                                            }}

                                                            source={require('../../assets/delete.jpg')}
                                                        />
                                                    </TouchableOpacity>
                                                </>

                                            )}
                                        </View>

                                    </>
                                )}



                            </View>
                        </View>
                    </TouchableOpacity>

                )}
            />

        </View>
    )
}

const style = StyleSheet.create({
    drbtMain: {
        height: height / 17,
        width: width
    },
    wrapper: { height: height / 16, backgroundColor: '#b7e89c', flexDirection: 'row' },
    textInput: { height: height / 20, backgroundColor: '#fff', borderColor: 'green', borderRadius: 15, top: 5, width: width * 0.55, left: 10, padding: 10 },
    searchIcon: { left: 10, top: 15 }
})

const styles = StyleSheet.create({
    wrapper: { height: height / 16, backgroundColor: '#b7e89c', flexDirection: 'row' },
    textInput: { height: height / 20, backgroundColor: '#fff', borderColor: 'green', borderRadius: 15, top: 5, width: width * 2 / 3, left: 45, padding: 10 },
    searchIcon: { left: 10, top: 15 },
    switch: { paddingHorizontal: 40 },
    combo1: { width: width * 0.3, borderWidth: 0.5, borderRadius: 10, height: 35 },
    combo2: { width: width * 0.5, paddingRight: 20, paddingTop: 5 },
    filterButton: { borderWidth: 3, justifyContent: 'center', alignItems: 'center', height: 40, margin: 5, marginRight: 10, borderRadius: 5, borderColor: '#63c522', backgroundColor: '#2dba1d' },
    filterText: { color: 'white', fontWeight: "bold", fontSize: 16 },
    twoSide: {
        flexDirection: 'row',
        alignContent: 'center',
        paddingHorizontal: 5,
        justifyContent: 'space-between'
    },
})