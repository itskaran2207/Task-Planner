
import TaskForm from "./Components/TaskForm";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";
import { useState } from "react";
import ItemCard from "./Components/ItemCard";
import Button from "@mui/material/Button";
import DropArea from "./Components/DropArea";
import { MenuItem, Select, InputLabel, FormControl, Chip } from "@mui/material";
import UpdateForm from './Components/UpdateForm';

function App() {
  const [data, setData] = useState([]);
  const [activeCard,setActiveCard] = useState(null);
  // const [data,setData] = useState({
  //   backlog: [],
  //   inprogress : [],
  //   review: [],
  //   complete: []
  // });

  const assigneeOptions = ["vikash dwevedi", "sanskriti saluja", "abhishek sharma", "lavanya dhamija","jitendra sarswat","bhaskar nag"];
  const priorityOptions = [ "low", "medium","high"];

  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState({
    searchByTask: "",
    // searchByAssignee: "",
    // searchByPriority: "",
    searchByAssignee: [],
    searchByPriority: [],
  });

  const handleButtonClick = () => {
    setEditTask(null);
    setShowForm(true);
  };

  const handleSearchInput = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  // const filteredData = (status) => {
  //   return data.filter(
  //     (item) =>
  //       item.status === status &&
  //       item.title.toLowerCase().includes(search.searchByTask) &&
  //       item.assignee.toLowerCase().includes(search.searchByAssignee) &&
  //       item.priority.toLowerCase().includes(search.searchByPriority)
  //   );
  // };

  const filteredData = (status) => {
    return data.filter((item) => {
      return (
        item.status === status &&
        item.title.toLowerCase().includes(search.searchByTask) &&
        (search.searchByAssignee.length === 0 || 
          search.searchByAssignee.includes(item.assignee)) &&
        (search.searchByPriority.length === 0 || 
          search.searchByPriority.includes(item.priority))
      );
    });
  };

  const handleAssigneeChange = (e) => {
    setSearch({
      ...search,
      searchByAssignee: e.target.value,
    })
  };

  const handlePriorityChange = (e) => {
    setSearch({
      ...search,
      searchByPriority: e.target.value,
    })
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

    setData(UpdatedTasks);
    setActiveCard(null);
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
              value={search.searchByTask}
              onChange={handleSearchInput}
            />
          </div>
          <div className="nav-box" >

            {/* Assignee Multiselect */}
            <FormControl  style={{ width: "600px", backgroundColor: "white",  }} size="small" className="input2">
              <InputLabel>Filter by Assignees</InputLabel>
              <Select
                multiple
                value={search.searchByAssignee}
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
                value={search.searchByPriority}
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

            {/* <input
              type="text"
              name="searchByAssignee"
              className="input"
              id="input2"
              placeholder="Filter by Assignee"
              value={search.searchByAssignee}
              onChange={handleSearchInput}
            />

            <input
              type="text"
              name="searchByPriority"
              className="input"
              id="input3"
              placeholder="Filter by Priority"
              value={search.searchByPriority} 
              onChange={handleSearchInput} 
            /> */}

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

        {showForm && (
          <TaskForm
            showForm={showForm}
            setShowForm={setShowForm}
            data={data}
            setData={setData}
            editTask={editTask}
            setEditTask={setEditTask}
          />
        )}

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
                      <ItemCard
                        item={item}
                        setEditTask={setEditTask}
                        setShowForm={setShowForm}
                        index={index}
                        setActiveCard={setActiveCard}
                    />
                    <DropArea onDrop={()=>{ onDrop(status,index+1)}}/>
                    </div>
                    
                    
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* <h1>{activeCard}</h1> */}
      </div>
    </>
  );
}

export default App;
