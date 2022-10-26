import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5'
import ListProduct from '../ListProduct/ListProduct';
import DrawerNavigation from './DrawerNavigation';
import Cart from '../Cart/Cart';
import Account from '../Account/Account';
import { View, Text,Keyboard } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import color from '../public/color';
import publicStyle from '../public/style'
import Manager from '../Manager/Manager';
import Admin from '../Admin/Admin'
import Statistic from '../Statistic/Statistic';

const Tab = createMaterialTopTabNavigator()


export default function TabNavigation() {
    const role = useSelector((state) => state.account.role)
    const [isHideTab, setIsHideTab] = useState(false)

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setIsHideTab(true)
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setIsHideTab(false)
        })
    });
    return (
        <Tab.Navigator
            tabBarPosition="bottom"
            initialRouteName='list'
            screenOptions={{
                tabBarShowLabel: true,
                tabBarActiveTintColor: color.midGreen,
                tabBarInactiveTintColor: color.gray,
                tabBarLabelStyle: { textTransform: 'none' },
                tabBarStyle: { display: isHideTab ? 'none' : 'flex' }
            }}
        >
            {role == 1? (
                <Tab.Screen
                name="admin"
                component={Admin}
                options={{
                    headerShown: false,
                    title: 'Thống kê',
                    tabBarIcon: ({ focused }) => (
                        <View style={publicStyle.center}>
                            <Icon
                                name='chart-bar'
                                size={focused ? 24 : 20}
                                color={focused ? color.midGreen : color.gray}
                            />
                        </View>
                    )
                }}
            />
            ):(
                <Tab.Screen
                name="list"
                component={DrawerNavigation}
                options={{
                    headerShown: true,
                    title: 'Sản phẩm',
                    tabBarIcon: ({ focused }) => (
                        <View style={publicStyle.center}>
                            <Icon
                                name='dolly-flatbed'
                                size={focused ? 24 : 20}
                                color={focused ? color.midGreen : color.gray}
                            />
                        </View>
                    )
                }}
            />
            )}
            
            {role == 2 || role == 1 ? (
                <Tab.Screen
                    name="manager"
                    component={Manager}
                    options={{
                        headerShown: false,
                        title: 'Quản lý  ',
                        tabBarIcon: ({ focused }) => (
                            <View style={publicStyle.center}>
                                <Icon
                                    name='file'
                                    size={focused ? 24 : 20}
                                    color={focused ? color.midGreen : color.gray}
                                />
                            </View>
                        )
                    }}
                />
            ) : (
                <Tab.Screen
                    name="cart"
                    component={Cart}
                    options={{
                        headerShown: false,
                        title: 'Giỏ hàng',
                        tabBarIcon: ({ focused }) => (
                            <View style={publicStyle.center}>
                                <Icon
                                    name='cart-plus'
                                    size={focused ? 24 : 20}
                                    color={focused ? color.midGreen : color.gray}
                                />
                            </View>
                        )
                    }}
                />
            )}
            <Tab.Screen
                name="account"
                component={Account}
                options={{
                    headerShown: false,
                    title: 'Tài khoản',
                    tabBarIcon: ({ focused }) => (
                        <View style={publicStyle.center}>
                            <Icon
                                name='user'
                                size={focused ? 24 : 20}
                                color={focused ? color.midGreen : color.gray}
                            />
                        </View>
                    )
                }}
            />
        </ Tab.Navigator>
        // <View>
        //     <Text>
        //         tab
        //     </Text>
        // </View>
    );
}
