import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchInput: "",
    searchByTask: "",
    searchByAssignee: [],
    searchByPriority: []
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setSearchTask: (state,action)=>{
            state.searchByTask = action.payload;
        },
        setSearchAssignee: (state,action)=>{
            state.searchByAssignee = action.payload;
        },
        setSearchPriority: (state,action)=>{
            state.searchByPriority = action.payload;
        },
        setSearchInput: (state,action)=>{
            state.searchInput = action.payload;
        }
    }
})

export const { setSearchInput,setSearchAssignee,setSearchPriority,setSearchTask} = searchSlice.actions

export default searchSlice.reducer
