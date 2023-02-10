import { configureStore } from '@reduxjs/toolkit'
import checkReducer from './features/checkSlice'
import parkingReducer from './features/parkingSlice'
import vehicleReducer from './features/vehicleSlice'

export default configureStore({
    reducer: {
        vehicle: vehicleReducer,
        check: checkReducer,
        parking:parkingReducer
    },
    devTools: process.env.APP_ENV === "Production" ? false : true,

})