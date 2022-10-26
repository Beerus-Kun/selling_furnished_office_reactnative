import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Alert, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateToken, login } from "../public/Redux/accountSlices";
import styles from './style';
import _function from '../public/function';

export default function Verification({ navigation, route }) {
    const token = useSelector((state) => state.account.token)
    const dispatch = useDispatch()
    const params = route.params
    const [emailCode, setEmailCode] = useState('')
    const [phoneCode, setPhoneCode] = useState('')

    const [isEmailCheck, setIsEmailCheck] = useState(false)

    const alert = (title, content) => {
        Alert.alert(
            title,
            content,
            [
                { text: "OK" }
            ]
        );
    }

    const getData = async (token) => {
        const responseJson = await _function.getAPI('account/info', token)
        dispatch(login(responseJson))
        dispatch(updateToken(token))
        navigation.popToTop()
    }

    const nextStep = async (res) => {
        if (res.code == 406) {
            alert('Sai mã', 'Vui lòng kiểm tra và nhập lại')
        } else if (res.code == 202) {
            if (isEmailCheck) {
                const body = {
                    "username": params.username,
                    "password": params.password,
                    "gender": params.gender,
                    "email": params.email,
                    "phone": params.phone,
                    "name": params.name,
                    "address":params.address
                }
                const res1 = await _function.postAPI('account/sign_up', body, res.token)
                if (res1.code == 400) {
                    alert('Số điện thoại đã được tạo bởi người khác', 'Vui lòng quay lại bước đăng ký')
                } else if (res1.code == 401) {
                    alert('Username đã được tạo bởi người khác', 'Vui lòng quay lại bước đăng ký')
                } else if (res1.code == 402) {
                    alert('Email đã được tạo bởi người khác', 'Vui lòng quay lại bước đăng ký')
                } else if (res1.code == 202) {
                    dispatch(updateToken(res1.token))
                    
                    Alert.alert(
                        'Thông báo',
                        'Thêm tài khoản thành công',
                        [
                            { text: "OK", onPress: ()=> getData(res1.token) }
                        ]
                    );
                }

            } else {
                dispatch(updateToken(res.token))
                setIsEmailCheck(true)
            }
        }
    }

    const clickConfirmCode = async () => {
        if (isEmailCheck) {
            const body = {
                'smsCode': phoneCode,
                'smsState': 2
            }

            const res = await _function.postAPI('account/register', body, token)
            nextStep(res)
        } else {
            const body = {
                'emailCode': emailCode,
                'emailState': 2
            }
            const res = await _function.postAPI('account/register', body, token)
            nextStep(res)
        }

    }

    return (
        <ScrollView>
            <View style={styles.wrapper} >
                <View style={styles.body}>
                    <Text style={styles.textTitle} > Mã xác thực trong email: </Text>
                    <TextInput
                        style={styles.textInput}
                        value={emailCode}
                        onChangeText={text => setEmailCode(text)}
                        keyboardType='numeric'
                        underlineColorAndroid="transparent"
                    />

                    {isEmailCheck ? (
                        <>
                            <Text style={styles.textTitle} > Mã xác thực trong tin nhắn: </Text>
                            <TextInput
                                style={styles.textInput}
                                value={phoneCode}
                                onChangeText={text => setPhoneCode(text)}
                                keyboardType='numeric'
                                underlineColorAndroid="transparent"
                            />
                        </>
                    ) : null}


                    <TouchableOpacity style={styles.signInContainer} onPress={clickConfirmCode} >
                        <Text style={styles.signInTextStyle}>Xác thực</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </ScrollView>
    )
}