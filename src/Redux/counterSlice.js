import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    timovi:[],
    value: 0,
    timBodovi:[]
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },

        dodajPoene: (state, action) => {
            
          
            
        },
        dodajTimove: (state, action) => {
            state.timovi = action.payload
            let temporary = new Array(action.payload.length).fill(0);
            state.timBodovi = temporary;
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, dodajPoene, dodajTimove } = counterSlice.actions

export default counterSlice.reducer