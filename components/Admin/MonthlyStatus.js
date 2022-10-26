import { ScrollView, Text, View, Dimensions, Modal, StyleSheet, TouchableOpacity } from "react-native";
import style from "../public/style";
import _function from "../public/function";
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';
import DropDownPicker from 'react-native-dropdown-picker'
import color from "../public/color";
import {
    // LineChart,
    PieChart,
    // PieChart,
    // ProgressChart,
    // ContributionGraph,
    // StackedBarChart
} from "react-native-chart-kit";
import { useEffect, useState } from "react";
const { width, height } = Dimensions.get('window')
const firstDate = '01'
var today = new Date();
var currentMonth = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var currentYear = today.getFullYear();

export default function YearlyStatistic() {
    const [label1, setLabel1] = useState([])
    const [data1, setData1] = useState([])
    const [label2, setLabel2] = useState([])
    const [data2, setData2] = useState([])
    const [label3, setLabel3] = useState([])
    const [data3, setData3] = useState([])
    const [legend, setLegend] = useState([])
    const [totalMonth, setTotalMonth] = useState(0)
    const [totalYear, setTotalYear] = useState(0)
    const [month, setMonth] = useState(currentMonth)
    const [year, setYear] = useState(currentYear)
    const [month1, setMonth1] = useState(today.getMonth()+1)
    const [year1, setYear1] = useState(today.getFullYear())
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState(0)
    // const [year, setYear] = useState(currentYear)
    // const [month, setMonth] = useState(currentMonth)
    // const [year, setYear] = useState(currentYear)
    const [item1, setItem1] = useState()
    const [item2, setItem2] = useState([
        { 'label': 1, 'value': 1 },
        { 'label': 2, 'value': 2 },
        { 'label': 3, 'value': 3 },
        { 'label': 4, 'value': 4 },
        { 'label': 5, 'value': 5 },
        { 'label': 6, 'value': 6 },
        { 'label': 7, 'value': 7 },
        { 'label': 8, 'value': 8 },
        { 'label': 9, 'value': 9 },
        { 'label': 10, 'value': 10 },
        { 'label': 11, 'value': 11 },
        { 'label': 12, 'value': 12 },
    ])
    const token = useSelector((state) => state.account.token)

    const graphStyle = {
        marginVertical: 8,
        borderRadius: 10
    }
    const chartConfig2 = {
        backgroundColor: color.darkGreen,
        backgroundGradientFrom: color.darkGreen,
        backgroundGradientTo: color.midGreen,
        decimalPlaces: 1, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 10
        },
        strokeWidth: 1,
        barPercentage: 0.6,
        propsForDots: {
            r: "6",
            strokeWidth: "1",
            stroke: color.lightGreen
        }
    }

    const getYearData = async (date) => {
        const res = await _function.getAPI(`static/year-turnover?date=${date}`, token)
        if (res.code == 200) {
            setData2(res.data)
            setLabel2(res.label)
        }
    }

    const getTotalYearData = async (date) => {
        const res = await _function.getAPI(`static/total-year-turnover?date=${date}`, token)
        if (res.code == 200) {
            setTotalYear(res.data ? res.data : 0)
        }
    }

    const drop = () => {
        var data = []
        for (var i = 2015; i <= today.getFullYear(); i++) {
            data.push({ 'label': i, 'value': i })
        }
        setItem1(data)
    }

    const monSta = async (date) => {
        const res = await _function.getAPI(`static/month-status?date=${date}`, token)
        if (res.code == 200) {
            // console.log(res)
            setData1([
                {
                    name: "Đang xử lý",
                    population: res.data[0].bought,
                    color: "rgba(131, 167, 234, 1)",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Đang giao",
                    population: res.data[0].transported,
                    color: color.lightGreen,
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Đã giao",
                    population: res.data[0].received,
                    color: color.darkGreen,
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Đã hủy",
                    population: res.data[0].cancel,
                    color: "#F00",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                }
            ])
        }
    }

    useEffect(() => {
        // getTotalYearData(currentYear + '-01-01')
        // getYearData(currentYear + '-01-01')
        monSta(currentYear + '-' + currentMonth + '-1')
        drop()
    }, [])

    useEffect(() => {
        monSta(year1 + '-' + month1 + '-1')
    }, [year1, month1])

    return (
        <>
            <View style={{ paddingTop: 5 }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.6, marginVertical: 5 }}>
                    <Text style={{ fontSize: 20 }}>Năm</Text>
                    <View style={{ width: width * 0.3 }}>
                        {/* <View> */}
                        <DropDownPicker
                            open={open1}
                            value={year1}
                            items={item1}
                            setOpen={setOpen1}
                            setValue={setYear1}
                            setItems={setItem1}

                        />
                    </View>

                    <Text style={{ fontSize: 20, marginLeft: 20 }}>Tháng</Text>
                    <View style={{ width: width * 0.3 }}>
                        {/* <View> */}
                        <DropDownPicker
                            open={open2}
                            value={month1}
                            items={item2}
                            setOpen={setOpen2}
                            setValue={setMonth1}
                            setItems={setItem2}

                        />
                    </View>
                </View>

                <PieChart
                    data={data1}
                    width={width}
                    height={300}
                    chartConfig={chartConfig2}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[10, 50]}
                    absolute
                />

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Biểu đồ trạng thái đơn hàng theo tháng</Text>
                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
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