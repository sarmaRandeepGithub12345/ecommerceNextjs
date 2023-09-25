import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    visible:false,
    loading:false,
}
export const counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers : {
       changeVisibility : (state,action)=>{
        state.visible = action.payload
       },
       changeLoading : (state,action)=>{
        state.loading = action.payload
       }
    }
})
export const {changeVisibility,changeLoading} = counterSlice.actions
export default counterSlice.reducer
