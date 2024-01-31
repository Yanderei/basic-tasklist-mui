"use client";
import React, { useEffect, useState } from "react";
import "./Main.style.css";
import { PageTypeEnum, TaskInterface, dummyTaskList } from "./Task.type";
import { TaskList } from "./TaskList";
import ListIcon from "@mui/icons-material/List";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { blue, green, lightGreen } from "@mui/material/colors";
import { Button } from "@mui/material";
import AddTask from "./AddTask";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EditTask from "./EditTask";

type Props = {
  data: TaskInterface[];
};

export const Main = (props: Props) => {
  const { data } = props;

  //state to keep the task data
  const [taskList, setTaskList] = useState([] as TaskInterface[]);
  const [shownPage, setShownPage] = useState(PageTypeEnum.list);
  const [dataToEdit, setDataToEdit] = useState({} as TaskInterface);

  //should load only once when main loads for the first time
  useEffect(() => {
    _setTaskList(data);

    const listString = window.localStorage.getItem("TaskList");
    if (listString) {
      _setTaskList(JSON.parse(listString));
    }
  }, []);

  const onAddTask = () => {
    setShownPage(PageTypeEnum.add);
  };

  const showListPage = () => {
    setShownPage(PageTypeEnum.list);
  };

  const handleAddTask = (data: TaskInterface) => {
    //append data
    _setTaskList([...taskList, data]);
  };

  function handleDeleteTask(data: TaskInterface) {
    const indexDelete = taskList.indexOf(data);
    const newData = taskList.filter((_, i) => i !== indexDelete);
    _setTaskList(newData);
  }

  function editTaskData(data: TaskInterface): void {
    setDataToEdit(data);
    setShownPage(PageTypeEnum.edit);
  }

  function updateTaskData(data: TaskInterface): void {
    const filteredData = taskList.filter((item) => item.id === data.id)[0]; //need only first record
    const indexEdit = taskList.indexOf(filteredData);
    const tempData = [...taskList];
    tempData[indexEdit] = data;
    _setTaskList(tempData);
  }

  const _setTaskList = (list: TaskInterface[]) => {
    setTaskList(list);
    window.localStorage.setItem("TaskList", JSON.stringify(list));
  };

  return (
    <>
      <article className="article-style">
        <header>
          <h1>
            TASKBOARD <DashboardIcon fontSize="medium" />{" "}
          </h1>
        </header>
      </article>

      <section className="content-section">
        <div>
          {shownPage === PageTypeEnum.list && (
            <>
              <h1
                className="tasklist-text-style"
                style={{ marginBottom: "16px", marginTop: "40px" }}
              >
                Task List <ListIcon />
              </h1>
              <Button
                variant="contained"
                color="success"
                startIcon={<AddTaskIcon sx={{ color: lightGreen[100] }} />}
                style={{ marginBottom: "16px", marginTop: "10px" }}
                onClick={onAddTask}
              >
                Add Task
              </Button>
              <TaskList
                list={taskList}
                onDeleteClicked={handleDeleteTask}
                onEditTask={editTaskData}
              />
            </>
          )}
        </div>

        {shownPage === PageTypeEnum.add && (
          <AddTask
            onBackButtonClicked={showListPage}
            handleSubmitFunction={handleAddTask}
            list = {taskList}
          />
        )}
        {shownPage === PageTypeEnum.edit && (
          <EditTask
            onBackButtonClicked={showListPage}
            handleUpdateFunction={updateTaskData}
            taskData={dataToEdit}
            list={taskList}
          />
        )}
      </section>
    </>
  );
};
