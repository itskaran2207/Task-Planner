import { Box, Typography, IconButton, Paper } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import "../App.css";
import { setShowForm, setEditTask, setActiveCard} from '../slices/formSlices';
import { useDispatch,} from "react-redux";
import { itemStyle } from "../Styles/itemStyle";


// { item, setEditTask, setShowForm, index, setActiveCard }
function ItemCard({item,index}) {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    console.log("console");
    dispatch(setEditTask(item));
    dispatch(setShowForm(true));
    
  };

  return (
    <Paper
      draggable
      onDragStart={() => dispatch(setActiveCard(index))}
      onDragEnd={() => dispatch(setActiveCard(null))}
      elevation={4}
      className="task-card"
      sx={itemStyle(item.priority).item_container}
    >
      {/* Title */}
      <Typography variant="h6" sx={itemStyle(item.priority).item_card_title}>
        {item.title}
      </Typography>

      {/* Description */}
      <Typography variant="body2" sx={itemStyle(item.priority).item_card_desc}>
        {item.description}
      </Typography>

      {/* Assignee */}
      <Typography variant="body2" sx={itemStyle(item.priority).item_card_assignee}>
        <b>Assignee:</b> {item.assignee}
      </Typography>

      {/* Bottom Section */}
      <Box sx={itemStyle(item.priority).item_card_box}>
        
        {/* Priority Badge */}
        <Box
          sx={itemStyle(item.priority).item_card_priority}
        >
          {item.priority}
        </Box>

        {/* Edit Button */}
        <IconButton color="#007bff" onClick={handleEditClick} >
          <EditIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default React.memo(ItemCard);
