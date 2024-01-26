"use client";
import React, { useState } from "react";
import "./Main.style.css";
import { PageTypeEnum, TaskInterface, dummyTaskList } from "./Task.type";
import { TaskList } from "./TaskList";
import ListIcon from "@mui/icons-material/List";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { blue, green, lightGreen } from "@mui/material/colors";
import { Button } from "@mui/material";
import { AddTask } from "./AddTask";

export const Main = () => {
  //state to keep the task data
  const [taskList, setTaskList] = useState(dummyTaskList as TaskInterface[]);
  const [shownPage, setShownPage] = useState(PageTypeEnum.list);

  const onAddTask = () => {
    setShownPage(PageTypeEnum.add);
  };

  return (
    <>
      <article className="article-style">
        <header>
          <h1>DASHBOARD</h1>
        </header>
      </article>

      <section className="content-section">
        <div>
          {shownPage === PageTypeEnum.list && (
            <>
              <h1 style={{ marginBottom: "16px", marginTop: "40px" }}>
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
              <TaskList list={taskList} />
            </>
          )}
        </div>

        {shownPage === PageTypeEnum.add && <AddTask />}
      </section>
    </>
  );
};
