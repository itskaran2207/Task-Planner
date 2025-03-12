import TaskForm from "./Components/TaskForm";
import SearchIcon from "@mui/icons-material/Search";
import "./App.css";
import { useState } from "react";
import ItemCard from "./Components/ItemCard";
import Button from '@mui/material/Button';

function App() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState({
    searchByTask: "",
    searchByAssignee: "",
    searchByPriority: "",
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

  const filteredData = (status) => {
    return data.filter(
      (item) =>
        item.status === status &&
        item.title.toLowerCase().includes(search.searchByTask) &&
        item.assignee.toLowerCase().includes(search.searchByAssignee) &&
        item.priority.toLowerCase().includes(search.searchByPriority)
    );
  };

  return (
    <>
      <div className="container">
        <nav className="navbar">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              padding: "3px",
              borderRadius: "3px",
            }}
          >
            <SearchIcon sx={{ backgroundColor: "white", fontSize: "1.15rem" }} />
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
          <div className="nav-box">
            <input
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
            />
            <Button variant="contained" sx={{ backgroundColor: "yellow", color: "black", "&:hover": { backgroundColor: "gold" } , fontSize: '2.15 rem', fontWeight: '500'}} color="yellow" onClick={handleButtonClick}>
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
          {["backlog", "in progress", "review", "complete"].map((status, index) => (
            <div className="task-boxes" key={status}>
              <div className="box-title" id={`box-title${index + 1}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </div>
              <div className="box-items">
                {filteredData(status).map((item) => (
                  <ItemCard key={item.title} item={item} setEditTask={setEditTask} setShowForm={setShowForm} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
