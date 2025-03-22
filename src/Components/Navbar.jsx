import { AppBar, Toolbar, Typography, InputBase, IconButton, FormControl, Select, MenuItem, Chip, Button, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { setSearchInput, setSearchTask, setSearchAssignee, setSearchPriority } from "../slices/searchSlices";
import { assigneeOptions, priorityOptions } from "../data/options";
import { setEditTask, setShowForm } from "../slices/formSlices";

const Navbar = () => {
  const dispatch = useDispatch();
  const { searchInput, searchByAssignee, searchByPriority } = useSelector(
    (state) => state.Search
  );

  const debouncedSearch = debounce((searchString) => {
    dispatch(setSearchTask(searchString));
  }, 500);

  const handleSearchInput = (e) => {
    dispatch(setSearchInput(e.target.value));
    debouncedSearch(e.target.value);
  };

  const handleButtonClick = () => {
    dispatch(setEditTask(null));
    dispatch(setShowForm(true));
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "cornflowerblue", p: 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: "center",
          color:'#EAEAEA'
        }}
      >
        {/* Search Box */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 1,
            px: 2,
            width: { xs: "100%", sm: "100%", md: "350px", lg: "400px" },
          }}
        >
          <SearchIcon sx={{ color: "#757575", mr: 1 }} />
          <InputBase
            placeholder="Search for a task..."
            value={searchInput}
            onChange={handleSearchInput}
            sx={{ flexGrow: 1 }}
          />
        </Box>

        {/* Assignee Filter */}
        <FormControl
          size="small"
          sx={{
            backgroundColor: "white",
            width: { xs: "100%", sm: "280px", md: "300px", lg: "500px" },
          }}
        >
          <Select
            multiple
            displayEmpty
            value={searchByAssignee}
            onChange={(e) => dispatch(setSearchAssignee(e.target.value))}
            renderValue={(selected) =>
              selected.length
                ? selected.map((val) => <Chip key={val} label={val} sx={{ margin: "2px" }} />)
                : "Filter by Assignee"
            }
          >
            {assigneeOptions.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Priority Filter */}
        <FormControl
          size="small"
          sx={{
            backgroundColor: "white",
            width: { xs: "100%", sm: "180px", md: "200px", lg: "250px" },
          }}
        >
          <Select
            multiple
            displayEmpty
            value={searchByPriority}
            onChange={(e) => dispatch(setSearchPriority(e.target.value))}
            renderValue={(selected) =>
              selected.length
                ? selected.map((val) => <Chip key={val} label={val} sx={{ margin: "2px" }} />)
                : "Filter by Priority"
            }
          >
            {priorityOptions.map((priority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Add Task Button */}
        <Button
          variant="contained"
          onClick={handleButtonClick}
          sx={{
            backgroundColor: "yellow",
            color: "black",
            "&:hover": { backgroundColor: "gold" },
            width: { xs: "100%", sm: "auto" },
            px: { xs: 2, sm: 4 },
            height: "37px",
          }}
        >
          + Add Task
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
