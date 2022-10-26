import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, Image, Alert } from 'react-native';
import { login } from "../public/Redux/accountSlices";
import { useDispatch } from 'react-redux';
import styles from './style';
import _function from "../public/function";
// import global from "../../global";
// import firebase from '../../Firebase'

export default function Loggin({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isErr, setIsErr] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const dispatch = useDispatch();

    const errFromAPI = (res) => {

    }

    const getData = async (token) => {
        const responseJson = await _function.getAPI('account/info', token)
        responseJson.token = token
        dispatch(login(responseJson))
        navigation.popToTop()
    }

    const onSignIn = async () => {
        // dispatch(updateIsLog(true))
        // navigation.popToTop()

        if (username && password) {
            const body = {
                'username': username,
                'password': password
            }
            const responseJson = await _function.postAPI('account/sign_in', body)
            if (responseJson.code == 202) {
                getData(responseJson.token)
            } else {
                setMessage("Tài khoản hoặc mật khẩu sai")
            }
            // await fetch(`account/sign_in`, {
            //     method: 'POST',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //         // 'Authorization': `Bearer ${resAPI.accessToken}`
            //     },
            //     body: JSON.stringify({
            //         'username': username,
            //         'password': password
            //     })
            // })
            //     .then((response) => response.json())
            //     .then((responseJson) => {
            //         if(responseJson.code == 202){
            //             getData(responseJson.token)
            //         }else{
            //             setMessage("Tài khoản hoặc mật khẩu sai")
            //         }
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        } else {
            setMessage("Vui lòng nhập đủ thông tin")
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.mainSection}>
                <Text style={styles.text}>Username</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Email hoặc sdt hoặc username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <Text style={styles.text} >Mật khẩu</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Mật khẩu có ít nhất 6 ký tự"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />

                {message ? (<View style={styles.messContainer} ><Text style={styles.mess} > {message} </Text></View>) : null}

                <View style={styles.loginButton}>
                    <TouchableOpacity style={styles.bigButton} onPress={onSignIn}>
                        <Text style={styles.buttonText}>Đăng nhập</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.extraFeature}>
                    <Text onPress={() => { navigation.navigate('register') }} style={styles.forgot}>Đăng ký tài khoản</Text>
                    <Text onPress={() => { navigation.navigate('forgot') }} style={styles.forgot}>Quên mật khẩu</Text>
                </View>
            </View>
        </View>
    )
}