import { Button, FormControl, FormLabel, TextField } from "@mui/material";
import React from "react";
import "./Main.style.css";

export const AddTask = () => {
  return (
    <>
      <h1>AddTask</h1>
      <div>
        <FormControl>
          <FormLabel>Enter Name</FormLabel>
          <TextField></TextField>
          <Button>Submit</Button>
        </FormControl>
      </div>
    </>
  );
};
