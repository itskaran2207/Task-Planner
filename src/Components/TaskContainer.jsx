import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCard } from "../slices/formSlices";
import { setData } from "../slices/dataSlices";
import { Box, Stack, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import DropArea from "./DropArea";
import ItemCard from "./ItemCard";

const TaskContainer = () => {
  const dispatch = useDispatch();
  const activeCard = useSelector((state) => state.Form.activeCard);
  const data = useSelector((state) => state.Data.data);

  const { searchByTask, searchByAssignee, searchByPriority } = useSelector(
    (state) => state.Search
  );

  const onDrop = (status, position) => {
    console.log(status, position);
    if (activeCard == null || activeCard === undefined) return;

    const taskToMove = data[activeCard];
    const UpdatedTasks = data.filter((item, index) => index !== activeCard);
    UpdatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status,
    });

    dispatch(setData(UpdatedTasks));
    dispatch(setActiveCard(null));
  };

  const filteredData = (status) => {
    return data.filter((item) => {
      return (
        item.status === status &&
        item.title.toLowerCase().includes(searchByTask) &&
        (searchByAssignee.length === 0 ||
          searchByAssignee.includes(item.assignee)) &&
        (searchByPriority.length === 0 ||
          searchByPriority.includes(item.priority))
      );
    });
  };

  return (
    <Stack
      direction="row"
      width="100vw"
      display="flex"
      height="900px"
      justifyContent="space-evenly"
      alignItems="center"
      backgroundColor="#FFF4b7"
    >
      {["backlog", "in progress", "review", "complete"].map((status) => (
        <Box
          key={status}
          draggable
          
          width="300px"
          height= "95%"
          borderRadius="5px"
          border="0.5px solid black"
          backgroundColor="white"
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
            height= "95%"
            padding= "10px"
            display= "flex"
            flexDirection= "column"
            overflow= "scroll"
          >
            <DropArea
              onDrop={() => {
                onDrop(status, 0);
              }}
            />
            {filteredData(status).map((item, index) => (
              <Box key={index}>
                <ItemCard item={item} index={index} />
                <DropArea
                  onDrop={() => {
                    onDrop(status, index + 1);
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Stack>

    // <div>hello</div>
  );
};

export default TaskContainer;
