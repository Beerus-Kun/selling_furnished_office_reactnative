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
          title: "Sản phẩm"
        }}
      />
      <Stack.Screen
        name='checkout'
        component={Checkout}
        options={{
          title: "Thanh toán"
        }}
      />

      <Stack.Screen
        name='login'
        component={Loggin}
        options={{
          title: "Đăng nhập"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='register'
        component={Register}
        options={{
          title: "Đăng ký"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='forgot'
        component={ForgotPassword}
        options={{
          title: "Lấy lại mật khẩu"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='verification'
        component={Verification}
        options={{
          title: "Xác thực tài khoản"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='history'
        component={OrderHistory}
        options={{
          title: "Lịch sử đơn hàng"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='productChange'
        component={ProductChange}
        options={{
          title: "Chỉnh sửa sản phẩm"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='changeInfor'
        component={ChangeInfor}
        options={{
          title: "Đổi thông tin"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='detailBill'
        component={DetailBill}
        options={{
          title: "Chi tiết hóa đơn"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='addProduct'
        component={AddProduct}
        options={{
          title: "Thêm sản phẩm mới"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='publicCoupon'
        component={PublicCoupon}
        options={{
          title: "Thêm mã giảm giá"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='newCategory'
        component={NewCategory}
        options={{
          title: "Thêm loại sản phẩm"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='changeCategory'
        component={ChangeCategory}
        options={{
          title: "Thay đổi loại sản phẩm"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='registerManager'
        component={RegisterManager}
        options={{
          title: "Tạo tài khoản nhân viên"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='changePassword'
        component={ChangePassword}
        options={{
          title: "Đổi mật khẩu"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='managerBill'
        component={ManagerBill}
        options={{
          title: "Quản lý đơn hàng"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='monthlyStatus'
        component={MonthlyStatus}
        options={{
          title: "Trạng thái đơn hàng"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='yearlyStatistic'
        component={YearlyStatistic}
        options={{
          title: "Thống kê doanh thu theo năm"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='managerDetailBill'
        component={ManagerDetailBill}
        options={{
          title: "Chi tiết đơn hàng"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='managerCoupon'
        component={ManagerCoupon}
        options={{
          title: "Quản lý mã giảm giá"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='changeCoupon'
        component={ChangeCoupon}
        options={{
          title: "Đổi thông tin mã"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='changeStaff'
        component={ChangeStaff}
        options={{
          title: "Đổi thông tin Nhân viên"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='monthlyBill'
        component={MonthlyBill}
        options={{
          title: "Báo cáo doanh thu"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='managerCategory'
        component={ManagerCategory}
        options={{
          title: "Quản lý loại sản phẩm"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='managerDetailCategory'
        component={ManagerDetailCategory}
        options={{
          title: "Chi tiết loại sản phẩm"
        }}
      // options={{ headerShown: false }}
      />

      <Stack.Screen
        name='managerStaff'
        component={ManagerStaff}
        options={{
          title: "Quản lý nhân viên"
        }}
      // options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
