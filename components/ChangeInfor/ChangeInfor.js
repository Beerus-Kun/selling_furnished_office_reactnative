import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TextInput, TouchableOpacity, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import styles from './style';
import { RadioButton } from 'react-native-paper';
import { updateToken } from "../public/Redux/accountSlices";
import { login } from "../public/Redux/accountSlices";
import _function from "../public/function";
// import global from "../../global";


export default function ChangeInfor({ navigation }) {
    const [isLoad, setIsLoad] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState(0);
    const [address, setAddress] = useState('')
    const [nameMess, setNameMess] = useState('')
    const [emailMess, setEmailMess] = useState('')
    const dispatch = useDispatch();

    const emailR = useSelector((state) => state.account.email)
    const phoneR = useSelector((state) => state.account.phone)
    const nameR = useSelector((state) => state.account.name)
    const addressR = useSelector((state) => state.account.address)
    const token = useSelector((state) => state.account.token)

    useEffect(() => {
        setEmail(emailR)
        setName(nameR)
        setAddress(addressR)
    }, [])


    const clearMess = () => {
        setNameMess('')
        setEmailMess('')
    }


    const onSignup = async () => {
        // setIsLoad(true);

        clearMess()
        if (name && email && address) {
            const body = {
                "email": email,
                "phone": phoneR,
                "address": address,
                "gender": gender,
                "name": name
            }

            const res1 = await _function.putAPI('account/info', body, token)
            // console.log(res)
            if (res1.code == 202) {
                alert("Đổi thông tin thành công")
                const responseJson = await _function.getAPI('account/info', token)

                dispatch(login(responseJson))
            } else if (res1.code == 402) {
                setEmailMess('Địa chỉ email đã được sử dụng')
            }

        } else {
            if (!name) {
                setNameMess("Vui lòng nhập họ và tên")
            }
            if (!email) {
                setEmailMess('Vui lòng nhập Email')
            }
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
                    editable={false}
                />

                <Text style={styles.text}>Địa chỉ</Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder="97 Man Thiện"
                    value={address}
                    onChangeText={text => setAddress(text)}
                />

                {/* {isErr ? (<View style={styles.messContainer} ><Text style={styles.mess} > Vui lòng điền thông tin lại </Text></View>) : null} */}

                <View style={styles.regButton}>
                    <TouchableOpacity style={styles.bigButton} onPress={onSignup}>
                        <Text style={styles.buttonText}>Đổi thông tin</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 50 }} />
            </ScrollView>
        </View>
    )
}