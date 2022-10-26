import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextInput, View, Dimensions, Button, Alert } from "react-native";
import _function from "../public/function";
const { width, height } = Dimensions.get('window')
export default function PublicCoupon() {
    const [value, setValue] = useState(0)
    const [amount, setAmount] = useState(0)
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
        var intMonth = toNum(month)
        var intvalue = toNum(value)
        var intAmount = toNum(amount)
        if(toNum(value) > 10000 && toNum(amount)>0 && toNum(month)>0){
            const body={
                month: intMonth,
                value: intvalue,
                amount: intAmount
            }
            const res = await _function.postAPI('bill/new-public-coupon',body, token)
            if(res.code == 200){
                alert("Thành công","Bạn tạo mã thành công, mã của bạn là: " + res.coupon)
                setValue(0)
                setMonth(0)
                setAmount(0)
            }
        }else{
            var noti = ''
            if(toNum(value)<=10000)
                noti += "Tiền giảm phải lớn hơn 10,000 VND\n"

            if(toNum(amount)<=0)
                noti += 'Số lượng mã phải lớn hơn 0\n'
            
            if(toNum(month)<=0)
                noti += 'Hiệu lực ít nhất 1 tháng\n'

            alert("Thông báo", noti)

        }
        
        
    }

    return (
        <View>
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, color: 'green' }}>Số tiền giảm của mã</Text>
            <View style={{flexDirection:"row"}}>
                <TextInput
                    style={{ marginLeft: 20, marginTop: 10, fontSize: 15, width: width * 0.5, height: 30, borderWidth: 0.5 }}
                    value={currencyFormat(value)}
                    onChangeText={text => setValue(text)}
                    keyboardType='numeric'
                />
                <Text style={{marginLeft:5, fontSize: 15, marginTop: 10}} >VND</Text>
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
            <Text style={{ marginLeft: 20, marginTop: 20, fontSize: 20, color: 'green' }}>Thời hạn của mã (tháng)</Text>
            <View style={{flexDirection:"row"}}>
                <TextInput
                    style={{ marginLeft: 20, marginTop: 10, fontSize: 15, width: width * 0.5, height: 30, borderWidth: 0.5 }}
                    value={currencyFormat(month)}
                    onChangeText={text => setMonth(text)}
                    keyboardType='numeric'
                />
                <Text style={{marginLeft:5, fontSize: 15, marginTop: 10}} >tháng</Text>
            </View>

            <View style={{marginTop: 20, justifyContent: 'center', alignItems:'center'}}>
                <Button
                    title="Thêm mã"
                    onPress={addCoupon}
                />
            </View>
        </View>
    )
}