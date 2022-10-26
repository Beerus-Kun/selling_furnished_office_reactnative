import { View } from "react-native";
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'
import ListProduct from "../ListProduct/ListProduct";
import Cart from "../Cart/Cart";
import Account from '../Account/Account'
import color from '../public/color'
import publicStyle from '../public/style'
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// const TopTab = createMaterialTopTabNavigator()

const Tab = createBottomTabNavigator()

export default function Main() {
    const [isHideTab, setIsHideTab] = useState(false)
    return (
        <Tab.Navigator
            initialRouteName="list"
            screenOptions={{
                tabBarActiveTintColor: color.midGreen,
                tabBarInactiveTintColor: color.gray
            }}
        >
            <Tab.Screen
                name='list'
                component={ListProduct}
                options={{
                    tabBarLabel: "Sản phẩm",
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name='car-side'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='cart'
                component={ListProduct}
                options={{
                    tabBarLabel: "Sản phẩm",
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name='car-side'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
            <Tab.Screen
                name='account'
                component={ListProduct}
                options={{
                    tabBarLabel: "Sản phẩm",
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name='car-side'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />
        </Tab.Navigator>
        // <TopTab.Navigator
        //     tabBarPosition="bottom"
        //     screenOptions={{
        //         tabBarShowLabel: true,
        //         tabBarActiveTintColor: color.midGreen,
        //         tabBarInactiveTintColor: color.gray,
        //         tabBarLabelStyle: { textTransform: 'none' },
        //         tabBarStyle: { display: isHideTab ? 'none' : 'flex' }
        //     }}
        // >
        //     <TopTab.Screen
        //         name="list"
        //         component={ListProduct}
        //         options={{
        //             headerShown: false,
        //             title: 'Sản phẩm',
        //             tabBarIcon: ({ focused }) => (
        //                 <View style={publicStyle.center}>
        //                     <Icon
        //                         name='car-side'
        //                         size={focused ? 24 : 20}
        //                         color={focused ? color.midGreen : color.gray}
        //                     />
        //                 </View>
        //             )
        //         }}
        //     />
        //     <TopTab.Screen
        //         name="cart"
        //         component={Cart}
        //         options={{
        //             headerShown: false,
        //             title: 'Giỏ hàng',
        //             tabBarIcon: ({ focused }) => (
        //                 <View style={publicStyle.center}>
        //                     <Icon
        //                         name='car-side'
        //                         size={focused ? 24 : 20}
        //                         color={focused ? color.midGreen : color.gray}
        //                     />
        //                 </View>
        //             )
        //         }}
        //     />
        //     <TopTab.Screen
        //         name="account"
        //         component={Account}
        //         options={{
        //             headerShown: false,
        //             title: 'Tài khoản',
        //             tabBarIcon: ({ focused }) => (
        //                 <View style={publicStyle.center}>
        //                     <Icon
        //                         name='car-side'
        //                         size={focused ? 24 : 20}
        //                         color={focused ? color.midGreen : color.gray}
        //                     />
        //                 </View>
        //             )
        //         }}
        //     />
        // </ TopTab.Navigator>
    )
}