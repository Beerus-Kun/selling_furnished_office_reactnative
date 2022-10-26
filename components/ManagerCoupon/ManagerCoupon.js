import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, StyleSheet, TextInput, Modal, FlatList, TouchableOpacity, Alert, Dimensions, RefreshControl } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import { useDispatch, useSelector } from "react-redux";
import Constants from 'expo-constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import publicStyle from '../public/style'
import func from '../public/function'
import color from '../public/color';
import _function from '../public/function'
const { width, height } = Dimensions.get('window');
export default function ManagerCoupon({navigation}) {
  const [value, setValue] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const token = useSelector((state) => state.account.token)
  const loadDataOnlyOnce = async () => {
    setRefreshing(true)
    const res = await func.getAPI("bill/coupon2", token)
    if (res.code == 200) {
      setData(res.data)
    }

    setRefreshing(false)
  };

  const loadAgain = async () => {
    setRefreshing(true)
    const res = await func.getAPI("bill/coupon2", token)
    if (res.code == 200) {
      setData(res.data)
    }

    setRefreshing(false)
  };

  const search = async () => {
    setRefreshing(true)
    const res = await _function.getAPI(`bill/search-coupon?search=${name}`, token)
    if(res.code == 200){
      setData(res.data)
      
    }
    setRefreshing(false)
  }


  useEffect(() => {
    loadDataOnlyOnce(); // this will fire only on first render
  }, []);

  useEffect(() => {
    loadAgain()
  }, [value]);

  return (
    <View style={styles.initSection}>
      <View style={style.drbtMain}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={style.textInput}
            placeholder='Nhập mã giảm giá cần tìm'
            value={name}
            onChangeText={text => setName(text)}
            onSubmitEditing={search}
          />

          <FontAwesome5
            name='search'
            size={20}
            color='green'
            style={style.searchIcon}
          />

        </View>
      </View>
      <View style={publicStyle.twoSide} >
        <View style={styles.combo1} >
          <Button
            title='Thêm mã'
            onPress={()=>navigation.navigate('publicCoupon')}
          />
        </View>

      </View>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadAgain}
          />
        }

        keyExtractor={(item) => item.id_coupon}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={()=>navigation.navigate('changeCoupon', {item:item})}
          >
            <View style={{
            backgroundColor: '#FFF',
            margin: 10,
            shadowOffset: { width: 2, height: 2 },
            shadowColor: '#DFDFDF',
            shadowOpacity: 0.2,
            padding: 10,
            borderRadius: 2,
            justifyContent: 'space-around'
          }}  >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Mã giảm giá:</Text>
              <Text style={{ color: '#2ABB9C' }}>{item.id_coupon}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Số lượng còn:</Text>
              <Text style={{ color: '#C21C70' }}> {item.quantity} </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Giá trị mã:</Text>
              <Text style={{ color: '#2ABB9C' }}> {_function.currencyFormat(item.value)} </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Thời gian hết hạn:</Text>
              <Text style={{ color: '#C21C70' }}> {item.time} </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Ngày hết hạn:</Text>
              <Text style={{ color: '#2ABB9C' }}> {item.date} </Text>
            </View>

          </View>
          </TouchableOpacity>

        )}
      />
      <View style={{ height: 500, width: width }}>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { height: height / 16, backgroundColor: '#b7e89c', flexDirection: 'row' },
  textInput: { height: height / 20, backgroundColor: '#fff', borderColor: 'green', borderRadius: 15, top: 5, width: width * 2 / 3, left: 45, padding: 10 },
  searchIcon: { left: 10, top: 15 },
  switch: { paddingHorizontal: 40 },
  combo1: { width: width * 0.35, paddingRight: 20 },
  combo2: { width: width * 0.5, paddingRight: 20, paddingTop: 5 },
  filterButton: { borderWidth: 3, justifyContent: 'center', alignItems: 'center', height: 40, margin: 5, marginRight: 10, borderRadius: 5, borderColor: '#63c522', backgroundColor: '#2dba1d' },
  filterText: { color: 'white', fontWeight: "bold", fontSize: 16 },
  bigButton: {
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.lightGreen,
    // top: 20,
    width: width / 3
  },
  bigButton1: {
    height: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.midRed,
    // top: 20,
    width: width / 3
  },
  twoSide: {
    flexDirection: 'row',
    alignContent: 'center',
    padding: 5,
    justifyContent: 'space-between'
  },
  buttonText: {
    fontFamily: 'sans-serif-medium',
    color: '#fff',
    fontWeight: '400'
  },
  initSection: {
    // paddingTop: Constants.statusBarHeight + 5,
    marginBottom: 100
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    // marginBottom: 0,
    textAlign: "center",
    fontSize: 20,
    fontWeight: '800',
    color: 'green'
},
})
const style = StyleSheet.create({
  drbtMain: {
    height: height / 17,
    width: width
  },
  wrapper: { height: height / 16, backgroundColor: '#b7e89c', flexDirection: 'row' },
  textInput: { height: height / 20, backgroundColor: '#fff', borderColor: 'green', borderRadius: 15, top: 5, width: width * 2 / 3, left: 45, padding: 10 },
  searchIcon: { left: 10, top: 15 }
})