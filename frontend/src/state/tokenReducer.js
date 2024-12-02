import { createSlice } from "@reduxjs/toolkit";


export const setSlice=createSlice({
    name:'set',
    initialState:{
        value:null
    },
    reducers:{
        set:(state,action)=>{
            state.value=action.payload
        }
    }

})

export const {  set } = setSlice.actions

export default setSlice.reducer