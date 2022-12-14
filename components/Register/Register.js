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
            setNameMess("Vui l??ng nh???p h??? v?? t??n")
        }

        if (phone) {
            const body = {
                'phone': phone,
                "smsState": 0
            }
            const res = await _function.postAPI('account/register', body, temptToken)

            if (res.code == 405) {
                setPhoneMess("S??? ??i???n tho???i sai ?????nh d???ng")
            } else if (res.code == 402) {
                setPhoneMess("S??? ??i???n tho???i n??y ???? ???????c s??? d???ng")
            }
        } else {
            setPhoneMess('Vui l??ng nh???p s??? ??i???n tho???i')
        }

        if (email) {
            const body = {
                'email': email,
                "emailState": 0
            }
            const res = await _function.postAPI('account/register', body, temptToken)

            if (res.code == 405) {
                setEmailMess("Email sai ?????nh d???ng")
            } else if (res.code == 402) {
                setEmailMess("Email n??y ???? ???????c s??? d???ng")
            }
        } else {
            setEmailMess('Vui l??ng nh???p Email')
        }

        if (username) {
            const body = {
                'username': username
            }
            const res = await _function.postAPI('account/register', body, temptToken)

            if (res.code == 401) {
                setUsernameMess("T??n ????ng nh???p ???? ???????c s??? d???ng")
            }
        } else {
            setUsernameMess('Vui l??ng nh???p t??n ????ng nh???p')
        }

        if (password) {
            if (password.length < 6) {
                setPasswordMess("Vui l??ng nh???p t??? 6 k?? t???")
            }
        } else {
            setPasswordMess("Vui l??ng nh???p m???t kh???u")
        }

        if (repassword) {
            if (repassword != password) {
                setRepasswordMess("M???t kh???u nh???p l???i kh??ng tr??ng kh???p")
            }
        } else {
            setRepasswordMess("Vui l??ng nh???p l???i m???t kh???u")
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
                <Text style={styles.text}>H??? v?? t??n</Text>
                {nameMess ? (
                    <Text style={styles.textErr}>
                        *{nameMess}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Nguy???n V??n A"
                    value={name}
                    onChangeText={text => setName(text)}
                />


                <Text style={styles.text} >S??? ??i???n tho???i</Text>
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

                <Text style={styles.text} >Gi???i t??nh</Text>
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
                        <Text style={styles.radioText} >N???</Text>
                    </View>

                </View>

                <Text style={styles.text}>?????a ch??? email</Text>
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

                <Text style={styles.text}>?????a ch???</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="97 Man Thi???n"
                    value={address}
                    onChangeText={text => setAddress(text)}
                />

                <Text style={styles.text}>T??n ????ng nh???p</Text>
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

                <Text style={styles.text} >M???t kh???u</Text>
                {passwordMess ? (
                    <Text style={styles.textErr}>
                        *{passwordMess}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="M???t kh???u c?? ??t nh???t 6 k?? t???"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                <Text style={styles.text} >Nh???p l???i m???t kh???u</Text>
                {repasswordMess ? (
                    <Text style={styles.textErr}>
                        *{repasswordMess}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="M???t kh???u c?? ??t nh???t 6 k?? t???"
                    value={repassword}
                    onChangeText={text => setRepassword(text)}
                    secureTextEntry
                />

                {/* {isErr ? (<View style={styles.messContainer} ><Text style={styles.mess} > Vui l??ng ??i???n th??ng tin l???i </Text></View>) : null} */}

                <View style={styles.regButton}>
                    <TouchableOpacity style={styles.bigButton} onPress={onSignup}>
                        <Text style={styles.buttonText}>T???o t??i kho???n</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 50 }} />
            </ScrollView>
        </View>
    )
}