import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: JSON.parse(localStorage.getItem("tasks")) || []
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers:{
        addData: (state,action)=>{
            state.data.push(action.payload);
            localStorage.setItem("tasks",JSON.stringify(state.data));
        },
        updateData: (state,action)=>{
            const {index,newdata} = action.payload;
            state.data[index] = {...state.data[index],...newdata};
            localStorage.setItem("tasks",JSON.stringify(state.data));
        },
        setData: (state,action)=>{
            state.data = action.payload;
            localStorage.setItem("tasks",JSON.stringify(state.data));
        }
    }
})

export const { addData, updateData,setData } = dataSlice.actions

export default dataSlice.reducer
