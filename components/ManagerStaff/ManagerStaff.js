import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, StyleSheet, TextInput, Modal, FlatList, TouchableOpacity, Alert, Dimensions, RefreshControl } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import { useDispatch, useSelector } from "react-redux";
import Constants from 'expo-constants';
import publicStyle from '../public/style'
import func from '../public/function'
import color from '../public/color';
import _function from '../public/function'
const { width, height } = Dimensions.get('window');
export default function ManagerStaff({navigation}) {
  const [value, setValue] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const [data, setData] = useState([])
//   console.log(data)

  const token = useSelector((state) => state.account.token)
  const loadDataOnlyOnce = async () => {
    setRefreshing(true)
    const res = await func.getAPI("account/staff", token)
    if (res.code == 200) {
      setData(res.data)
    // console.log(res.data)
    }

    setRefreshing(false)
  };

  const loadAgain = async () => {
    setRefreshing(true)
    const res = await func.getAPI("account/staff", token)
    if (res.code == 200) {
      setData(res.data)
    // console.log(res.data)
    }

    setRefreshing(false)
  };


  useEffect(() => {
    loadDataOnlyOnce(); // this will fire only on first render
  }, []);

  useEffect(() => {
    loadAgain()
  }, [value]);

  return (
    <View style={styles.initSection}>
      <View style={publicStyle.twoSide} >
        <View style={styles.combo1} >
          <Button
            title='Tạo tài khoản nhân viên'
            onPress={()=>navigation.navigate('registerManager')}
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

        keyExtractor={(item) => item.email}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={()=>navigation.navigate('changeStaff', {item:item})}
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
              <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tài khoản NV:</Text>
              <Text style={{ color: '#2ABB9C' }}>{item.username}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Email:</Text>
              <Text style={{ color: '#C21C70' }}> {item.email} </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tên:</Text>
              <Text style={{ color: '#2ABB9C' }}> {item.name} </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Giới tính:</Text>
              <Text style={{ color: '#C21C70' }}> {item.gender ? 'Nam':'Nữ'} </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#9A9A9A', fontWeight: 'bold' }}>Tình trạng:</Text>
              <Text style={{ color: '#2ABB9C' }}> {item.status?'Bị khóa': 'Hoạt động'} </Text>
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
  combo1: { width: width * 0.6, paddingRight: 20 },
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
    paddingTop: Constants.statusBarHeight + 5,
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
