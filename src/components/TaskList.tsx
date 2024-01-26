"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { TaskInterface } from "./Task.type";
import { format } from "date-fns";
import { blue, green, pink, red } from "@mui/material/colors";
import "./Main.style.css";


type Props = {
  list: TaskInterface[];
};
export const TaskList = (props: Props) => {
  const { list } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400, backgroundColor: "white"}} aria-label="simple table" >
        <TableHead sx={{ backgroundColor: "lightgrey"}} >
          <TableRow >
            <TableCell align="left">Title&nbsp;</TableCell>
            <TableCell align="left">Description&nbsp;</TableCell>
            <TableCell align="left">Due Date&nbsp;</TableCell>
            <TableCell align="left">Status&nbsp;</TableCell>
            <TableCell align="center">Actions&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((task) => (
            <TableRow
              key={task.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{task.title} </TableCell>
              <TableCell align="left">{task.description}</TableCell>
              <TableCell align="left">
                {format(task.due_date, "yyyy-MM-dd HH:mm:ss")}
              </TableCell>
              <TableCell align="left">{task.status}</TableCell>
              <TableCell align="center">
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<PreviewIcon sx={{ color: blue[500] }} />}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<EditIcon sx={{ color: "purple"[500] }} />}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon sx={{ color: red[500] }} />}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
