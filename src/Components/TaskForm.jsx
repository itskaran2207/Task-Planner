import React, { useEffect,useState } from "react";
import { TextField } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import { Box } from "@mui/material";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../slices/dataSlices";
import { formStyle } from "../Styles/formStyle";

import {
  setShowForm,
  setEditTask,
  // setFormData,
  // resetFormData,
} from "../slices/formSlices";

import {
  assigneeOptions,
  priorityOptions,
  statusOptions,
} from "../data/options";

const form = {
  title: "",
  description: "",
  priority: "",
  assignee: "",
  status: ""
}

const TaskForm = () => {
  // const formData = useSelector((state) => state.Form.formData);
  const [formData,setFormData] = useState(form);
  const showForm = useSelector((state) => state.Form.showForm);
  const data = useSelector((state) => state.Data.data);
  const editTask = useSelector((state) => state.Form.editTask);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editTask) {
      setFormData(editTask);
    } else {
      
      setFormData(form);
    }
  }, [editTask, dispatch]);

  const handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editTask) {
      const updatedTasks = data.map((task) =>
        task.title === editTask.title ? formData : task
      );

      dispatch(setData(updatedTasks));
      dispatch(setEditTask(null));
    } else {
      dispatch(setData([...data, formData]));
    }

    dispatch(setShowForm(false));
    setFormData(form);

  };

  const handleCloseForm = () => {
    dispatch(setShowForm(false));
    dispatch(setEditTask(null));
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value })
  };

  return (
    <Modal open={showForm} onClose={handleCloseForm}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={formStyle.box}
      >
        <CloseIcon
          onClick={handleCloseForm}
          sx={formStyle.closeicon}
        />

        <TextField
          label="Task Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextareaAutosize
          minRows={3}
          placeholder="Description"
          name="description"
          value={formData.description}
          onChange={handleDescriptionChange}
          style={formStyle.textarea}
          required
        />

        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            {priorityOptions.map((priority) => {
              return <MenuItem value={priority}>{priority}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Assignee</InputLabel>
          <Select
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            required
          >
            {assigneeOptions.map((assign) => {
              return <MenuItem value={assign}>{assign}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            {statusOptions.map((assign) => {
              return <MenuItem value={assign}>{assign}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" type="submit" fullWidth>
          {editTask ? "Save Changes" : "Save"}
        </Button>
      </Box>
    </Modal>
  );
};

export default React.memo(TaskForm);
