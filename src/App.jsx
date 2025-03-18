
import TaskForm from "./Components/TaskForm";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";
// import { useState, useEffect } from "react";
import ItemCard from "./Components/ItemCard";
import Button from "@mui/material/Button";
import DropArea from "./Components/DropArea";
import { MenuItem, Select, InputLabel, FormControl, Chip } from "@mui/material";
// import UpdateForm from './Components/UpdateForm';
import { useDispatch, useSelector } from "react-redux";
import { setShowForm,setEditTask,setActiveCard } from "./slices/formSlices";
import { setSearchInput,setSearchAssignee,setSearchPriority,setSearchTask} from "./slices/searchSlices";
import { setData } from "./slices/dataSlices";
import {debounce} from 'lodash';







function App() {
  


  const dispatch = useDispatch();
  const data = useSelector((state)=> state.Data.data);
  

  const assigneeOptions = ["vikash dwevedi", "sanskriti saluja", "abhishek sharma", "lavanya dhamija","jitendra sarswat","bhaskar nag","amrit aggarwal","asutosh swain"];
  const priorityOptions = [ "low", "medium","high"];

  
  const showForm = useSelector((state)=> state.Form.showForm);
  const activeCard = useSelector((state)=> state.Form.activeCard);

  const {searchInput,searchByTask, searchByAssignee, searchByPriority} = useSelector((state)=> state.Search);

  const handleButtonClick = () => {
    
    dispatch(setEditTask(null));
    dispatch(setShowForm(true));
  };

  const debouncedSearch = debounce((searchString)=>{
    console.log(searchString);
    dispatch(setSearchTask(searchString));
  },1000);

  const debouncedSearchInput = (e) => {
    // dispatch(setSearchInput(e.target.value));
    dispatch(setSearchInput(e.target.value));
    debouncedSearch(e.target.value);
  };

  

  const filteredData = (status) => {
    return data.filter((item) => {
      return (
        item.status === status &&
        item.title.toLowerCase().includes(searchByTask) &&
        (searchByAssignee.length === 0 || 
          searchByAssignee.includes(item.assignee)) &&
        (searchByPriority.length === 0 || 
          searchByPriority.includes(item.priority))
      );
    });
  };

  const handleAssigneeChange = (e) => {
    dispatch(setSearchAssignee(e.target.value));
  };

  const handlePriorityChange = (e) => {
    dispatch(setSearchPriority(e.target.value));
  };

  const onDrop = (status,position) =>{
    console.log(status,position);
    if(activeCard == null || activeCard === undefined) return;

    const taskToMove = data[activeCard];
    const UpdatedTasks = data.filter((item,index) => index !== activeCard);
    UpdatedTasks.splice(position,0,{
      ... taskToMove,
      status: status
    })

    dispatch(setData(UpdatedTasks));
    dispatch(setActiveCard(null));
  }


  return (
    <>
      <div className="container">
        <nav className="navbar">
          <div className="nav-input-container"
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              padding: "5px",
              borderRadius: "1px",
              fontSize: "1.5rem"
            }}
          >
            <SearchIcon
              sx={{ backgroundColor: "white", fontSize: "1.35rem" }}
            />
            <input
              type="text"
              name="searchByTask"
              className="input"
              id="input1"
              placeholder="Search here for a task..."
              value={searchInput}
              // onChange={handleSearchInput}
              onChange={debouncedSearchInput}
            />
          </div>
          <div className="nav-box" >

            {/* Assignee Multiselect */}
            <FormControl  style={{ width: "600px", backgroundColor: "white",  }} size="small" className="input2">
              <InputLabel>Filter by Assignees</InputLabel>
              <Select
                multiple
                value={searchByAssignee}
                onChange={handleAssigneeChange}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        style={{ margin: "2px" }}
                      />
                    ))}
                  </div>
                )}
              >
                {assigneeOptions.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Priority MultiSelect */}
            <FormControl  style={{ width: "300px", backgroundColor: "white"}} size="small" className="input3">
              <InputLabel>Filter by Priorities</InputLabel>
              <Select
                multiple
                value={searchByPriority}
                onChange={handlePriorityChange}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        style={{ margin: "2px" }}
                      />
                    ))}
                  </div>
                )}
              >
                {priorityOptions.map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            

            <Button
              variant="contained"
              sx={{
                backgroundColor: "yellow",
                color: "black",
                "&:hover": { backgroundColor: "gold" },
                fontSize: "2.15 rem",
                fontWeight: "500",
              }}
              color="yellow"
              onClick={handleButtonClick}
            >
              Add Task
            </Button>
          </div>
        </nav>

        {showForm && (<TaskForm/>)}

        <div className="second-container">
          {["backlog", "in progress", "review", "complete"].map(
            (status, index) => (
              <div className="task-boxes" key={status} draggable>
                <div className="box-title" id={`box-title${index + 1}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </div>
                <div className="box-items">
                  <DropArea onDrop={()=>{ onDrop(status,0)}}/> 
                  {filteredData(status).map((item,index) => (
                    <div key={index}>
                      {/* <DropArea onDrop={()=>{ onDrop(status,(index-1 >= 0 ? index-1 : 0))}}/> */}
                      <ItemCard
                        item={item}
                        index={index}
                      />
                    <DropArea onDrop={()=>{ onDrop(status,index+1)}}/>
                    </div>
                    
                    
                  ))}
                </div>
              </div>
            )
          )}
        </div>

       
      </div>
    </>
  );
}

export default App;
