import { Box } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
// import { useMemo } from "react";

function ItemCard({ item, setEditTask, setShowForm }) {
  const handleEditClick = () => {
    setEditTask(item);
    setShowForm(true);
  };

  return (
    <Box
      sx={{
        width: "100%",
        // height: "130px",
        margin: "4px",
        borderRadius: "3px",
        border: "0.5px solid black",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "4px",
        backgroundColor: "#F6F8D5",
        // backgroundColor: "#FBA834",
        boxShadow: "0px 4px 9px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box sx={{ fontSize: "1.5rem", padding: "5px", fontWeight: "bold", textWrap:'wrap'}}>
        {item.title}
      </Box>
      
      <Box sx={{ fontSize: "1.10rem", padding: "5px", color: "#333" }}>
        {item.description}
      </Box>

      <Box sx={{ fontSize: "1.10rem", padding: "5px", color: "#333" }}>
          <b>Assignee:</b> {item.assignee}
      </Box>
      

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            fontSize: "1.25rem",
            width: "35%",
            textAlign: "center",
            backgroundColor: "burlywood",
            border: "0.5px solid black",
            borderRadius: "3px",
            padding: "4px",
          }}
        >
          {item.priority}
        </Box>

        <EditIcon
          sx={{
            fontSize: "1.5rem",
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { color: "blue" },
          }}
          onClick={handleEditClick}
        />
      </Box>

      
    </Box>
  );
}

export default React.memo(ItemCard);
