import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import publicStyle from '../public/style'
import func from '../public/function'
import color from '../public/color';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-date-picker'
import { DataTable } from 'react-native-paper';
import _function from '../public/function'
const { width, height } = Dimensions.get('window');
const current = new Date()
export default function MonthlyBill({ navigation }) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    //   const [open, setOpen] = useState(false)

    const [value, setValue] = useState(1)
    const [refreshing, setRefreshing] = useState(false)
    const [data, setData] = useState([])
    const [type, setType] = useState(0)
    // console.log(data)
    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState(Date(current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + '1'))
    const [stopDate, setStopDay] = useState(Date(current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate()))
    const [total, setTotal] = useState(0)
    const [start, setStart] = useState(current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + '1')
    const [stop, setStop] = useState(current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate())
    const [startConfirm, setStartConfirm] = useState(current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + '1')
    const [stopConfirm, setStopConfirm] = useState(current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate())
    // console.log(data)

    // const [showModal, setShowModal] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        if (type == 1) {
            setStart(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
            setStartDate(date)
        } else if (type == 2) {
            setStop(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
            setStopDay(date)
        }
        hideDatePicker();
    };

    const token = useSelector((state) => state.account.token)
    const loadDataOnlyOnce = async () => {
        setRefreshing(true)
        const res = await func.getAPI(`static/bill?start=${start}&stop=${stop}`, token)

        if (res.code == 200) {
            setData(res.data)
        }

        const re = await _function.getAPI(`static/total/bill?start=${start}&stop=${stop}`, token)
        if (re.code == 200) {
            setTotal(re.data ? re.data : 0)
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



    const show = async () => {
        if (!startDate || !stopDate) {
            alert("Thông báo", 'Vui lòng nhập đủ thời gian')
        }
        else if (startDate > stopDate) {
            alert("Thông báo", 'Ngày bắt đầu không được sau ngày kết thúc')
        }
        else {
            const res = await _function.getAPI(`static/bill?start=${start}&stop=${stop}`, token)
            if (res.code == 200) {
                // console.log(res.data)
                setStartConfirm(start)
                setStopConfirm(stop)
                setData(res.data)
            }

            const re = await _function.getAPI(`static/total/bill?start=${start}&stop=${stop}`, token)
            if (re.code == 200) {
                setTotal(re.data ? re.data : 0)
            }
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

    useEffect(() => {
        loadDataOnlyOnce(); // this will fire only on first render
    }, []);

    useEffect(() => {
        loadAgain()
    }, [value]);

    return (
        <>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <View style={styles.initSection}>
                <View style={publicStyle.twoSide} >
                    <View style={styles.combo1} >
                        <View style={{ padding: 10, flexDirection: 'row' }}>
                            <Text>Ngày BD: </Text>
                            <Button
                                title={start}
                                onPress={() => { setType(1); showDatePicker() }}
                            />
                        </View>

                        <View style={{ padding: 10, flexDirection: 'row' }}>
                            <Text>Ngày KT: </Text>
                            <Button
                                title={stop}
                                onPress={() => { setType(2); showDatePicker() }}
                            />
                        </View>

                        <View style={{ padding: 10 }}>
                            <Button
                                title='Xem'
                                onPress={show}
                            />
                        </View>

                    </View>
                </View>
                <View style={{ paddingLeft: 10 }}>
                    <Text>Tổng doanh thu từ ngày {startConfirm} đến ngày {stopConfirm} là: {_function.currencyFormat(total)} </Text>
                </View>
                <ScrollView>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>STT</DataTable.Title>
                            <DataTable.Title>Mã đơn</DataTable.Title>
                            <DataTable.Title>Tổng tiền</DataTable.Title>
                        </DataTable.Header>
                        {data.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('managerDetailBill', { info: item })}
                            >
                                <DataTable.Row key={item.id_bill}>
                                    <DataTable.Cell>{index + 1}</DataTable.Cell>
                                    <DataTable.Cell>{item.id_bill}</DataTable.Cell>
                                    <DataTable.Cell>{_function.currencyFormat(parseInt(item.total))}</DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>

                        ))}

                    </DataTable>
                </ScrollView>

                <View style={{ height: 500, width: width }}>

                </View>
            </View>
            <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>

    );
}

const styles = StyleSheet.create({
    wrapper: { height: height / 16, backgroundColor: '#b7e89c', flexDirection: 'row' },
    textInput: { height: height / 20, backgroundColor: '#fff', borderColor: 'green', borderRadius: 15, top: 5, width: width * 2 / 3, left: 45, padding: 10 },
    searchIcon: { left: 10, top: 15 },
    switch: { paddingHorizontal: 40 },
    combo1: { width: width, paddingRight: 20, flexDirection: 'row' },
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