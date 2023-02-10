import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data: [],
    status: "idle",//'idle' | 'loading' | 'succeeded' | 'failed',
    message: "",
    resetToDefault:false
}

export const fetchParking = createAsyncThunk("parking/getAllData", async (body, thunkAPI) => {
    try {
        console.log(body)
        const res = await axios.get("/api/Parking", { params: body });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.response })
    }
})
export const parkingSlice = createSlice({
    name: 'parking',
    initialState,
    reducers: {
        changeReset(state,action){
            state.resetToDefault=true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchParking.pending, (state) => {
            state.status = "loading"
            state.resetToDefault=false
        })
        builder.addCase(fetchParking.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.data = action.payload.result
            state.message = action.payload.message
            state.total_data = action.payload.total_data
        })
        builder.addCase(fetchParking.rejected, (state, action) => {
            state.status = "failed"
            state.data = action.payload.error.data.result
            state.message = action.payload.error.data.message
        })
    }
})

export default parkingSlice.reducer

export const selectAllParking = (state) => state.parking
export const { changeReset } = parkingSlice.actions