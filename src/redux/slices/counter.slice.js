import { createSlice } from '@reduxjs/toolkit'
import * as R from '../reducers/counter.reducer'

export const CounterSlice = createSlice({
    name: "counter",
    initialState: {
        counter: 0,


        loading: false,
        isSuccess: false,
        notFound: false,


        message: "",
        error: ""
    },
    reducers: {
        clearCounterMessage: (state, _) => {
            state.error = ''
            state.message = ''
        },
        setCounter: (state, action) => {
            state.counter = action.payload.counter;
        },



    },

    // You can bind extra reducers to the slice
    // This is mainly use API call
    // These functions are coming from `counter.reducer.js` 
    extraReducers: (builder) => {

        builder
            .addCase(R.Increment.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(R.Increment.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
                state.counter = action.payload.counter;
            })
            .addCase(R.Increment.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
            })


        builder
            .addCase(R.Decrement.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(R.Decrement.fulfilled, (state, action) => {
                state.loading = false;
                state.isSuccess = true;
                state.counter = action.payload.counter;
            })
            .addCase(R.Decrement.rejected, (state, action) => {
                state.loading = false;
                state.isSuccess = false;
            })

    }
})


export const { clearCounterMessage } = CounterSlice.actions;
export default CounterSlice.reducer