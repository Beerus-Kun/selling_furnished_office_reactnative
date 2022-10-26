import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TextInput, TouchableOpacity, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import styles from './style';
import { RadioButton } from 'react-native-paper';
import { updateToken } from "../public/Redux/accountSlices";
import _function from "../public/function";
// import global from "../../global";


export default function Register({ navigation }) {
    const [isLoad, setIsLoad] = useState(false);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(0);
    const [address, setAddress] = useState('')
    const [repassword, setRepassword] = useState('');
    const [nameMess, setNameMess] = useState('')
    const [phoneMess, setPhoneMess] = useState('')
    const [emailMess, setEmailMess] = useState('')
    const [usernameMess, setUsernameMess] = useState('')
    const [passwordMess, setPasswordMess] = useState('')
    const [repasswordMess, setRepasswordMess] = useState('')
    const [temptToken, setTempToken] = useState('new')
    const [isClick, setIsClick] = useState(false)
    const dispatch = useDispatch()

    // const _function.postAPI = async (link, body, token = temptToken) => {
    //     const req = await fetch(link, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + token
    //         },
    //         body: JSON.stringify(body)
    //     })
    //     return req.json()
    // }


    const clearMess = () => {
        setNameMess('')
        setPhoneMess('')
        setEmailMess('')
        setUsernameMess('')
        setPasswordMess('')
        setRepasswordMess('')
    }


    const onSignup = async () => {

        // setIsLoad(true);

        clearMess()

        if (!name) {
            setNameMess("Vui lòng nhập họ và tên")
        }

        if (phone) {
            const body = {
                'phone': phone,
                "smsState": 0
            }
            const res = await _function.postAPI('account/register', body, temptToken)

            if (res.code == 405) {
                setPhoneMess("Số điện thoại sai định dạng")
            } else if (res.code == 402) {
                setPhoneMess("Số điện thoại này đã được sử dụng")
            }
        } else {
            setPhoneMess('Vui lòng nhập số điện thoại')
        }

        if (email) {
            const body = {
                'email': email,
                "emailState": 0
            }
            const res = await _function.postAPI('account/register', body, temptToken)

            if (res.code == 405) {
                setEmailMess("Email sai định dạng")
            } else if (res.code == 402) {
                setEmailMess("Email này đã được sử dụng")
            }
        } else {
            setEmailMess('Vui lòng nhập Email')
        }

        if (username) {
            const body = {
                'username': username
            }
            const res = await _function.postAPI('account/register', body, temptToken)

            if (res.code == 401) {
                setUsernameMess("Tên đăng nhập đã được sử dụng")
            }
        } else {
            setUsernameMess('Vui lòng nhập tên đăng nhập')
        }

        if (password) {
            if (password.length < 6) {
                setPasswordMess("Vui lòng nhập từ 6 ký tự")
            }
        } else {
            setPasswordMess("Vui lòng nhập mật khẩu")
        }

        if (repassword) {
            if (repassword != password) {
                setRepasswordMess("Mật khẩu nhập lại không trùng khớp")
            }
        } else {
            setRepasswordMess("Vui lòng nhập lại mật khẩu")
        }

        const body = {
            "email": email,
            "phone": phone,
            "smsState": 1,
            "emailState": 1,
            "username": username,
            "address":address
        }

        const res1 = await _function.postAPI('account/register', body, temptToken)
        // console.log(res)
        if (res1.code == 202) {
            dispatch(updateToken(res1.token))
            navigation.navigate('verification', {
                username: username,
                password: password,
                gender: gender,
                email: email,
                phone: phone,
                name: name,
                address: address
            })
        }

        // setIsLoad(false);
    }

    return (
        <View>
            {isLoad ? (<ActivityIndicator size="large" color='red' />) : null}

            <ScrollView style={styles.scroll} >
                <Text style={styles.text}>Họ và tên</Text>
                {nameMess ? (
                    <Text style={styles.textErr}>
                        *{nameMess}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChangeText={text => setName(text)}
                />


                <Text style={styles.text} >Số điện thoại</Text>
                {phoneMess ? (
                    <Text style={styles.textErr}>
                        *{phoneMess}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    keyboardType='numeric'
                    placeholder="0123456789"
                    value={phone}
                    onChangeText={text => setPhone(text)}
                    maxLength={10}
                />

                <Text style={styles.text} >Giới tính</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <RadioButton
                            color='black'
                            status={gender == 1 ? 'checked' : 'unchecked'}
                            onPress={() => setGender(1)}
                        />
                        <Text style={styles.radioText} >Nam</Text>
                    </View>

                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <RadioButton
                            color='black'
                            status={gender == 0 ? 'checked' : 'unchecked'}
                            onPress={() => setGender(0)}
                        />
                        <Text style={styles.radioText} >Nữ</Text>
                    </View>

                </View>

                <Text style={styles.text}>Địa chỉ email</Text>
                {emailMess ? (
                    <Text style={styles.textErr}>
                        *{emailMess}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="abc@gmail.com"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <Text style={styles.text}>Địa chỉ</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="97 Man Thiện"
                    value={address}
                    onChangeText={text => setAddress(text)}
                />

                <Text style={styles.text}>Tên đăng nhập</Text>
                {usernameMess ? (
                    <Text style={styles.textErr}>
                        *{usernameMess}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />

                <Text style={styles.text} >Mật khẩu</Text>
                {passwordMess ? (
                    <Text style={styles.textErr}>
                        *{passwordMess}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Mật khẩu có ít nhất 6 ký tự"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <Text style={styles.text} >Nhập lại mật khẩu</Text>
                {repasswordMess ? (
                    <Text style={styles.textErr}>
                        *{repasswordMess}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Mật khẩu có ít nhất 6 ký tự"
                    value={repassword}
                    onChangeText={text => setRepassword(text)}
                    secureTextEntry
                />

                {/* {isErr ? (<View style={styles.messContainer} ><Text style={styles.mess} > Vui lòng điền thông tin lại </Text></View>) : null} */}

                <View style={styles.regButton}>
                    <TouchableOpacity style={styles.bigButton} onPress={onSignup}>
                        <Text style={styles.buttonText}>Tạo tài khoản</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 50 }} />
            </ScrollView>
        </View>
    )
}