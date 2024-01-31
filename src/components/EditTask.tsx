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
import EditNoteIcon from "@mui/icons-material/EditNote";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import {
  alpha,
  createTheme,
  getContrastRatio,
  ThemeProvider,
} from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
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
import { PrioLevels, StatusLevels, TaskInterface } from "./Task.type";
import { v4 as uuidv4 } from "uuid";

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
  handleUpdateFunction: (data: TaskInterface) => void;
  taskData: TaskInterface;
  list: TaskInterface[];
};

export function findAssigneeByName(
  list: TaskInterface[],
  assigneeName: string
) {
  for (const task of list) {
    if (task.assignee.displayName === assigneeName) {
      return task.assignee;
    }
  }
  return null;
}

export default function EditTask(props: Props) {
  const { list, onBackButtonClicked, handleUpdateFunction, taskData } = props;

  const [prio, setPrio] = React.useState(taskData.priorityLevel);
  const [titleData, setTitleData] = React.useState(taskData.title);
  const [desc, setDesc] = React.useState(taskData.description);
  const [assigneeData, setAssigneeData] = React.useState(taskData.assignee);
  const [duedate, setDuedate] = React.useState(taskData.dueDate);
  const [statusLevel, setStatusLevel] = React.useState(taskData.status);
  const [notesData, setNotesData] = React.useState(taskData.notes);

  const handleChangePrio = (event: SelectChangeEvent) => {
    setPrio(event.target.value as PrioLevels);
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatusLevel(event.target.value as StatusLevels);
  };

  const onChangeTitle = (e: any) => {
    setTitleData(e.target.value);
  };
  const onChangeDesc = (e: any) => {
    setDesc(e.target.value);
  };

  const onChangeAssignee = (e: any) => {
    const assigneeName = e.target.value;

    let assignee = findAssigneeByName(list, assigneeName);

    if (assignee) {
      setAssigneeData(assignee);
    } else {
      console.log("No assignee found with the name:", assigneeName);
      assignee = {
        userId: uuidv4(),
        displayName: assigneeName,
      };
      setAssigneeData(assignee);
    }
  };
  const onChangeDate = (e: any) => {
    setDuedate(e.target.value);
  };

  const onChangeNotes = (e: any) => {
    setNotesData(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const dueDate = duedate ? duedate : new Date();
    const updatedData: TaskInterface = {
      id: taskData.id,
      title: titleData,
      description: desc,
      assignee: assigneeData,
      dueDate: dueDate,
      status: statusLevel,
      priorityLevel: prio,
      notes: notesData,
    };

    handleUpdateFunction(updatedData);
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
            <EditNoteIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Task
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
                    defaultValue={taskData.title}
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
                    defaultValue={taskData.assignee.displayName}
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
                    defaultValue={taskData.description}
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
                    type="datetime-local"
                    label="Date"
                    defaultValue={taskData.dueDate}
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
                    displayEmpty
                    //displayEmpty
                  >
                    <MenuItem value={PrioLevels.NA}>
                      <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={PrioLevels.HIGH}>High</MenuItem>
                    <MenuItem value={PrioLevels.MEDIUM}>Medium</MenuItem>
                    <MenuItem value={PrioLevels.LOW}>Low</MenuItem>
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
                    <MenuItem value={StatusLevels.NA}>
                      <em>N/A</em>
                    </MenuItem>
                    <MenuItem value={StatusLevels.PENDING}>Pending</MenuItem>
                    <MenuItem value={StatusLevels.PROGRESS}>
                      In Progress
                    </MenuItem>
                    <MenuItem value={StatusLevels.COMPLETED}>
                      Completed
                    </MenuItem>
                    <MenuItem value={StatusLevels.CANCELLED}>
                      Cancelled
                    </MenuItem>
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
                    defaultValue={taskData.notes}
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
              value="Edit Task"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<EditIcon />}
            >
              Update
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
