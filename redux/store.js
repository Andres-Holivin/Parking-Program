import { configureStore } from '@reduxjs/toolkit'
import checkReducer from './features/checkSlice'
import vehicleReducer from './features/vehicleSlice'

export default configureStore({
    reducer: {
        vehicle: vehicleReducer,
        check: checkReducer
    },
    devTools: process.env.APP_ENV === "Development" ? true : false,

})