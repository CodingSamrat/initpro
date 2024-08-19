




import ApiManager from '@/config/api.config';
import { createAsyncThunk } from '@reduxjs/toolkit'



export const Increment = createAsyncThunk(
    "Increment",

    async (object, { getState, rejectWithValue, fulfillWithValue }) => {
        try {

            let { data } = await ApiManager.put(`/counter/increment`, object)


            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


export const Decrement = createAsyncThunk(
    "Decrement",

    async (object, { getState, rejectWithValue, fulfillWithValue }) => {
        try {

            let { data } = await ApiManager.put(`/counter/decrement`, object)


            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

