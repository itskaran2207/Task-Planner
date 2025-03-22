import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setActiveCard } from "../slices/formSlices";
import { setData } from "../slices/dataSlices";
import { Box, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import DropArea from "./DropArea";
import ItemCard from "./ItemCard";

const TaskColumn = ({ status }) => {
  const dispatch = useDispatch();
  const activeCard = useSelector((state) => state.Form.activeCard);
  const data = useSelector((state) => state.Data.data);

  const { searchByTask, searchByAssignee, searchByPriority } = useSelector(
    (state) => state.Search
  );

  const onDrop = (Status, position) => {
    console.log(status, position);
    if (activeCard == null || activeCard === undefined) return;

    const taskToMove = data[activeCard];
    let UpdatedTasks = data.filter((item, index) => index !== activeCard);
    UpdatedTasks.splice(position, 0, {
      ...taskToMove,
      status: Status,
    });

    dispatch(setData(UpdatedTasks));
    // dispatch(setActiveCard(null));
  };

  const filteredData = (status) => {
    return data
      .map((item, index) => ({ ...item, originalIndex: index })) // Store the original index
      .filter((item) => {
        return (
          item.status === status &&
          item.title
            .toLowerCase()
            .includes((searchByTask || "").toLowerCase()) &&
          (searchByAssignee.length === 0 ||
            searchByAssignee.includes(item.assignee)) &&
          (searchByPriority.length === 0 ||
            searchByPriority.includes(item.priority))
        );
      });
  };

  return (
    <Box
      key={status}
      width="300px"
      //   height= "95%"
      height="850px"
      borderRadius="5px"
      border="0.5px solid black"
      backgroundColor="white"
      mt={1.5}
    >
      <Typography
        sx={{
            backgroundColor:
              status === "backlog"
                ? "rgb(255, 132, 0)"
                : status === "in progress"
                ? "blanchedalmond"
                : status === "review"
                ? "greenyellow"
                : "yellowgreen",
          }}
        textAlign="center"
        fontSize="1.5rem"
        height="4%"
        borderBottom="1px solid black"
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Typography>

      <Box
        height="95%"
        padding="10px"
        display="flex"
        flexDirection="column"
        overflow="scroll"
      >
        <DropArea onDrop={() => onDrop(status, 0)} />
        {filteredData(status).map(({ originalIndex, ...item }) => (
          <Box key={originalIndex}>
            <ItemCard item={item} index={originalIndex} />
            <DropArea onDrop={() => onDrop(status, originalIndex + 1)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TaskColumn;
