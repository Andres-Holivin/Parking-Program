import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data: [],
    status: "idle",//'idle' | 'loading' | 'succeeded' | 'failed',
    message: "",
    type: ""
}
export const addCheckIn = createAsyncThunk("post/CheckIn", async (body, thunkAPI) => {
    console.log(body)
    try {
        const res = await axios.post("/api/CheckIn", body,)
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.response })
    }
})
export const payCheckOut = createAsyncThunk("post/PayCheckOut", async (body, thunkAPI) => {
    try {
        console.log(body)
        const res = await axios.post("/api/CheckOut", body,)
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.response })
    }
})
export const checkTicket = createAsyncThunk("get/CheckTicket", async (body, thunkAPI) => {
    try {
        console.log(body)
        const res = await axios.get("/api/CheckOut", { params: body })
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.response })
    }
})

export const checkSlice = createSlice({
    name: 'check',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCheckIn.pending, (state) => {
            state.status = "loading"
            state.type = "CheckIn";
        })
        builder.addCase(addCheckIn.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.data = action.payload.result
            state.message = action.payload.message
            state.type = "CheckIn";
        })
        builder.addCase(addCheckIn.rejected, (state, action) => {
            state.status = "failed"
            state.data = action.payload.error.data.result
            state.message = action.payload.error.data.message
            state.type = "CheckIn";
        })
        builder.addCase(payCheckOut.pending, (state) => {            
            state.status = "loading"
            state.type = "pay";
        })
        builder.addCase(payCheckOut.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.data = action.payload.result
            state.message = action.payload.message
            state.type = "pay";
        })
        builder.addCase(payCheckOut.rejected, (state, action) => {
            state.status = "failed"
            state.data = action.payload.error.data.result
            state.message = action.payload.error.data.message
            state.type = "pay";
        })
        builder.addCase(checkTicket.pending, (state) => {
            state.status = "loading"
            state.type = "check";
        })
        builder.addCase(checkTicket.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.data = action.payload.result
            state.message = action.payload.message
            state.type = "check";
        })
        builder.addCase(checkTicket.rejected, (state, action) => {
            console.log(state)
            state.status = "failed"
            state.data = action.payload.error.data.result
            state.message = action.payload.error.data.message
            state.type = "check";
        })
    }
})

export default checkSlice.reducer

export const selectAllCheck = (state) => state.check