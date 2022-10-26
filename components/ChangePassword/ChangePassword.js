import React, { Component } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Alert, Dimensions } from 'react-native';
import _function from '../public/function';
// import Global from '../../../Global';
const { width, height } = Dimensions.get('window');

export default function ChangePassword() {
    const [oldPassowrd, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [reNewPassword, setReNewPassword] = useState('')
    const {
        wrapper, header, headerTitle, backIconStyle, body, textTitle,
        signInContainer, signInTextStyle, textInput
    } = styles;

    const token = useSelector((state) => state.account.token)
    const alert = (title, content) => {
        Alert.alert(
            title,
            content,
            [
                { text: "OK" }
            ]
        );
    }

    async function clickChangePassword() {
        if (newPassword.length < 6) {
            Alert.alert(
                "Thông báo",
                "Mật khẩu không ít hơn 6 ký tự",
                [
                    { text: "Đồng ý" }
                ]
            );
        } else if (newPassword === reNewPassword) {
            const body ={
                oldPassword: oldPassowrd,
                newPassword: newPassword
            }
            const res = await _function.putAPI('account/password', body, token)
            if(res.code == 404){
                alert("Sai mật khẩu", "Mật khẩu cũ bạn nhập sai.\nVui lòng nhập lại")
                // setOldPassword("Sai mật khẩu")
            }else if(res.code == 200){
                alert("Thành công", "Bạn đổi mật khẩu thành công")
                setNewPassword('')
                setOldPassword('')
                setReNewPassword('')
            }
            
        } else {
            Alert.alert(
                "Thông báo",
                "Mật khẩu nhập lại không đúng",
                [
                    { text: "Đồng ý" }
                ]
            );
        }
    }

    return (
        <View>
            <View style={wrapper} >
                <View style={body}>
                    <Text style={textTitle} > Mật khẩu cũ: </Text>
                    <TextInput
                        style={textInput}
                        placeholder="Nhập mật khẩu cũ"
                        autoCapitalize="none"
                        value={oldPassowrd}
                        onChangeText={text => setOldPassword(text)}
                        underlineColorAndroid="transparent"
                        secureTextEntry
                    />

                    <Text style={textTitle} > Mật khẩu mới: </Text>
                    <TextInput
                        style={textInput}
                        placeholder="Nhập mật khẩu mới"
                        autoCapitalize="none"
                        value={newPassword}
                        onChangeText={text => setNewPassword(text)}
                        underlineColorAndroid="transparent"
                        secureTextEntry
                    />

                    <Text style={textTitle} > Nhập lại mật khẩu mới: </Text>
                    <TextInput
                        style={textInput}
                        placeholder="Nhập lại mật khẩu mới"
                        autoCapitalize="none"
                        value={reNewPassword}
                        onChangeText={text => setReNewPassword(text)}
                        underlineColorAndroid="transparent"
                        secureTextEntry
                    />
                    <TouchableOpacity style={signInContainer} onPress={clickChangePassword} >
                        <Text style={signInTextStyle}>Đổi mật khẩu</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    wrapper: { height: height * 0.8, width, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'sans-serif-medium', color: '#fff', fontSize: 20 },
    backIconStyle: { width: 30, height: 30 },
    body: { flex: 10, backgroundColor: '#F6F6F6', justifyContent: 'center' },
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'sans-serif-medium',
        paddingLeft: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#2ABB9C',
        borderWidth: 1
    },
    signInTextStyle: {
        color: '#FFF', fontFamily: 'sans-serif-medium', fontWeight: '600', paddingHorizontal: 20
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#2ABB9C',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    signInStyle: {
        flex: 3,
        marginTop: 50
    },
    textTitle: {
        color: 'green', fontFamily: 'sans-serif-medium', fontWeight: '600', padding: 10, fontSize: 17, paddingLeft: 25,
    }
});