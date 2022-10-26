import React, { useEffect, useState } from 'react';
import {
  View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView, FlatList, ActivityIndicator, RefreshControl
} from 'react-native';
import _function from '../public/function';
import { useDispatch, useSelector } from "react-redux";

// import Global from '../../../Global';

const { width } = Dimensions.get('window');

export default function OrderHistory({ navigation }) {
  const { wrapper, body, orderRow } = styles;
  const [data, setData] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const token = useSelector((state) => state.account.token)

  const getData = async () => {
    const res = await _function.getAPI('bill/historyB', token)
    if(res.code == 200){
      setData(res.data)
    }
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <View style={wrapper}>
      <View style={body}>

        <FlatList

          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getData}
            />
          }

          keyExtractor={(item) => item.id_bill.toString()}
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity style={orderRow} onPress={() => { navigation.navigate('detailBill', { info: item }) }} >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Mã đơn hàng:</Text>
                <Text style={{ color: '#2ABB9C' }}>{item.id_bill}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Ngày mua hàng:</Text>
                <Text style={{ color: '#C21C70' }}> {item.date} </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Giờ mua hàng:</Text>
                <Text style={{ color: '#2ABB9C' }}> {item.time} </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Địa chỉ giao hàng:</Text>
                <Text style={{ color: '#C21C70', maxWidth: width * 0.5, textAlign: 'right' }}> {item.address} </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Trạng thái đơn hàng:</Text>
                <Text style={{ color: '#2ABB9C' }}> {_function.getStatus(item.id_status)} </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Giảm giá:</Text>
                <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{_function.currencyFormat(item.discount ? (item.discount*-1) : 0)} </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tổng tiền:</Text>
                <Text style={{ color: '#2ABB9C' }}> {_function.currencyFormat(item.total)} </Text>
              </View>

            </TouchableOpacity>

          )}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  body: { flex: 10, backgroundColor: '#F6F6F6' },
  orderRow: {
    backgroundColor: '#FFF',
    margin: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#DFDFDF',
    shadowOpacity: 0.2,
    padding: 10,
    borderRadius: 2,
    justifyContent: 'space-around'
  }
});