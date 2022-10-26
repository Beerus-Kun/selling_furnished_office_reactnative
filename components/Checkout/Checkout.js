import { View, ScrollView, Image, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, TextInput, Button, Alert, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker';
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native"
import { StripeProvider } from '@stripe/stripe-react-native'
import func from '../public/function'
import style from './style'
import color from "../public/color";
import publicStyle from '../public/style'
import { useState, useEffect } from "react";
import { clear } from "../public/Redux/cartSlices";
import _function from "../public/function";
import { FlatList } from "react-native-gesture-handler";
const { width, height } = Dimensions.get('window');

export default function Checkout({ navigation }) {
    const {
        checkoutButton, checkoutTitle, wrapperProduct, inputStyle, inputStyle1, inputStyle2, textTitle,
        textBlack, textInformation, textSmoke, textHighlight, wrapperContent,
    } = style;
    const [buttonText, setButtonText] = useState('Tiếp tục')
    const [step, setStep] = useState(0)
    const [temptToken, setTemptToken] = useState('new')
    const [discount, setDiscount] = useState(0)
    const [open, setOpen] = useState(false);
    const [isCredit, setIsCredit] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [cardDetails, setCardDetails] = useState()
    const [address, setAddress] = useState()
    const [phoneCode, setPhoneCode] = useState('')
    const [emailCode, setEmailCode] = useState('')
    const [showPhoneConfirm, setShowPhoneConfirm] = useState(false)
    const [showEmailConfirm, setShowEmailConfirm] = useState(false)
    const [isPhoneConfirm, setIsPhoneConfirm] = useState(false)
    const [isEmailConfirm, setIsEmailConfirm] = useState(false)
    const [listCoupon, setListCoupon] = useState([])
    const [code, setCode] = useState('')
    const [showModal, setShowModal] = useState(false)
    const { confirmPayment, loading } = useConfirmPayment()
    const dispatch = useDispatch()

    const [items, setItems] = useState([
        { label: 'Tiền mặt', value: false },
        { label: 'Thẻ', value: true }
    ]);

    const isLog = useSelector((state) => state.account.isLog);
    const emailR = useSelector((state) => state.account.email)
    const phoneR = useSelector((state) => state.account.phone)
    const nameR = useSelector((state) => state.account.name)
    const addressR = useSelector((state) => state.account.address)
    const data = useSelector((state) => state.cart.arrData)
    const token = useSelector((state) => state.account.token)

    var total = 0
    for (var i of data) {
        total += i.amount * i.current_price
    }

    // const { confirmPayment, loading } = useConfirmPayment()



    const verifyPhone = async () => {
        const body = {
            phone: phone,
            email: email,
            smsState: 2,
            smsCode: phoneCode
        }
        const res = await _function.postAPI('account/check-phone-email', body, temptToken)
        if (res.code == 406) {
            alert('Thông báo', 'Mã bạn nhập không đúng')
        } else if (res.code == 202) {
            setIsPhoneConfirm(true)
            setTemptToken(res.token)
            if (isEmailConfirm && !isCredit) {
                setButtonText("Đặt hàng")
            }
        }
    }

    const viewCoupon = async () => {
        const res = await _function.getAPI('bill/coupon')
        if (res.code = 200) {
            setListCoupon(res.data)
        }
        setShowModal(true)
    }

    const verifyEmail = async () => {
        const body = {
            phone: phone,
            email: email,
            emailState: 2,
            emailCode: emailCode
        }
        const res = await _function.postAPI('account/check-phone-email', body, temptToken)
        if (res.code == 406) {
            alert('Thông báo', 'Mã bạn nhập không đúng')
        } else if (res.code == 202) {
            setIsEmailConfirm(true)
            setTemptToken(res.token)
            if (isPhoneConfirm && !isCredit) {
                setButtonText("Đặt hàng")
            }
        }
    }

    let getPhoneCode = async (token) => {
        const body = {
            phone: phone,
            email: email,
            smsState: 1
        }
        const res = await _function.postAPI('account/check-phone-email', body, token)
        if (res.code == 202) {
            setTemptToken(res.token)
            setShowPhoneConfirm(true)
            return { token: res.token, message: '' }
        } else if (res.code == 405) {
            return { token: token, message: 'Số điện thoại của bạn không đúng!\n' }
        }
    }

    const getEmailCode = async (token) => {
        const body = {
            phone: phone,
            email: email,
            emailState: 1
        }
        const res = await _function.postAPI('account/check-phone-email', body, token)
        if (res.code == 202) {
            setTemptToken(res.token)
            setShowEmailConfirm(true)
            return { token: res.token, message: '' }
        } else if (res.code == 405) {
            return { token: token, message: 'Địa chỉ email của bạn không đúng!\n' }
        }
    }

    const finish = () => {

        // something sau onpress
        Alert.alert(
            'Thông báo',
            'Bạn đã đặt hàng thành công',
            [
                { text: "OK", onPress: () => { dispatch(clear()); navigation.popToTop() } }
            ]
        );
    }

    const payByCard = async () => {
        var arrProduct = ''
        var arrAmount = ''

        for (var item of data) {
            arrProduct += item.id_product + ','
            arrAmount += item.amount + ','
        }

        arrProduct = arrProduct.substring(0, arrProduct.length - 1)
        arrAmount = arrAmount.substring(0, arrAmount.length - 1)

        body = {
            'product': arrProduct,
            'amount': arrAmount,
            'coupon': code,
            'address': "",
            'isCredit': true
        }
        if (!cardDetails?.complete) {
            alert("Thông báo", "Vui lòng điền đủ thông tin thẻ")
            return;
        }
        const billingDetails = {
            name: isLog ? phoneR : phone
        }
        try {
            const res = await _function.postAPI('bill/pay-by-card', body, temptToken)
            if (res.code == 200) {
                const secret = res.secret
                const id_secret = res.id
                const { paymentIntent, error } = await confirmPayment(
                    secret, {
                    type: "Card",
                    billingDetails: billingDetails,
                });
                if (error) {
                    alert("Lỗi thẻ", 'Vui lòng kiểm tra lại thông tin thẻ')
                } else if (paymentIntent) {
                    order(true)
                }
            } else if (res.code == 400) {
                alert('Hết hàng', `Sản phẩm ${res.name} chỉ còn ${res.amount} sản phẩm`)
            } else {
                alert('Lỗi', 'Sự cố ngoài ý muốn. Vui lòng thử lại')
            }

        } catch (e) {
            console.log(e)
        }
    }

    const order = async (isCredit = false) => {
        console.log(123)
        var arrProduct = ''
        var arrAmount = ''

        for (var item of data) {
            arrProduct += item.id_product + ','
            arrAmount += item.amount + ','
        }

        arrProduct = arrProduct.substring(0, arrProduct.length - 1)
        arrAmount = arrAmount.substring(0, arrAmount.length - 1)

        const body = {
            "name": isLog ? '' : name,
            'address': address,
            'isCredit': isCredit,
            'product': arrProduct,
            'amount': arrAmount,
            'coupon': code
        }
        // console.log(isLog)
        const check = await func.postAPI(`bill/check`, body);
        if (check.code == 200) {
            const res = await _function.postAPI(`bill/buy`, body, isLog ? token : temptToken);
            if (res.code == 200) {
                finish()
            } else if (res.code == 400) {
                alert('Hết hàng', `Sản phẩm ${res.name} chỉ còn ${res.amount} sản phẩm`)
            }
        } else if (check.code == 400) {
            alert('Hết hàng', `Sản phẩm ${check.name} chỉ còn ${check.amount} sản phẩm`)
        }


    }

    const click = async () => {
        if (step == 0) {
            setStep(1)
            if (isLog && !isCredit) {
                setButtonText("Đặt hàng")
            }
        } else if (step == 1) {
            if (!address) {
                alert("Thông báo", 'Vui lòng nhập địa chỉ')
            } else if (!isLog) {
                if (!name) {
                    alert("Thông báo", "Vui lòng nhập họ và tên")
                } else if (!phone) {
                    alert("Thông báo", "Vui lòng nhập số điện thoại")
                } else if (!email) {
                    alert('Thông báo', 'Vui lòng nhập địa chỉ email')
                } else {
                    var message = ""
                    if (!showPhoneConfirm && !showEmailConfirm) {
                        var token = temptToken
                        let res = await getPhoneCode(token)
                        if (res.message) {
                            message += res.message

                        } else {
                            token = res.token
                        }
                        let res2 = await getEmailCode(token)
                        if (res.message) {
                            message += res2.message

                        }
                    } else if (!showPhoneConfirm) {
                        let res = await getPhoneCode(temptToken)
                        if (res.message) {
                            message += res.message
                        }
                    } else if (!showEmailConfirm) {
                        let res = await getPhoneCode(temptToken)
                        if (res.message) {
                            message += res.message
                        }
                    }

                    if (message) {
                        alert('Thông báo', message)
                    }

                }
            }

            if ((!isLog && isEmailConfirm && isPhoneConfirm) || (isLog && address)) {
                if (isCredit) {
                    setStep(2)
                    setButtonText('Thanh Toán')
                } else {
                    order()
                }

            }

        } else if (step == 2) {
            payByCard()
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

    const couponPress = async (coupon = '') => {
        if (coupon) {
            const body = {
                code: coupon
            }
            const responseJson = await _function.postAPI('bill/coupon', body, temptToken)
            if (responseJson.code == 200) {
                setDiscount(responseJson.value)
            } else if (responseJson.code == 400) {
                alert('Thông báo', 'Mã giảm giá này không tồn tại')
            }
        } else {
            const body = {
                code: code
            }
            const responseJson = await _function.postAPI('bill/coupon', body, temptToken)
            if (responseJson.code == 200) {
                setDiscount(responseJson.value)
            } else if (responseJson.code == 400) {
                alert('Thông báo', 'Mã giảm giá này không tồn tại')
            }
        }
    }

    useEffect(() => {
        if (isLog) {
            setName(nameR)
            setAddress(addressR)
        }
    }, [])

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
        <View style={{ flex: 1 }} >
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
                        <Text style={styles.modalText}>Chọn giảm giá</Text>
                        <FlatList
                            keyExtractor={(item) => item.id_coupon}
                            data={listCoupon}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ paddingTop: 20, width: width * 0.5 }}
                                    onPress={() => {
                                        setCode(item.id_coupon)
                                        setShowModal(false)
                                        couponPress(item.id_coupon)
                                    }}
                                >
                                    <View style={publicStyle.twoSide}>
                                        <Text style={{ color: 'blue' }}>Mã {item.id_coupon}</Text>
                                        <Text>{_function.currencyFormat(item.value)}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />

                    </View>
                </View>
            </Modal>
            <ScrollView style={{ height: height * 0.83 }} >
                {isLog ? (
                    <View style={wrapperContent} >

                        <View>
                            <Text style={textBlack} >Thông tin Khách hàng</Text>
                            <View style={publicStyle.twoSide} >
                                <Text style={textHighlight} >Họ và tên: </Text>
                                <Text style={textSmoke} >{nameR}</Text>
                            </View>
                            <View style={publicStyle.twoSide} >
                                <Text style={textHighlight} >Email: </Text>
                                <Text style={textSmoke} >{emailR}</Text>
                            </View>

                            <View style={publicStyle.twoSide} >
                                <Text style={textHighlight} >Số điện thoại: </Text>
                                <Text style={textSmoke} >{phoneR}</Text>
                            </View>
                        </View>

                    </View>
                ) : null}

                <View style={wrapperContent} >
                    <Text style={textBlack}> Chi tiết sản phẩm </Text>

                    {data.map(item => (
                        <View style={wrapperProduct} key={item.id_product} >
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>

                                <Image source={{ uri: item.image[0] }}
                                    style={{ width: 130, height: 90 }}
                                />
                                <View>
                                    <Text style={textTitle} >Tên sản phẩm: </Text>
                                    <Text style={textInformation} > {item.name} </Text>

                                    <Text style={textTitle} >Số lượng: </Text>
                                    <Text style={textInformation} >{item.amount} sản phẩm</Text>


                                    <Text style={textTitle} >Giá mỗi sản phẩm: </Text>
                                    <Text style={textInformation} >{func.currencyFormat(item.current_price)}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={wrapperContent} >
                    <Text style={textBlack} >Đơn hàng</Text>
                    <View style={publicStyle.twoSide}>
                        <Text style={textHighlight} > Phương thức:  </Text>
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
                                value={isCredit}
                                items={items}
                                disabled={step > 0}
                                setOpen={setOpen}
                                setValue={setIsCredit}
                                setItems={setItems}
                                listMode="SCROLLVIEW"

                                mode="BADGE"

                            />
                        </View>
                    </View>
                    <View style={publicStyle.twoSide}>
                        <Text style={textHighlight} > Giá trị đơn hàng:  </Text>
                        <Text style={textTitle} > {func.currencyFormat(total)} </Text>
                    </View>

                    <View style={publicStyle.twoSide} >
                        <Text style={textHighlight} >Mã giảm giá: </Text>
                        <TextInput
                            autoCapitalize="characters"
                            style={inputStyle2}
                            value={code}
                            onChangeText={text => setCode(text)}
                        />
                        <TouchableOpacity
                            onPress={viewCoupon}
                        >
                            <Image
                                style={{
                                    width: 35,
                                    height: 35,
                                }}

                                source={require('../../assets/list.png')}
                            />
                        </TouchableOpacity>
                        {/* <Button
                            title="Gửi"
                            onPress={couponPress}
                        /> */}

                    </View>

                    <View style={publicStyle.twoSide}>
                        <Text style={textHighlight} > Số tiền được giảm:  </Text>
                        <Text style={textTitle} > {func.currencyFormat(discount)} </Text>
                    </View>

                    <View style={publicStyle.twoSide}>
                        <Text style={textHighlight} > Số tiền thanh toán:  </Text>
                        <Text style={textTitle} > {func.currencyFormat(total - discount > 0 ? total - discount : 0)} </Text>
                    </View>
                </View>


                {step > 0 ? (
                    <View style={wrapperContent}>
                        <Text style={textBlack} >Xác nhận đơn hàng</Text>
                        <View style={publicStyle.twoSide} >
                            <Text style={textHighlight} >Địa chỉ nhận: </Text>
                            <TextInput
                                style={inputStyle}
                                value={address}
                                onChangeText={text => setAddress(text)}
                            />

                        </View>
                        <View style={publicStyle.twoSide} >
                            <Text style={textHighlight} >Họ và tên: </Text>
                            <TextInput
                                style={inputStyle}
                                value={name}
                                onChangeText={text => setName(text)}
                            // keyboardType='numeric'
                            // editable={!showPhoneConfirm}
                            />

                        </View>
                        {!isLog ? (
                            <>

                                <View style={publicStyle.twoSide} >
                                    <Text style={textHighlight} >Số điện thoại: </Text>
                                    <TextInput
                                        style={inputStyle}
                                        value={phone}
                                        onChangeText={text => setPhone(text)}
                                        keyboardType='numeric'
                                        editable={!showPhoneConfirm}
                                    />

                                </View>
                                <View style={publicStyle.twoSide} >
                                    <Text style={textHighlight} >Địa email: </Text>
                                    <TextInput
                                        style={inputStyle}
                                        value={email}
                                        onChangeText={text => setEmail(text)}
                                        editable={!showEmailConfirm}
                                    />

                                </View>
                                {showPhoneConfirm ? (
                                    <View style={publicStyle.twoSide} >
                                        <Text style={textHighlight} >Mã sms:   </Text>
                                        <TextInput
                                            style={inputStyle1}
                                            value={phoneCode}
                                            keyboardType='numeric'
                                            onChangeText={text => setPhoneCode(text)}
                                        />
                                        <Button
                                            disabled={isPhoneConfirm}
                                            title="Gửi"
                                            onPress={verifyPhone}
                                        />
                                    </View>
                                ) : null}

                                {showEmailConfirm ? (
                                    <View style={publicStyle.twoSide} >
                                        <Text style={textHighlight} >Mã email: </Text>
                                        <TextInput
                                            style={inputStyle1}
                                            value={emailCode}
                                            keyboardType='numeric'
                                            // placeholder={'1 cai j do'}
                                            onChangeText={text => setEmailCode(text)}
                                        />
                                        <Button
                                            disabled={isEmailConfirm}
                                            title="Gửi"
                                            onPress={verifyEmail}
                                        />
                                    </View>
                                ) : null}
                            </>
                        ) : null}
                    </View>
                ) : null}

                {step == 2 ? (
                    <StripeProvider
                        publishableKey='pk_test_51LUSVFFmgQcL8H6LGUFtM2QN5auIvgaCnJXRhCbwA0y8bUfWmyg1NfePast4nL4BWIeuU1APOF79hz4P2u1KNmda00aAIrjnWZ'
                    >
                        <View style={wrapperContent} >
                            <Text style={textBlack} >Thanh toán</Text>
                            <View style={styles.container}>
                                <CardField
                                    postalCodeEnabled={false}
                                    placeholder={{
                                        number: '4242 4242 4242 4242'
                                    }}

                                    cardStyle={styles.card}
                                    style={styles.cardContainer}
                                    onCardChange={cardDetails => {
                                        setCardDetails(cardDetails)
                                    }}
                                />
                            </View>
                        </View>
                    </StripeProvider>
                ) : null}

            </ScrollView>

            {!isKeyboardVisible ? (
                <TouchableOpacity style={checkoutButton}
                    onPress={click}
                >
                    <Text style={checkoutTitle}> {buttonText} </Text>
                </TouchableOpacity>) : null}
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        margin: 20,
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#efefefef',
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10
    },
    card: {
        backgroundColor: '#efefefef'
    },
    cardContainer: {
        height: 50,
        marginVertical: 30
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

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
        elevation: 5,
        height: height * 0.6,
        width: width * 0.7
    },
    modalText: {
        // marginBottom: 0,
        textAlign: "center",
        fontSize: 20,
        fontWeight: '800',
        color: 'green'
    },
})


