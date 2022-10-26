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
    StackedBarChart
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
    const [month1, setMonth1] = useState(currentMonth)
    const [year1, setYear1] = useState(today.getFullYear())
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
            setTotalYear(res.data?res.data:0)
        }
    }

    const drop = ()=>{
        var data = []
        for(var i = 2015; i<=today.getFullYear(); i++){
            data.push({'label':i, 'value':i})
        }
        setItem1(data)
    }

    useEffect(() => {
        getTotalYearData(currentYear + '-01-01')
        getYearData(currentYear + '-01-01')
        drop()
    }, [])

    useEffect(() => {
        getTotalYearData(year1 + '-01-01')
        getYearData(year1 + '-01-01')
    }, [year1])

    // useEffect(() => {
    //     getMonthData(year1 + '-' + month1 + '-' + firstDate)
    //     getTotalMonthData(year1 + '-' + month1 + '-' + firstDate)
    //     getTotalYearData(year1 + '-01-01')
    //     getYearData(year1 + '-01-01')
    //     getMonthStatus(year1 + '-' + month1 + '-' + firstDate)
    //     setMonth(month1)
    //     setYear(year1)
    //     setShowModal(false)
    // }, [month1])

    return (
        <>
            <View style={{ paddingTop:  5 }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.6, marginVertical: 5 }}>
                    <Text style={{ fontSize: 20 }}>Chọn năm</Text>
                    <View style={{ width: width * 0.3}}>
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
                </View>

                <View style={{ paddingLeft: 20, paddingVertical: 5, marginTop: 30 }}>
                    <Text style={{ fontSize: 18 }}>
                        Doanh thu của năm {year1} là: {_function.currencyFormat(totalYear)}
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