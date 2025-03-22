import React from "react";
import { Stack } from "@mui/material";
import TaskColumn from "./TaskColumn";

const TaskContainer = () => {
  // ["backlog", "in progress", "review", "complete"]
  return (
    <Stack
      direction="row"
      width="100vw"
      display="flex"
      //   height="900px"
      justifyContent="space-evenly"
      alignItems="center"
      backgroundColor="#FFF4b7"
      flexWrap="wrap"
      padding={3}
    >
      {["backlog", "in progress", "review", "complete"].map((status) => (
        <TaskColumn key={status} status={status} />
      ))}
    </Stack>

    // <div>hello</div>
  );
};

export default TaskContainer;
