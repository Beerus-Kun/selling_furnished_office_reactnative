import React, { useState } from 'react'
import { ScrollView, View, Text, Dimensions, TouchableOpacity, Switch } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './style'
import { logout } from "../public/Redux/accountSlices"
import { clear } from "../public/Redux/cartSlices"
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('window')

function Admin({ navigation }) {
    const dispatch = useDispatch();
    const isLog = useSelector((state) => state.account.isLog);
    const idRole = useSelector((state) => state.account.role);
    const onLogout = () => {
        dispatch(logout())
        dispatch(clear())
    }

    return (
        <ScrollView style={styles.scrollSection}>
            <View style={styles.mainSection}>

                <View style={styles.topicSection}>
                    <Text style={styles.topicText}>Báo cáo và thống kê</Text>
                </View>
                <>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('monthlyBill') }}
                    >
                        <View style={styles.contentSection}>
                            <Text style={styles.contentText}>Báo cáo doanh thu</Text>
                            <Icon
                                name='right'
                                style={styles.contentIcon}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { navigation.navigate('yearlyStatistic') }}
                    >
                        <View style={styles.contentSection}>
                            <Text style={styles.contentText}>Thống kê doanh thu theo năm</Text>
                            <Icon
                                name='right'
                                style={styles.contentIcon}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { navigation.navigate('monthlyStatus') }}
                    >
                        <View style={styles.contentSection}>
                            <Text style={styles.contentText}>Thống kê trạng thái đơn hàng theo tháng</Text>
                            <Icon
                                name='right'
                                style={styles.contentIcon}
                            />
                        </View>
                    </TouchableOpacity>
                </>


            </View>
        </ScrollView >
    )
}

export default Admin