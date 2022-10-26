import React, { useState } from 'react'
import { ScrollView, View, Text, Dimensions, TouchableOpacity, Switch } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './style'
import { logout } from "../public/Redux/accountSlices"
import { clear } from "../public/Redux/cartSlices"
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('window')

function Manager({ navigation }) {
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
                    <Text style={styles.topicText}>Quản lý</Text>
                </View>
                <>
                    {
                        idRole == 2 ? (
                            // manager
                            <>
                                <TouchableOpacity onPress={() => { navigation.navigate('addProduct') }}>
                                        <View style={styles.contentSection}>
                                            <Text style={styles.contentText}>Thêm sản phẩm mới</Text>
                                            <Icon
                                                name='right'
                                                style={styles.contentIcon}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={() => { navigation.navigate('managerCoupon') }}
                                >
                                    <View style={styles.contentSection}>
                                        <Text style={styles.contentText}>Quản lý mã giảm giá</Text>
                                        <Icon
                                            name='right'
                                            style={styles.contentIcon}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                onPress={() => { navigation.navigate('managerBill') }}
                                >
                                    <View style={styles.contentSection}>
                                        <Text style={styles.contentText}>Quản lý đơn hàng</Text>
                                        <Icon
                                            name='right'
                                            style={styles.contentIcon}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                onPress={() => { navigation.navigate('managerCategory') }}
                                >
                                    <View style={styles.contentSection}>
                                        <Text style={styles.contentText}>Quản lý loại sản phẩm</Text>
                                        <Icon
                                            name='right'
                                            style={styles.contentIcon}
                                        />
                                    </View>
                                </TouchableOpacity>

                            </>
                        ) : (
                            // admin
                            <>
                                {/* <TouchableOpacity onPress={() => { navigation.navigate('registerManager') }}>
                                    <View style={styles.contentSection}>
                                        <Text style={styles.contentText}>Tạo tài khoản nhân viên</Text>
                                        <Icon
                                            name='right'
                                            style={styles.contentIcon}
                                        />
                                    </View>
                                </TouchableOpacity> */}

                                <TouchableOpacity onPress={() => { navigation.navigate('managerStaff') }}>
                                    <View style={styles.contentSection}>
                                        <Text style={styles.contentText}>Quản lý nhân viên</Text>
                                        <Icon
                                            name='right'
                                            style={styles.contentIcon}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </>
                        )}
                </>


            </View>
        </ScrollView >
    )
}

export default Manager