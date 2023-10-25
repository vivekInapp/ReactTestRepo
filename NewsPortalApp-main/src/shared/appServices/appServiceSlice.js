import { createSlice } from '@reduxjs/toolkit'

export const appServiceSlice = createSlice({
    name : 'appService',
    initialState : {
        loader : false
    },
    reducers : {
        turnLoaderOn : (state)=>{
            state.loader = true;
        },
        turnLoaderOff : (state)=>{
            state.loader = false;
        }
    }
})

export const {turnLoaderOff, turnLoaderOn} = appServiceSlice.actions
export const getLoader = (state)=>state.appService.loader
export default appServiceSlice.reducer