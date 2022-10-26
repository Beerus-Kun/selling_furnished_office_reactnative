import { configureStore } from '@reduxjs/toolkit'
// import informationReducer from './informationSlices';
import { setupListeners } from '@reduxjs/toolkit/query'
// import locationReducer from './locationSlices';
// import driverReducer from './driverSlices';
import cartSlices from './cartSlices'
import accountSlices from './accountSlices'

export const store = configureStore({
    reducer: {
        cart: cartSlices,
        account: accountSlices,
        // location: locationReducer,
        // driver: driverReducer
    }
})

setupListeners(store.dispatch)