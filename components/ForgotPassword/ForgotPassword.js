import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Alert, ScrollView, RefreshControl, Dimensions } from 'react-native';
import styles from './style';
import _function from '../public/function'

export default function ForgotPassword({navigation}) {
    const [isSend, setIsSend] = useState(false);
    const [username, setUsername] = useState('');
    const [code, setCode] = useState('');
    const [editableUsername, setEditableUsername] = useState(true);
    const [password, setPassword] = useState('');
    const [tempToken, setTempToken] = useState('new')

    //     username, code, new_password
    //     409, 202, 415, 416, 400, 414, 213

    const clickConfirmCode = async () => {
        if(password.length < 6){
            Alert.alert(
                "Thông báo",
                "Mật khẩu phải từ 6 ký tự",
                [
                    { text: "OK"}
                ]
            );
        }else{
            const body = {
                'username':username,
                'smsCode': code
            }
            const res = await _function.postAPI(`account/forgot?pw=${password}`, body, tempToken)
            if(res.code == 200){
                Alert.alert(
                    "Thành công",
                    "Đổi mật khẩu thành công",
                    [
                        { text: "OK", onPress: navigation.popToTop()}
                    ]
                );
            }else if(res.code == 406){
                Alert.alert(
                    "Sai mã",
                    "Vui lòng nhập lại mã",
                    [
                        { text: "OK"}
                    ]
                );
            }
        }
        
    }

    const clickSendCode = async () => {
        const body = {
            'username':username
        }
        const res = await _function.postAPI(`account/forgot`, body, tempToken)
        if(res.code == 202){
            setTempToken(res.token)
            setIsSend(true)
            setEditableUsername(false)
        }else if(res.code == 400){
            Alert.alert(
                "Thông báo",
                "Sai username",
                [
                    { text: "OK"}
                ]
            );
        }

    }

    return (
        <ScrollView>
            <View style={styles.wrapper} >
                <View style={styles.body}>
                    <Text style={styles.textTitle} > Username: </Text>
                    <TextInput
                        style={styles.textInput}
                        // placeholder="Email/ SDT/ username"
                        autoCapitalize="none"
                        value={username}
                        onChangeText={text => setUsername(text)}
                        underlineColorAndroid="transparent"
                        editable={editableUsername}
                    />

                    {isSend ? (
                        <View>
                            <View>
                                <Text style={styles.textTitle} > Nhập mã: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Nhập mã xác nhận"
                                    autoCapitalize="none"
                                    value={code}
                                    keyboardType='numeric'
                                    onChangeText={text => setCode(text)}
                                    underlineColorAndroid="transparent"
                                />
                            </View>
                            <View>
                                <Text style={styles.textTitle} > Nhập mật khẩu mới: </Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="mật khẩu có hơn 6 ký tự"
                                    // autoCapitalize="none"
                                    value={password}
                                    // keyboardType='numeric'
                                    onChangeText={text => setPassword(text)}
                                    underlineColorAndroid="transparent"
                                    secureTextEntry
                                />
                            </View>
                        </View>


                    ) : null}

                    {isSend ? (
                        <TouchableOpacity style={styles.signInContainer} onPress={clickConfirmCode} >
                            <Text style={styles.signInTextStyle}>Đổi mật khẩu</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.signInContainer} onPress={clickSendCode} >
                            <Text style={styles.signInTextStyle}>Nhận mã</Text>
                        </TouchableOpacity>
                    )}

                </View>
            </View>

        </ScrollView>
    )
}