import TaskForm from "./Components/TaskForm";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";
// import { useState, useEffect } from "react";
import ItemCard from "./Components/ItemCard";
import Button from "@mui/material/Button";
import DropArea from "./Components/DropArea";
import { MenuItem, Select, InputLabel, FormControl, Chip } from "@mui/material";
// import UpdateForm from './Components/UpdateForm';
import { useSelector } from "react-redux";

// import { assigneeOptions, priorityOptions } from "./data/options";
import Navbar from "./Components/Navbar";
import TaskContainer from "./Components/TaskContainer";

function App() {
  // const dispatch = useDispatch();
  const showForm = useSelector((state) => state.Form.showForm);

  return (
    <>
      <Navbar />
      {showForm && <TaskForm />}
      <TaskContainer />
    </>
  );
}

export default App;
