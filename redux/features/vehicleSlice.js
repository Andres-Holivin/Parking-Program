import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data: [],
    status: "idle",//'idle' | 'loading' | 'succeeded' | 'failed',
    message: ""
}
export const fetchVehicle = createAsyncThunk("vehicle/getAllData", async () => {
    const res = await axios.get("/api/Vehicle");
    return res.data;
})

export const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchVehicle.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(fetchVehicle.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.data = action.payload
            state.message = action.payload.message
        })
        builder.addCase(fetchVehicle.rejected, (state, action) => {
            state.status = "failed"
            state.data = action.payload
            state.message = action.payload.message
        })
    }
})

export default vehicleSlice.reducer

export const selectAllVehicle = (state) => state.vehicle