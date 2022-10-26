// import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from '@reduxjs/toolkit'
const accountSlice = createSlice({
    name: 'account',
    initialState: {
        username: '',
        name: '',
        phone: '',
        token: '',
        address: '',
        isLog: false,
        role: 0,
        email: ''
    },
    reducers: {
        updateUsername(state, action) {
            state.username = action.payload;
        },
        updateName(state, action) {
            state.name = action.payload;
        },
        updateToken(state, action) {
            state.token = action.payload;
        },
        updateIsLog(state, action) {
            state.isLog = action.payload;
        },
        updateUserRole(state, action) {
            state.role = action.payload;
        },
        updatePhonenumber(state, action) {
            state.phone = action.payload;
        },
        updateEmail(state, action) {
            state.email = action.payload;
        },
        login(state, action){
            state.username = action.payload.username
            state.name = action.payload.name
            state.token = action.payload.token
            state.phone = action.payload.phone
            state.email = action.payload.email
            state.address = action.payload.address
            state.isLog = true
            state.role = action.payload.idRole
        },
        logout: state => {
            state.username = '';
            state.name = '';
            state.token = '';
            state.phone = '';
            state.email = '';
            state.address = "";
            state.isLog = false;
            state.role = 0
        },
        initial: state => {
            // if (AsyncStorage.getItem('isLog') == 'true' ? true : false) {
            //     state.username = AsyncStorage.getItem('username');
            //     state.firstName = AsyncStorage.getItem('firstName');
            //     state.lastName = AsyncStorage.getItem('lastName');
            //     state.token = AsyncStorage.getItem('token');
            //     state.phonenumber = AsyncStorage.getItem('phonenumber');
            //     state.address = AsyncStorage.getItem('address');
            //     state.gender = AsyncStorage.getItem('gender');
            //     // state.isLog = AsyncStorage.getItem('isLog') == 'true' ? true : false;
            //     state.userRole = AsyncStorage.getItem('userRole') == 'true' ? true : false;
            //     state.driverRole = AsyncStorage.getItem('driverRole') == 'true' ? true : false;
            //     // }
            // }
        }
    }
})

export const { updateAddress, initial,
    updateFirstName, updateLastName,
    updateGender, updateIsLog,
    updatePhonenumber, updateToken,
    updateUserRole, updateDriverRole,
    logout, updateUsername, updateEmail, login } = accountSlice.actions;
export default accountSlice.reducer;