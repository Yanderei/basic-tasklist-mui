import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import {
  alpha,
  createTheme,
  getContrastRatio,
  ThemeProvider,
} from "@mui/material/styles";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "./Main.style.css";
import { TaskInterface } from "./Task.type";
import { AnyAaaaRecord } from "dns";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.linkedin.com/in/raeanndavid-softwaredev/"
      >
        Raeann David Interview Solution
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
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

const commonStyles = {
  bgcolor: "mycolor.light",
  borderColor: "mycolor.contrastText",
  border: 0,
};

type Props = {
  onBackButtonClicked: () => void;
  handleSubmitFunction: (data: TaskInterface) => void;
};

export default function AddTask(props: Props) {
  const { onBackButtonClicked, handleSubmitFunction } = props;

  const [prio, setPrio] = React.useState("");
  const [titleData, setTitleData] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [assigneeData, setAssigneeData] = React.useState("");
  const [duedate, setDuedate] = React.useState("");
  const [statusLevel, setStatusLevel] = React.useState("");
  const [notesData, setNotesData] = React.useState("");

  const handleChangePrio = (event: SelectChangeEvent) => {
    setPrio(event.target.value as string);
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatusLevel(event.target.value as string);
  };

  const onChangeTitle = (e: any) => {
    setTitleData(e.target.value);
  };
  const onChangeDesc = (e: any) => {
    setDesc(e.target.value);
  };
  const onChangeAssignee = (e: any) => {
    setAssigneeData(e.target.value);
  };
  const onChangeDate = (e: any) => {
    setDuedate(e.target.value);
  };

  const onChangeNotes = (e: any) => {
    setNotesData(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const dueDate = duedate ? new Date(duedate) : new Date();
    const data: TaskInterface = {
      id: new Date().toJSON().toString(),
      title: titleData,
      description: desc,
      assignee: assigneeData,
      due_date: dueDate,
      status: statusLevel,
      prio_level: prio,
      notes: notesData,
    };

    handleSubmitFunction(data);
    onBackButtonClicked();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          ...commonStyles,
          borderRadius: "16px",
          mt: 8,
          boxShadow: 1,
          marginBottom: 8,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "green", mt: 5 }}>
            <AddTaskIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Task
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            textAlign={"center"}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    onChange={onChangeTitle}
                    autoComplete="task-title"
                    name="taskTitle"
                    required
                    id="taskTitle"
                    label="Task"
                    autoFocus
                    sx={{ mt: 1 }}
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    onChange={onChangeAssignee}
                    required
                    id="assignee"
                    label="Assignee"
                    name="assignee"
                    autoComplete="assignee-name"
                    sx={{ mt: 1 }}
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    onChange={onChangeDesc}
                    required
                    sx={{ mt: 3, mb: 3 }}
                    fullWidth
                    id="description"
                    label="Description"
                    name="description"
                    autoComplete="description"
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <TextField
                    onChange={onChangeDate}
                    required
                    id="date"
                    name="date"
                    type="date"
                    label="Date"
                    autoComplete="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel shrink required id="prio-level-label">
                    Priority Level
                  </InputLabel>
                  <Select
                    notched
                    labelId="prio-level-label"
                    id="prio-level"
                    value={prio}
                    label="Priority Level"
                    onChange={handleChangePrio}
                    //displayEmpty
                  >
                    <MenuItem value="n/a">
                      <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={"Ten"}>Ten</MenuItem>
                    <MenuItem value={"Twenty"}>Twenty</MenuItem>
                    <MenuItem value={"Thirty"}>Thirty</MenuItem>
                  </Select>
                  <FormHelperText>Priority Level of Task</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ minWidth: 120 }}>
                  <InputLabel shrink required id="status-level-label">
                    Status
                  </InputLabel>
                  <Select
                    notched
                    labelId="status-level-label"
                    id="status-level"
                    value={statusLevel}
                    label="Status"
                    onChange={handleChangeStatus}
                    displayEmpty
                  >
                    <MenuItem value={"n/a"}>
                      <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"In Progress"}>In Progress</MenuItem>
                    <MenuItem value={"Completed"}>Completed</MenuItem>
                    <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    sx={{ mt: 3, mb: 3 }}
                    onChange={onChangeNotes}
                    id="outlined-multiline-static"
                    label="Notes"
                    multiline
                    rows={3}
                    defaultValue=""
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              color="mycolor"
              variant="contained"
              value="Add Task"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<AddIcon />}
            >
              Add
            </Button>
            <IconButton
              sx={{ mb: 2 }}
              type="button"
              color="mycolor"
              size="small"
              onClick={onBackButtonClicked}
            >
              <ArrowCircleLeftOutlinedIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
