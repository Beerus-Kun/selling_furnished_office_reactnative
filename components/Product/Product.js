import { useEffect, useRef, useState } from "react";
import { Image, ScrollView, View, Text, TouchableOpacity, TextInput } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import style from "./style";
import func from '../public/function'
import color from '../public/color'
import { useDispatch, useSelector } from "react-redux";
import { addCart1, changeArr } from "../public/Redux/cartSlices"
import { Rating, AirbnbRating } from 'react-native-ratings';
import publicStyle from "../public/style";

export default function Product({ route, navigation }) {
    var ws = useRef(null)
    
    // console.log(route.params.item)
    // console.log(navigation)
    const [data, setData] = useState(route.params.item)
    const [comment, setComment] = useState([])


    const [typing, setTyping] = useState('')
    const username = useSelector((state) => state.account.username);
    const token = useSelector((state) => state.account.token);
    const role = useSelector((state) => state.account.role);
    // console.log(route.params.item.quantity)
    const {
        wrapper, cardStyle, header,
        backStyle,
        imageContainer, cartStyle, textBlack, textInformation, bigButton, buttonText, buttonContainer1,
        textSmoke, textHighlight, textMain, titleContainer, informationContainer, numberOfProduct, txtQuantity,
        descContainer, productImageStyle, descStyle, txtMaterial, txtColor, empty, buttonContainer
    } = style;
    const dispatch = useDispatch()
    const [num, setNum] = useState(1)
    const dic = useSelector((state) => state.cart.data)
    const isLog = useSelector((state) => state.account.isLog)
    const add = () => {
        dispatch(addCart1({ data: data, amount: num }))
        dispatch(changeArr(func.transDictToArray2(dic, data, num)))
    }

    const submit = async () => {
        if (typing.trim()) {
            // console.log(123)
            await func.postAPI(`comment/${route.params.item.id_product}?content=${typing}`, {}, token)
            ws.current.send('fhweifowehfio')
        }

        setTyping('')

    }

    const getComment = async () => {
        const res = await func.getAPI(`comment/${route.params.item.id_product}`)
        // console.log(res)
        if (res.code == 200) {
            setComment(res.data)
        }
    }
    useEffect(()=>{
        ws.current = new WebSocket(`ws://192.168.0.2:8000/ws/${route.params.item.id_product}`)
        ws.current.onmessage = function (event) {
            // console.log(typeof(event.data))
            setComment(JSON.parse(event.data))
            // setData(event.data)
        };
        return ()=>{
            ws.current.close()
        }
    },[])


    useEffect(() => {
        getComment()
        // socket()
    }, [])

    return (
        <ScrollView >
            <View style={wrapper}>
                <View style={cardStyle}>


                    <View style={imageContainer}>
                        <SliderBox
                            images={data.image}
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

                    <View style={titleContainer}>
                        <Text style={textMain}>
                            <Text style={textBlack}>{data.name}</Text>
                        </Text>
                    </View>

                    <View style={informationContainer}>
                        <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 10 }}>
                            <Rating
                                ratingCount={5}
                                imageSize={30}
                                jumpValue={0.1}
                                startingValue={data.score}
                            />

                            <Text style={{ fontSize: 20 }} >({data.review_turn})</Text>
                        </View>
                        <Text style={textInformation}>
                            {data.quantity > 0 ? (
                                <>
                                    <Text style={textHighlight} >Giá bán: </Text>
                                    <Text style={textSmoke}> {func.currencyFormat(Number(data.current_price))} </Text>
                                </>
                            ) : (
                                <Text style={{
                                    fontSize: 24,
                                    color: 'red'
                                }}>Hết hàng</Text>
                            )}
                        </Text>
                        <Text style={textInformation}>
                            <Text style={textHighlight} >Loại sản phẩm: </Text>
                        </Text>
                        <Text style={textInformation}>
                            <Text style={textSmoke}>{data.category_name}</Text>
                        </Text>
                        <Text style={textInformation}>
                            <Text style={textHighlight} >Thông tin chi tiết: </Text>
                        </Text>
                        <Text style={textInformation}>
                            <Text style={textSmoke}>{data.description}</Text>
                        </Text>




                    </View>
                    {route.params.item.quantity > 0 && role != 2  ? (
                        <>
                            <View style={numberOfProduct}>
                                <TouchableOpacity style={buttonContainer1}
                                    onPress={() => { setNum(num + 1) }}
                                >
                                    <Text style={{ fontSize: 20 }} >+</Text>
                                </TouchableOpacity>

                                <Text style={txtQuantity} >{num}</Text>

                                <TouchableOpacity style={buttonContainer1}
                                    onPress={() => { setNum((num - 1) < 0 ? 0 : num - 1) }}
                                >
                                    <Text style={{ fontSize: 20 }} >-</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={buttonContainer}>
                                <TouchableOpacity style={bigButton}
                                    onPress={add}
                                >
                                    <Text style={buttonText}>Thêm vào giỏ hàng</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : null}

                    <View style={empty} />
                    <View style={informationContainer}>
                        <Text style={{ fontSize: 30, color: 'blue' }}>Bình luận</Text>
                        {comment.length > 0 ? (
                            comment.map(item => (
                                item.username != username ? (
                                    <View key={item.id_comment} style={style.sender}>
                                        {item.id_role == 2 || item.id_role == 1 ? (

                                            <View style={publicStyle.twoSide}>
                                                <Image
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                    }}

                                                    source={require('../../assets/staff.jpg')}
                                                />
                                                <Text style={style.senderTitle}>Nhân viên</Text>
                                            </View>
                                        ) : (

                                            <View style={publicStyle.twoSide}>
                                                <Image
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                    }}

                                                    source={require('../../assets/user.png')}
                                                />
                                                <Text style={style.senderTitle}>{item.name}</Text>
                                            </View>
                                        )}

                                        <Text style={style.senderText}>{item.content}</Text>
                                    </View>
                                ) : (
                                    <View key={item.id_comment} style={style.reciever}>
                                        {item.id_role == 2 || item.id_role == 1 ? (

                                            <View style={publicStyle.twoSide}>
                                                <Image
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                    }}

                                                    source={require('../../assets/staff.jpg')}
                                                />
                                                <Text style={style.recieverTitle}>Tôi</Text>
                                            </View>
                                        ) : (

                                            <View style={publicStyle.twoSide}>
                                                <Image
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                    }}

                                                    source={require('../../assets/user.png')}
                                                />
                                                <Text style={style.senderTitle}>Tôi</Text>
                                            </View>
                                        )}

                                        <Text style={style.senderText}>{item.content}</Text>
                                    </View>
                                )
                            ))
                        ) : (
                            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
                                <Text>Không có bình luận</Text>
                            </View>
                        )}
                        {isLog ? (
                            <TextInput
                                placeholder="Nhập bình luận của bạn vào đây"
                                style={{ height: 100, borderWidth: 0.5, borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingLeft: 10 }}
                                value={typing}
                                onChangeText={text => setTyping(text)}
                                onEndEditing={submit}
                            />
                        ) : null}
                        {/* <View style={{height: 100, borderWidth:0.5, borderRadius: 5, justifyContent: 'center', alignItems:'center'}}>
                            <Text>Không có bình luận</Text>
                        </View> */}
                    </View>
                    <View style={empty} />
                </View>
            </View>
        </ScrollView >
    )
}

