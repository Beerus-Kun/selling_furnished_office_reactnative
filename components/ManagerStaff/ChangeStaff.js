import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TextInput, TouchableOpacity, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import styles from './style';
import { RadioButton } from 'react-native-paper';
import { updateToken } from "../public/Redux/accountSlices";
import _function from "../public/function";
// import global from "../../global";


export default function ChangeStaff({ navigation, route }) {
    // console.log(route.params.item)
    const [isLoad, setIsLoad] = useState(false);

    const [name, setName] = useState(route.params.item.name);
    const [email, setEmail] = useState(route.params.item.email);
    const [username, setUsername] = useState(route.params.item.username);
    const [gender, setGender] = useState(route.params.item.gender);
    const [status, setStat] = useState(route.params.item.status)
    const [nameMess, setNameMess] = useState('')
    const [emailMess, setEmailMess] = useState('')
    const [usernameMess, setUsernameMess] = useState('')

    const token = useSelector((state) => state.account.token)

    const clearMess = () => {
        setNameMess('')
        setPhoneMess('')
        setEmailMess('')
        setUsernameMess('')
        setPasswordMess('')
        setRepasswordMess('')
    }

    const deleteStaff = async () => {
        setIsLoad(true)
        const body = {
            username: username,
            email: email,
            name: name,
            gender: gender
        }
        const res = await _function.putAPI(`account/delete_staff`, body, token)

        if (res.code == 200) {
            alert("Khóa tài khoản thành công")
            setStat(true)
        }
        setIsLoad(false)
    }

    const onDelete = () => {
        Alert.alert(
            "Thông báo",
            "Bạn có chắc muốn khóa tài khoản này không?",
            [
                {
                    text: "Không",
                    // onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Có", onPress: () => deleteStaff() }
            ]
        );
    }

    const restoreStaff = async ()=>{
        setIsLoad(true)
        const body = {
            username: username,
            email: email,
            name: name,
            gender: gender
        }
        const res = await _function.putAPI(`account/restore_staff`, body, token)

        if (res.code == 200) {
            alert("Khôi phục thành công")
            setStat(false)
            // route.params.item.status = false
        }
        setIsLoad(false)
    }

    const onRestore = ()=>{
        Alert.alert(
            "Thông báo",
            "Bạn có chắc muốn khôi phục tài khoản này không?",
            [
                {
                    text: "Không",
                    // onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Có", onPress: () => restoreStaff() }
            ]
        );
    }


    const onSignup = async () => {

        setIsLoad(true);

        clearMess()

        if (email && username && name) {
            const body = {
                username: username,
                email: email,
                name: name,
                gender: gender
            }
            const res = await _function.putAPI(`account/staff`, body, token)

            if (res.code == 200) {
                alert("Đổi thông tin thành công")
            }
        } else {
            if (!email)
                setEmailMess('Vui lòng nhập email')
            if (!username)
                setUsernameMess('Vui lòng nhập tên đăng nhập')
            if (!name)
                setNameMess('Vui lòng nhập họ và tên')
        }


        setIsLoad(false);
    }

    return (
        <View>
            {isLoad ? (<ActivityIndicator size="large" color='red' />) : null}

            <ScrollView style={styles.scroll} >

                <Text style={styles.text}>Email nhân viên</Text>
                {emailMess ? (
                    <Text style={styles.textErr}>
                        *{emailMess}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="abc@gmail.com"
                    editable={false}
                    value={email}
                    onChangeText={text => setEmail(text)}
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
                    editable={false}
                    onChangeText={text => setUsername(text)}
                />

                <Text style={styles.text}>Họ và tên Nhân viên:</Text>
                {nameMess ? (
                    <Text style={styles.textErr}>
                        *{nameMess}
                    </Text>
                ) : null}
                <TextInput
                    style={styles.inputStyle}
                    placeholder="Nguyễn Văn A"
                    editable={!status}
                    value={name}
                    onChangeText={text => setName(text)}
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

                {status ? (
                    <View style={styles.regButton1}>
                        <TouchableOpacity style={styles.bigButton} onPress={onRestore}>
                            <Text style={styles.buttonText}>Khôi phục tài khoản</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 50 }}>

                        <View style={styles.regButton}>
                            <TouchableOpacity style={styles.bigButton} onPress={onSignup}>
                                <Text style={styles.buttonText}>Đổi thông tin</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.regButton}>
                            <TouchableOpacity style={styles.bigButton1} onPress={onDelete}>
                                <Text style={styles.buttonText}>Khóa tài khoản</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}


                <View style={{ padding: 50 }} />
            </ScrollView>
        </View>
    )
}