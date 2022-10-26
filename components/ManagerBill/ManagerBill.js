import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, StyleSheet, TextInput, Modal, FlatList, TouchableOpacity, Alert, Dimensions, RefreshControl } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import { useDispatch, useSelector } from "react-redux";
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome5'
import publicStyle from '../public/style'
import func from '../public/function'
import color from '../public/color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import _function from '../public/function'
const { width, height } = Dimensions.get('window');
export default function ManagerBill({navigation}) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  // console.log(data)
  // const [showModal, setShowModal] = useState(false)
  const [idBill, setIdBill] = useState(0)
  const [items, setItems] = useState([
    { label: 'Đã hủy', value: 0 },
    { label: 'Đang xử lý', value: 1 },
    { label: 'Đang giao', value: 2 },
    { label: 'Đã giao hàng', value: 3 },
  ])


  const token = useSelector((state) => state.account.token)
  const loadDataOnlyOnce = async () => {
    setRefreshing(true)
    const res = await func.getAPI("bill/bill-staus?status=1", token)

    if (res.code == 200) {
      setData(res.data)
    }

    setRefreshing(false)
  };

  const loadAgain = async () => {
    setRefreshing(true)
    const res = await func.getAPI(`bill/bill-staus?status=${value}`, token)
    if (res.code == 200) {
      setData(res.data)
    }

    setRefreshing(false)
  };

  const getNextStatus = (status) => {
    switch (status) {
      case 1:
        return 'Nhận đơn'
      case 2:
        return 'Nhận đơn'
      case 3:
        return 'Đã giao'
      case 4:
        return 'Đã giao'
    }
  }

  const alertNextStep = (id, status) => {
    Alert.alert(
      'Thông báo',
      `Bạn ${getNextStatus(status)} đơn hàng ${id}`,
      [
        {
          text: "Không",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Đúng", onPress: () => nextStep(id) }
      ]
    );
  }

  const nextStep = async (id) => {
    const res = await func.putAPI(`bill/next-step?id=${id}`, {}, token)
    // console.log(res)
    if (res.code == 200) {
      loadAgain()
    }
  }

  const forceCancel = async (id, status) => {
    setIdBill(id)
    // console.log(status)
    const res = await func.putAPI(`bill/force-cancel?id=${id}`, {}, token)
    if (res.code == 200) {
      loadAgain()
    }
  }



  const clickCancel = (id, status) => {
    Alert.alert(
      'Thông báo',
      `Bạn có muốn hủy đơn ${id} không?`,
      [
        // {
        //   text: "Ask me later",
        //   onPress: () => console.log("Ask me later pressed")
        // },
        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => forceCancel(id, status) }
      ]
    );
  }

  const [value1, setValue1] = useState(0)
  const [amount, setAmount] = useState(0)
  const [month, setMonth] = useState(0)
  // const token = useSelector((state) => state.account.token)
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

  const search = async () => {
    setRefreshing(true)
    const res = await _function.getAPI(`bill/search?search=${name}&status=${value}`, token)
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
            placeholder='Nhập mã đơn / SDT cần tìm'
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
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            placeholder='Trạng thái'
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

        keyExtractor={(item) => item.id_bill.toString()}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={()=>navigation.navigate('managerDetailBill',{info:item})}
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
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Mã đơn hàng:</Text>
                <Text style={{ color: '#2ABB9C' }}>{item.id_bill}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Ngày mua hàng:</Text>
                <Text style={{ color: '#C21C70' }}> {item.date} </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Người mua hàng:</Text>
                <Text style={{ color: '#2ABB9C' }}> {item.name} </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Số điện thoại:</Text>
                <Text style={{ color: '#C21C70' }}> {item.phone} </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Trạng thái đơn hàng:</Text>
                <Text style={{ color: '#2ABB9C' }}> {_function.getStatus(item.id_status)} </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tổng tiền:</Text>
                <Text style={{ color: '#C21C70', fontWeight: 'bold' }}>{_function.currencyFormat(item.total ? (item.total) : 0)} </Text>
              </View>
              {value == 0 || value == 3 ? null : (
                <View style={styles.twoSide}>
                  <TouchableOpacity style={styles.bigButton}
                    onPress={() => { alertNextStep(item.id_bill, item.id_status) }}
                  >
                    <Text style={styles.buttonText}>{getNextStatus(item.id_status)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.bigButton1}
                    onPress={() => { clickCancel(item.id_bill, item.id_status) }}
                  >
                    <Text style={styles.buttonText}>Hủy đơn</Text>
                  </TouchableOpacity>
                </View>
              )}


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