import { createSlice } from '@reduxjs/toolkit'
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        data: {},
        arrData: [],
        coupon: '',
        tempToken: ''
    },
    reducers: {
        addCart(state, action) {
            if (state.data[action.payload.id_product]) {
                state.data[action.payload.id_product].amount += 1
            } else {
                state.data[action.payload.id_product] = action.payload
                state.data[action.payload.id_product].amount = 1
            }
        },
        addCart1(state, action) {
            if (state.data[action.payload.data.id_product]) {
                state.data[action.payload.data.id_product].amount += action.payload.amount
            } else {
                state.data[action.payload.data.id_product] = action.payload.data
                state.data[action.payload.data.id_product].amount = action.payload.amount
            }
        },
        clear: state => {
            state.data = {}
            state.arrData = []
        },
        changeArr(state, action) {
            state.arrData = action.payload
        },
        increaseAmount(state, action) {
            state.arrData[action.payload.index].amount++
            state.data[action.payload.id_product].amount++
        },
        increaseAmount(state, action) {
            state.arrData[action.payload.index].amount++
            state.data[action.payload.id_product].amount++
        },
        decreaseAmount(state, action) {
            if (--state.arrData[action.payload.index].amount <= 0) {
                state.arrData.splice(action.payload.index, 1)
                delete state.data[action.payload.id_product]
            } else {
                state.data[action.payload.id_product].amount--
            }
        },
        deleteCart(state, action) {
            state.arrData.splice(action.payload.index, 1)
            delete state.data[action.payload.id_product]
        },
        setCoupon(state, action){
            state.coupon = action.payload
        },
        setTempToken(state, action){
            state.tempToken = action.payload
        },
        finish: state => {
            state.data = {}
            state.arrData = []
            state.coupon = ''
            state.tempToken = ''
        }
    }
})

export const { addCart, clear, changeArr, increaseAmount, decreaseAmount, deleteCart, addCart1, setCoupon, setTempToken,  } = cartSlice.actions;
export default cartSlice.reducer;