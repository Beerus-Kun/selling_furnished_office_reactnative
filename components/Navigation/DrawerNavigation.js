import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, Text } from 'react-native';
import ListProduct from '../ListProduct/ListProduct';

const Drawer = createDrawerNavigator()


export default function DrawerNavigation() {

  
  return (
    <Drawer.Navigator
      useLegacyImplementation
      initialRouteName='Tất cả'
    >
      <Drawer.Screen
        name='Tất cả'
        component={ListProduct}
        initialParams={{ idCategory: 0 }}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Ghế giám đốc - trưởng phòng"
        component={ListProduct}
        initialParams={{ idCategory: 6 }}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Ghế xoay nhân viên"
        component={ListProduct}
        initialParams={{ idCategory: 7 }}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Ghế chân quỳ"
        component={ListProduct}
        initialParams={{ idCategory: 8 }}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Ghế băng chờ"
        component={ListProduct}
        initialParams={{ idCategory: 9 }}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Ghế công thái học"
        component={ListProduct}
        initialParams={{ idCategory: 11 }}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Bàn giám đốc - trưởng phòng"
        component={ListProduct}
        initialParams={{ idCategory: 1 }}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Bàn họp"
        component={ListProduct}
        initialParams={{ idCategory: 2 }}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Bàn nhóm"
        component={ListProduct}
        initialParams={{ idCategory: 4 }}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Bàn công thái học"
        component={ListProduct}
        initialParams={{ idCategory: 5 }}
        options={{ headerShown: false }}
      />

    </Drawer.Navigator>
  );
}
