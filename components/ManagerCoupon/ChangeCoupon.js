import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View, Dimensions, Button, Alert } from "react-native";
import _function from "../public/function";
import publicStyle from '../public/style'
const { width, height } = Dimensions.get('window')
export default function ChangeCoupon({route}) {
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(String(route.params.item.quantity))
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

    const addCoupon = async()=>{
        // if((value))
        var intAmount = toNum(amount)

        if(intAmount < 0){
            alert("Thông báo", "Số lượng không được nhỏ hơn 0")
        }else{
            const res = await _function.putAPI(`bill/coupon?id=${route.params.item.id_coupon}&quantity=${amount}`, {}, token)
            if(res.code == 200){
                alert("Thông báo", "Thay đổi thành công")
            }
        }
        
    }

    return (
        <View>
            <View style={publicStyle.twoSide}>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, color: 'green' }}>Mã giảm giá</Text>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, marginRight: 20 }}>{route.params.item.id_coupon}</Text>
            </View>

            <View style={publicStyle.twoSide}>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, color: 'green' }}>Giá trị mã</Text>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, marginRight: 20 }}>{_function.currencyFormat(route.params.item.value)}</Text>
            </View>

            <View style={publicStyle.twoSide}>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, color: 'green' }}>Giờ hết hạn</Text>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, marginRight: 20 }}>{route.params.item.time}</Text>
            </View>

            <View style={publicStyle.twoSide}>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, color: 'green' }}>Ngày hết hạn</Text>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, marginRight: 20 }}>{route.params.item.date}</Text>
            </View>

            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, color: 'green' }}>Số lượng của mã</Text>
            <View style={{flexDirection:"row"}}>
                <TextInput
                    style={{ marginLeft: 20, marginTop: 10, fontSize: 15, width: width * 0.5, height: 30, borderWidth: 0.5 }}
                    value={currencyFormat(amount)}
                    onChangeText={text => setAmount(text)}
                    keyboardType='numeric'
                />
                {/* <Text style={{marginLeft:5, fontSize: 15, marginTop: 10}} >VND</Text> */}
            </View>


            <View style={{marginTop: 20, justifyContent: 'center', alignItems:'center'}}>
                <Button
                    title="Thay đổi"
                    onPress={addCoupon}
                />
            </View>
        </View>
    )
}