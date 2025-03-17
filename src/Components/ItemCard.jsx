import { Box, Typography, IconButton, Paper } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import "../App.css";

function ItemCard({ item, setEditTask, setShowForm, index, setActiveCard }) {
  const handleEditClick = () => {
    setEditTask(item);
    setShowForm(true);
  };

  return (
    <Paper
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
      elevation={4}
      className="task-card"
      sx={{
        width: "100%",
        padding: "15px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "#F6F8D5",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        cursor: "grab",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
        },
        border: '0.5px solid black'
      }}
    >
      {/* Title */}
      <Typography variant="h6" sx={{ fontWeight: "bold", textWrap: "wrap" }}>
        {item.title}
      </Typography>

      {/* Description */}
      <Typography variant="body2" sx={{ color: "#555" }}>
        {item.description}
      </Typography>

      {/* Assignee */}
      <Typography variant="body2" sx={{ fontWeight: "500", color: "#333" }}>
        <b>Assignee:</b> {item.assignee}
      </Typography>

      {/* Bottom Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Priority Badge */}
        <Box
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: item.priority === "high" ? "#ff6b6b" :
                            item.priority === "medium" ? "#ffaf40" : "#4ecdc4",
            color: "white",
            borderRadius: "5px",
            padding: "4px 10px",
            minWidth: "80px",
          }}
        >
          {item.priority}
        </Box>

        {/* Edit Button */}
        <IconButton onClick={handleEditClick} sx={{ color: "#007bff" }}>
          <EditIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default React.memo(ItemCard);
