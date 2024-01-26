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
import {
  IconButton,
  ThemeProvider,
  alpha,
  createTheme,
  getContrastRatio,
} from "@mui/material";

const defaultTheme = createTheme();

// Augment the palette to include an ochre color
declare module "@mui/material/styles" {
  interface Palette {
    mycolor: Palette["primary"];
  }

  interface PaletteOptions {
    mycolor?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    mycolor: true;
  }
}

const colorbase = "#DB7093";
const colormain = alpha(colorbase, 0.7);

const theme = createTheme({
  palette: {
    mycolor: {
      main: colormain,
      light: alpha(colorbase, 0.2),
      dark: alpha(colorbase, 0.9),
      contrastText: getContrastRatio(colormain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});


type Props = {
  list: TaskInterface[];
};
export const TaskList = (props: Props) => {
  const { list } = props;

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 400, backgroundColor: "white" }}
          aria-label="simple table"
        >
          <TableHead sx={{ backgroundColor: "mycolor.light" }}>
            <TableRow>
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
                    <IconButton
                      //variant="outlined"
                      color="primary"
                      size="small"
                    >
                    <PreviewIcon sx={{ color: blue[500] }} />
                    </IconButton>
                    <IconButton
                      //variant="outlined"
                      color="secondary"
                      size="small">
                      <EditIcon sx={{ color: "purple"[500] }} />
                    </IconButton>

                    <IconButton
                      //variant="outlined"
                      color="error"
                      size="small"
                      
                    >
                      <DeleteIcon sx={{ color: red[500] }} />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};
