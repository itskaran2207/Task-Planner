import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showForm: false,
  editTask: null,
  activeCard: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setShowForm: (state, action) => {
      state.showForm = action.payload;
    },
    setEditTask: (state, action) => {
      state.editTask = action.payload;
    },
    setActiveCard: (state, action) => {
      state.activeCard = action.payload;
    },
  },
});

export const { setShowForm, setEditTask, setActiveCard } = formSlice.actions;
export default formSlice.reducer;
