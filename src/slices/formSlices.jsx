import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    formData: {
        title: "",
        description: "",
        priority: "",
        assignee: "",
        status: ""
    },
    showForm: false,
    editTask: null,
    activeCard: null
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers:{
        setFormData: (state,action)=>{
            state.formData = {...state.formData,...action.payload}
        },
        resetFormData: (state)=>{
            state.formData = {
                title: "",
                description: "",
                priority: "",
                assignee: "",
                status: ""
            }
        },
        setShowForm: (state,action)=>{
            state.showForm = action.payload;
        },
        setEditTask: (state,action) =>{
            state.editTask = action.payload;
        },
        setActiveCard: (state,action)=>{
            state.activeCard = action.payload;
        }
    }
});

export const {setFormData,resetFormData, setShowForm, setEditTask, setActiveCard} = formSlice.actions;
export default formSlice.reducer;