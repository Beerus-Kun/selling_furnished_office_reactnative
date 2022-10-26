import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropDownPicker from 'react-native-dropdown-picker';
import { Text, TextInput, View, Dimensions, Button, Alert } from "react-native";
import _function from "../public/function";
const { width, height } = Dimensions.get('window')
export default function NewCategory() {
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
    const [open1, setOpen1] = useState(false);
    const [items1, setItems1] = useState([
        { label: 'Bàn', value: 'Bàn' },
        { label: 'Ghế', value: 'Ghế' },
    ]);
    const [name, setName] = useState('')
    const [type, setType] = useState('')

    const [month, setMonth] = useState(0)
    const token = useSelector((state) => state.account.token)
    function currencyFormat(num) {
        // sendMessage()
        try {
            num = String(num)
            num = num.replace(/,/g, '')
            num = parseInt(num)
            if (isNaN(num)) num = 0
            var money = num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return money;
        } catch (e) {
            console.log(e)
        }
    }

    function toNum(num) {
        // sendMessage()
        try {
            num = String(num)
            num = num.replace(/,/g, '')
            num = parseInt(num)
            if (isNaN(num)) num = 0
            // var money = num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return num;
        } catch (e) {
            console.log(e)
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

    const addCoupon = async () => {
        if (type && name) {
            const res = await _function.postAPI(`product/category?type=${type}&name=${name}`, {}, token)
            if (res.code == 200) {
                alert("Thành công", "Bạn tạo loại sản phẩm thành công ")
                setName('')
            }
        } else {
            var noti = ''
            if (!name)
                noti += "Nhập tên loại sản phẩm\n"

            if (!type)
                noti += 'Chọn bàn hoặc ghế\n'

            alert("Thông báo", noti)

        }


    }

    return (
        <View>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, color: 'green' }}>Bàn/ ghế</Text>
            <View style={{ marginLeft: 20, marginTop: 10, fontSize: 15, width: width * 0.5, height: 30, zIndex: 1 }}>
                <DropDownPicker
                    open={open1}
                    value={type}
                    items={items1}
                    setOpen={setOpen1}
                    setValue={setType}
                    setItems={setItems1}
                />
            </View>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, color: 'green' }}>Tên loại sản phẩm</Text>
            <View style={{ flexDirection: "row" }}>
                <TextInput
                    style={{ marginLeft: 20, marginTop: 10, fontSize: 15, width: width * 0.5, height: 30, borderWidth: 0.5 }}
                    value={name}
                    onChangeText={text => setName(text)}
                    // keyboardType='numeric'
                />
            </View>

            <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title="Thêm loại sản phẩm"
                    onPress={addCoupon}
                />
            </View>
        </View>
    )
}