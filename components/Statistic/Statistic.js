import { ScrollView, Text, View, Dimensions, Modal, StyleSheet, TouchableOpacity } from "react-native";
import style from "../public/style";
import _function from "../public/function";
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';
import DropDownPicker from 'react-native-dropdown-picker'
import color from "../public/color";
import {
    // LineChart,
    BarChart,
    // PieChart,
    // ProgressChart,
    // ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { useEffect, useState } from "react";
const { width, height } = Dimensions.get('window')
const firstDate = '01'
var today = new Date();
var currentMonth = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var currentYear = today.getFullYear();

export default function Statistic() {
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
    const [month1, setMonth1] = useState(currentMonth)
    const [year1, setYear1] = useState(currentYear.toString())
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState(0)
    // const [year, setYear] = useState(currentYear)
    // const [month, setMonth] = useState(currentMonth)
    // const [year, setYear] = useState(currentYear)
    const [item1, setItem1] = useState()
    const [item2, setItem2] = useState()
    const token = useSelector((state) => state.account.token)

    const graphStyle = {
        marginVertical: 8,
        borderRadius: 10
    }
    const chartConfig = {
        backgroundColor: color.darkGreen,
        backgroundGradientFrom: color.darkGreen,
        backgroundGradientTo: color.midGreen,
        decimalPlaces: 0, // optional, defaults to 2dp
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
    const chartConfig1 = {
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
        // barPercentage: 0.6,
        propsForDots: {
            r: "6",
            strokeWidth: "1",
            stroke: color.lightGreen
        }
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

    const getMonthData = async (date) => {
        const res = await _function.getAPI(`static/month-turnover?date=${date}`, token)
        if (res.code == 200) {
            setData1(res.data)
            setLabel1(res.label)
        }
    }

    const getTotalMonthData = async (date) => {
        const res = await _function.getAPI(`static/total-month-turnover?date=${date}`, token)
        if (res.code == 200) {
            setTotalMonth(res.data)
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
            setTotalYear(res.data)
        }
    }

    const getMonthStatus = async (date) => {
        const res = await _function.getAPI(`static/month-status?date=${date}`, token)
        // console.log(res)
        if (res.code == 200) {
            setData3(res.data)
            setLabel3(res.label)
            setLegend(res.legend)
        }
    }

    const getAdminYear = async () => {
        // /admin-year
        const res = await _function.getAPI(`static/admin-year`, token)
        // console.log(res)
        if (res.code == 200) {
            setItem1(res.data)
            // console.log(res.data)
        }
    }
    const getMonthYear = async (year) => {
        // /admin-year
        const res = await _function.getAPI(`static/admin-month?year=${parseInt(year)}`, token)
        // console.log(res)
        if (res.code == 200) {
            setItem2(res.data)
        }
    }

    useEffect(() => {
        getAdminYear()
        getMonthData(currentYear + '-' + currentMonth + '-' + firstDate)
        getTotalMonthData(currentYear + '-' + currentMonth + '-' + firstDate)
        getTotalYearData(currentYear + '-01-01')
        getYearData(currentYear + '-01-01')
        getMonthStatus(currentYear + '-' + currentMonth + '-' + firstDate)
        getMonthYear(currentYear)
    }, [])

    useEffect(()=>{
        getMonthYear(parseInt(year1))
    },[year1])

    useEffect(()=>{
        getMonthData(year1 + '-' + month1 + '-' + firstDate)
        getTotalMonthData(year1 + '-' + month1 + '-' + firstDate)
        getTotalYearData(year1 + '-01-01')
        getYearData(year1 + '-01-01')
        getMonthStatus(year1 + '-' + month1 + '-' + firstDate)
        setMonth(month1)
        setYear(year1)
        setShowModal(false)
    },[month1])

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(!showModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Chọn thời gian</Text>
                        <View style={{flexDirection:'row', justifyContent:'space-between',  width: width*0.6, marginVertical: 5}}>
                            <Text style={{fontSize:20}}>Chọn năm</Text>
                            <View style={{ width: width * 0.3, zIndex: 2 }}>
                                <DropDownPicker
                                    open={open1}
                                    value={year1}
                                    items={item1}
                                    setOpen={setOpen1}
                                    setValue={setYear1}
                                    setItems={setItem1}
                                />
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between',  width: width*0.6, marginVertical: 5}}>
                            <Text style={{fontSize:20}}>Chọn tháng</Text>
                            <View style={{ width: width * 0.3, zIndex: 1 }}>
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
                    </View>

                </View>
            </Modal>
            <ScrollView style={{ paddingTop: Constants.statusBarHeight + 5 }} nestedScrollEnabled={true} >
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, fontWeight: '900', color: color.darkGreen }}>Thống kê số liệu</Text>
                </View>


                <TouchableOpacity style={{ paddingTop: 35, paddingLeft: 10 }}
                    onPress={() => { setShowModal(true) }}
                >
                    <Text style={{ fontStyle: 'italic', textDecorationLine: 'underline', color: 'blue', fontSize: 15 }}>Tùy chọn thống kê theo thời gian khác:</Text>
                </TouchableOpacity>


                <View style={{ paddingLeft: 20, paddingVertical: 5, marginTop: 30 }}>
                    <Text style={{ fontSize: 18 }}>
                        Doanh thu của tháng {month}/{year} là: {_function.currencyFormat(totalMonth)}
                    </Text>
                </View>
                <BarChart
                    style={graphStyle}
                    data={{
                        labels: label1,
                        datasets: [
                            {
                                data: data1
                            }
                        ]
                    }}
                    width={width}
                    height={300}
                    yAxisSuffix={' Triệu'}
                    chartConfig={chartConfig}
                    verticalLabelRotation={20}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Biểu đồ doanh thu của từng ngày trong tháng</Text>
                </View>


                <View style={{ paddingLeft: 20, paddingVertical: 5, marginTop: 30 }}>
                    <Text style={{ fontSize: 18 }}>
                        Doanh thu của năm {year} là: {_function.currencyFormat(totalYear)}
                    </Text>
                </View>

                <BarChart
                    style={graphStyle}
                    data={{
                        labels: label2,
                        datasets: [
                            {
                                data: data2,
                                strokeWidth: 0.5
                            }
                        ]
                    }}

                    width={width}
                    height={300}
                    // yAxisLabel={"nghìn"}
                    yAxisSuffix={' Tr'}
                    // yLabelsOffset={'Nghìn'}
                    // yAxisLabel="$"
                    chartConfig={chartConfig2}
                    verticalLabelRotation={0}
                />

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Biểu đồ doanh thu của từng tháng trong năm</Text>
                </View>


                <View style={{ paddingLeft: 20, paddingVertical: 5, marginTop: 30 }}>
                    <Text style={{ fontSize: 18 }}>
                        Trạng thái đơn hàng của tháng {month}/{year}
                    </Text>
                </View>
                <StackedBarChart
                    style={graphStyle}
                    data={{
                        labels: label3,
                        legend: legend,
                        data: data3,
                        barColors: [color.midRed, "#dfe4ea", "#ced6e0", "#a4b0be"]
                    }}
                    width={width}
                    height={300}
                    chartConfig={chartConfig1}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Biểu đồ trạng thái đơn hàng trong tháng {month}</Text>
                </View>
                <View style={{ height: height * 0.1 }}>

                </View>
            </ScrollView>
        </View>
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