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
export default function ManagerCategory({navigation}) {
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

    const res1 = await func.getAPI("product/category", token)

    if (res1.code == 203) {
      // console.log(res1.data)
      setData(res1.data)
    }

    setRefreshing(false)
  };

  const loadAgain = async () => {
    setRefreshing(true)
    const res1 = await func.getAPI("product/category", token)

    if (res1.code == 203) {
      // console.log(res1.data)
      setData(res1.data)
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
    const res = await func.putAPI(`product/delete_category/${id}`, {}, token)
    if (res.code == 200) {
      loadAgain()
    }else if(res.code == 400){
      alert("Thông báo","Loại sản phẩm này đã có sản phẩm. \nKhông thể xóa")
    }
  }



  const clickCancel = (id, status) => {
    Alert.alert(
      'Thông báo',
      `Bạn có muốn xóa loại sản phẩm ${status} không?`,
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
        { text: "OK", onPress: () => forceCancel(id) }
      ]
    );
  }

  const [value1, setValue1] = useState(0)
  const [amount, setAmount] = useState(0)
  const [month, setMonth] = useState(0)
  // const token = useSelector((state) => state.account.token)


  const alert = (title, content) => {
    Alert.alert(
      title,
      content,
      [
        { text: "OK" }
      ]
    );
  }

  useEffect(() => {
    loadDataOnlyOnce(); // this will fire only on first render
  }, []);

  useEffect(() => {
    loadAgain()
  }, [value]);

  return (
    <View style={styles.initSection}>
      {/* <View style={style.drbtMain}>
      </View> */}
      <View style={styles.combo1} >
          <Button
          onPress={()=>navigation.navigate('newCategory')}
            title='Thêm loại mới'
          />
        </View>

      <FlatList

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadAgain}
          />
        }

        keyExtractor={(item) => item.id_category.toString()}
        data={data}
        renderItem={({ item }) => (
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
              <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Mã loại:</Text>
              <Text style={{ color: '#2ABB9C' }}>{item.id_category}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tên loại:</Text>
              <Text style={{ color: '#C21C70' }}> {item.name} </Text>
            </View>
            <View style={styles.twoSide}>
                <TouchableOpacity style={styles.bigButton}
                  onPress={() => { navigation.navigate('changeCategory', {item:item}) }}
                >
                  <Text style={styles.buttonText}>Thay đổi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bigButton1}
                  onPress={() => { clickCancel(item.id_category, item.name) }}
                >
                  <Text style={styles.buttonText}>Xóa</Text>
                </TouchableOpacity>
              </View>


          </View>

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
    marginBottom: 50
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