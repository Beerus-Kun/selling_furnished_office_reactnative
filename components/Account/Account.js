import React, { useState } from 'react'
import { ScrollView, View, Text, Dimensions, TouchableOpacity, Switch } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import styles from './style'
import { logout } from "../public/Redux/accountSlices"
import { clear } from "../public/Redux/cartSlices"
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('window')

function Account({ navigation }) {
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
                    <Text style={styles.topicText}>Tài khoản của tôi</Text>
                </View>
                {isLog ? (
                    <>
                        {idRole == 3 ? (
                            <>
                                <TouchableOpacity onPress={() => { navigation.navigate('changeInfor') }} >
                                    <View style={styles.contentSection}>
                                        <Text style={styles.contentText}>Thay đổi thông tin</Text>
                                        <Icon
                                            name='right'
                                            style={styles.contentIcon}
                                        />
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { navigation.navigate('history') }}>
                                    <View style={styles.contentSection}>
                                        <Text style={styles.contentText}>Lịch sử đơn hàng</Text>
                                        <Icon
                                            name='right'
                                            style={styles.contentIcon}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </>
                        ) : null}

                        <TouchableOpacity onPress={() => { navigation.navigate('changePassword') }}>
                            <View style={styles.contentSection}>
                                <Text style={styles.contentText}>Đổi mật khẩu</Text>
                                <Icon
                                    name='right'
                                    style={styles.contentIcon}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onLogout}>
                            <View style={styles.contentSection}>
                                <Text style={styles.contentText}>Đăng xuất</Text>
                                <Icon
                                    name='right'
                                    style={styles.contentIcon}
                                />
                            </View>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity onPress={
                            () => { navigation.navigate('login') }
                        }>
                            <View style={styles.contentSection}>
                                <Text style={styles.contentText}>Đăng nhập</Text>
                                <Icon
                                    name='right'
                                    style={styles.contentIcon}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={
                            () => { navigation.navigate('register') }
                        }>
                            <View style={styles.contentSection}>
                                <Text style={styles.contentText}>Đăng ký</Text>
                                <Icon
                                    name='right'
                                    style={styles.contentIcon}
                                />
                            </View>
                        </TouchableOpacity>
                    </>
                )}

            </View>
        </ScrollView >
    )
}

export default Account