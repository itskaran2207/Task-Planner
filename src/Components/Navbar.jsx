import { AppBar, Toolbar, Typography, InputBase, IconButton, FormControl, Select, MenuItem, Chip, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput,setSearchTask, setSearchAssignee, setSearchPriority } from "../slices/searchSlices";
import { debounce } from "lodash";
import { assigneeOptions, priorityOptions } from "../data/options";
import { setEditTask,setShowForm } from "../slices/formSlices";

const Navbar = () => {
  const dispatch = useDispatch();
  const { searchInput, searchByAssignee, searchByPriority } = useSelector((state) => state.Search);

  const debouncedSearch = debounce((searchString)=>{
      console.log(searchString);
      dispatch(setSearchTask(searchString));
    },1000);
    const debouncedSearchInput = (e) => {
      dispatch(setSearchInput(e.target.value));
      debouncedSearch(e.target.value);
    };

    const handleButtonClick = () => {
        
        dispatch(setEditTask(null));
        dispatch(setShowForm(true));
    };

    const handleAssigneeChange = (e) => {
      dispatch(setSearchAssignee(e.target.value));
  
    };
  
    const handlePriorityChange = (e) => {
      dispatch(setSearchPriority(e.target.value));
      
    };

  return (
    <AppBar position="static"  sx={{ backgroundColor: "cornflowerblue", padding: "2px" }}>
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        
        
        <Box   sx={{ display: "flex", alignItems: "center", backgroundColor: "white", padding: "3px", borderRadius: "3px", flexGrow: 1 }}>
          <SearchIcon sx={{ color: "#757575", marginX: 1 }} />
          <InputBase
            placeholder="Search for a task..." 
            value={searchInput}
            onChange={debouncedSearchInput}
            sx={{ flexGrow: 1 }}
          />
        </Box>

       
        <FormControl size="small" sx={{ minWidth: 400, backgroundColor: "white" }}>
          <Select
            multiple
            displayEmpty
            value={searchByAssignee}
            onChange={handleAssigneeChange}
            renderValue={(selected) =>
              selected.length ? selected.map((val) => <Chip key={val} label={val} sx={{ margin: "2px" }} />) : "Filter by Assignee"
            }
          >
            {assigneeOptions.map((name) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>

      
        <FormControl size="small" sx={{ minWidth: 250, backgroundColor: "white" }}>
          <Select
            multiple
            displayEmpty
            value={searchByPriority}
            onChange={handlePriorityChange}
            renderValue={(selected) =>
              selected.length ? selected.map((val) => <Chip key={val} label={val} sx={{ margin: "2px" }} />) : "Filter by Priority"
            }
          >
            {priorityOptions.map((priority) => (
              <MenuItem key={priority} value={priority}>{priority}</MenuItem>
            ))}
          </Select>
        </FormControl>

    
        <Button variant="contained" sx={{ backgroundColor: "yellow", color: "black", "&:hover": { backgroundColor: "gold" } }} onClick={handleButtonClick}>
          Add Task
        </Button>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
