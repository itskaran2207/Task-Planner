import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchByTask: "",
    searchByAssignee: [],
    searchByPriority: []
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setSearchInput: (state,action)=>{
            state.searchByTask = action.payload;
        },
        setSearchAssignee: (state,action)=>{
            state.searchByAssignee = action.payload;
        },
        setSearchPriority: (state,action)=>{
            state.searchByPriority = action.payload;
        },
    }
})

export const { setSearchInput,setSearchAssignee,setSearchPriority} = searchSlice.actions

export default searchSlice.reducer
