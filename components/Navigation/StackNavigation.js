import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkout from '../Checkout/Checkout';
import TabNavigation from '../Navigation/TabNavigation'
import Product from '../Product/Product';
import Loggin from '../Login/Login';
import Register from '../Register/Register';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import Verification from '../Verification/Verification';
import OrderHistory from '../OrderHistory/OrderHistory'
import DetailBill from '../DetailBill/DetailBill';
import AddProduct from '../AddProduct/AddProduct';
import PublicCoupon from '../PublicCoupon/PublicCoupon';
import RegisterManager from '../RegisterManager/RegisterManager';
import ChangePassword from '../ChangePassword/ChangePassword';
import ChangeInfor from '../ChangeInfor/ChangeInfor';
import ProductChange from '../ProductChange/ProductChange';
import ManagerCoupon from '../ManagerCoupon/ManagerCoupon';
import ManagerBill from '../ManagerBill/ManagerBill';
import ChangeCoupon from '../ManagerCoupon/ChangeCoupon';
import ManagerDetailBill from '../ManagerBill/ManagerDetailBill';
import MonthlyBill from '../Admin/MonthlyBill';
import YearlyStatistic from '../Admin/YearlyStatistic';
import MonthlyStatus from '../Admin/MonthlyStatus';
import ManagerStaff from '../ManagerStaff/ManagerStaff';
import ChangeStaff from '../ManagerStaff/ChangeStaff';
import ManagerDetailCategory from '../ManagerCategory/ManagerDetailCategory';
import ManagerCategory from '../ManagerCategory/ManagerCategory';
import NewCategory from '../ManagerCategory/NewCategory';
import ChangeCategory from '../ManagerCategory/ChangeCategory';
// import DrawerNavigation from './DrawerNavigation';

const Stack = createNativeStackNavigator()

export default function StackNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
      }}
    >
      <Stack.Screen
        name='root'
        component={TabNavigation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='product'
        component={Product}
        options={{
          title: "S???n ph???m"
        }}
      />
      <Stack.Screen
        name='checkout'
        component={Checkout}
        options={{
          title: "Thanh to??n"
        }}
      />

      <Stack.Screen
        name='login'
        component={Loggin}
        options={{
          title: "????ng nh???p"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='register'
        component={Register}
        options={{
          title: "????ng k??"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='forgot'
        component={ForgotPassword}
        options={{
          title: "L???y l???i m???t kh???u"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='verification'
        component={Verification}
        options={{
          title: "X??c th???c t??i kho???n"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='history'
        component={OrderHistory}
        options={{
          title: "L???ch s??? ????n h??ng"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='productChange'
        component={ProductChange}
        options={{
          title: "Ch???nh s???a s???n ph???m"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='changeInfor'
        component={ChangeInfor}
        options={{
          title: "?????i th??ng tin"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='detailBill'
        component={DetailBill}
        options={{
          title: "Chi ti???t h??a ????n"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='addProduct'
        component={AddProduct}
        options={{
          title: "Th??m s???n ph???m m???i"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='publicCoupon'
        component={PublicCoupon}
        options={{
          title: "Th??m m?? gi???m gi??"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='newCategory'
        component={NewCategory}
        options={{
          title: "Th??m lo???i s???n ph???m"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='changeCategory'
        component={ChangeCategory}
        options={{
          title: "Thay ?????i lo???i s???n ph???m"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='registerManager'
        component={RegisterManager}
        options={{
          title: "T???o t??i kho???n nh??n vi??n"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='changePassword'
        component={ChangePassword}
        options={{
          title: "?????i m???t kh???u"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='managerBill'
        component={ManagerBill}
        options={{
          title: "Qu???n l?? ????n h??ng"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='monthlyStatus'
        component={MonthlyStatus}
        options={{
          title: "Tr???ng th??i ????n h??ng"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='yearlyStatistic'
        component={YearlyStatistic}
        options={{
          title: "Th???ng k?? doanh thu theo n??m"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='managerDetailBill'
        component={ManagerDetailBill}
        options={{
          title: "Chi ti???t ????n h??ng"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='managerCoupon'
        component={ManagerCoupon}
        options={{
          title: "Qu???n l?? m?? gi???m gi??"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='changeCoupon'
        component={ChangeCoupon}
        options={{
          title: "?????i th??ng tin m??"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='changeStaff'
        component={ChangeStaff}
        options={{
          title: "?????i th??ng tin Nh??n vi??n"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='monthlyBill'
        component={MonthlyBill}
        options={{
          title: "B??o c??o doanh thu"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='managerCategory'
        component={ManagerCategory}
        options={{
          title: "Qu???n l?? lo???i s???n ph???m"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='managerDetailCategory'
        component={ManagerDetailCategory}
        options={{
          title: "Chi ti???t lo???i s???n ph???m"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='managerStaff'
        component={ManagerStaff}
        options={{
          title: "Qu???n l?? nh??n vi??n"
        }}
      // options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
