import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, TextareaAutosize, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const TaskForm = ({showForm, setShowForm, data, setData}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    assignee: "",
    status: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setData([...data, formData]);
    setShowForm(false);
    setFormData({
      title: "",
      description: "",
      priority: "",
      assignee: "",
      status: ""
    })
  };

  const handleCloseForm = ()=>{
    setShowForm(false);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", padding:5 , gap: 2, minWidth: "800px", borderRadius: 3, justifyContent: "center", alignItems: "center", zIndex: 200, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", border: "1px solid black", visibility: `${showForm} ? "visible" : "hidden"`, backgroundColor:'#fff',}}>
      <CloseIcon onClick={handleCloseForm} sx={{position: "absolute", top: "2px", right: "2px"}}/>
      <TextField label="Task Title" name="title" value={formData.title} onChange={handleChange} fullWidth required />
      
      <TextareaAutosize
        minRows={3}
        placeholder="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid black" }}
        required
      />
      
      <FormControl fullWidth>
        <InputLabel>Priority</InputLabel>
        <Select name="priority" value={formData.priority} onChange={handleChange} required>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl fullWidth>
        <InputLabel>Assignee</InputLabel>
        <Select name="assignee" value={formData.assignee} onChange={handleChange} required>
          <MenuItem value="Vikash Dwevedi">Vikash Dwevedi</MenuItem>
          <MenuItem value="Sanskriti Saluja">Sanskriti Saluja</MenuItem>
          <MenuItem value="Abhishek Sharma">Abhishek Sharma</MenuItem>
          <MenuItem value="Lawanya Dhamija">Lawanya Dhamija</MenuItem>
          <MenuItem value="Jitendra Sarswat">Jitendra Sarswat</MenuItem>
          <MenuItem value="Bhaskar Nag">Bhaskar Nag</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select name="status" value={formData.status} onChange={handleChange} required>
          <MenuItem value="BackLog">BackLog</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Review">Review</MenuItem>
          <MenuItem value="Complete">Complete</MenuItem>
        </Select>
      </FormControl>
      
      <Button variant="contained" color="primary" type="submit" fullWidth>Save</Button>
    </Box>
  );
};

export default TaskForm;
