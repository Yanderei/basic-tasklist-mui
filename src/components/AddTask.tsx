import { TextField } from "@mui/material";
import React from "react";

export const AddTask = () => {
  return (
    <>
      <h1>AddTask</h1>
      <div>
        <form>
        <TextField
          id="status"
          label="Status"
          defaultValue="active"
          helperText="Status of task"
        />
        </form>
      </div>
    </>
  );
};
