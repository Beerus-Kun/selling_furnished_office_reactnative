import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TextInput, TouchableOpacity, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import styles from './style';
import { RadioButton } from 'react-native-paper';
import { updateToken } from "../public/Redux/accountSlices";
import _function from "../public/function";
// import global from "../../global";


export default function RegisterManager({ navigation }) {
    const [isLoad, setIsLoad] = useState(false);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState(0);
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
    const token = useSelector((state) => state.account.token)


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

        if (email && username && name) {
            const body = {
                username: username,
                email: email,
                name: name,
                gender: gender
            }
            const res = await _function.postAPI(`account/create_staff`, body, token)

            if (res.code == 404) {
                setEmailMess("Địa chỉ email không đúng định dạng")
            } else if (res.code == 402 || res.code == 400 || res.code == 401) {
                setUsernameMess("Tên đăng nhập đã được sử dụng")
            } else if (res.code == 201) {
                alert("Tạo tài khoản thành công")
                setEmail('')
                setUsername('')
                setName('')
            }
        } else {
            if (!email)
                setEmailMess('Vui lòng nhập email')
            if (!username)
                setUsernameMess('Vui lòng nhập tên đăng nhập')
            if(!name)
                setNameMess('Vui lòng nhập họ và tên')
        }


        // setIsLoad(false);
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
                    value={email}
                    onChangeText={text => setEmail(text)}
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