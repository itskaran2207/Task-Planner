import TaskForm from "./Components/TaskForm";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";
import ItemCard from "./Components/ItemCard";
import Button from "@mui/material/Button";
import DropArea from "./Components/DropArea";
import { MenuItem, Select, InputLabel, FormControl, Chip } from "@mui/material";

import { useSelector } from "react-redux";


import Navbar from "./Components/Navbar";
import TaskContainer from "./Components/TaskContainer";

function App() {
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
