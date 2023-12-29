import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { updateTaskRoute } from "../../utills/apiRoutes";
import axios from "axios";
import styles from "./Task.module.css";

const Task = ({ task }) => {
  const [isDone, setIsDone] = useState(null);

  useEffect(() => {
    setIsDone(task.isDone);
  }, []);

  const updateTask = async (isTaskDone) => {
    try {
      const { data } = await axios.put(`${updateTaskRoute}/${task._id}`, {
        isDone: isTaskDone,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link className={styles.task} to={`/task-details/${task._id}`}>
      {task.name}
      {isDone ? (
        <MdOutlineCheckBox
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDone(false);
            updateTask(false);
          }}
        />
      ) : (
        <MdOutlineCheckBoxOutlineBlank
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDone(true);
            updateTask(true);
          }}
        />
      )}
    </Link>
  );
};

export default Task;
