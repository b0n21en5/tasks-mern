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

  const updateTask = async () => {
    try {
      const { data } = await axios.put(`${updateTaskRoute}/${task._id}`, {
        isDone: isDone,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isDone !== null) {
      updateTask();
    }
  }, [isDone, task._id]);

  return (
    <Link className={styles.task} to={`/task-details/${task._id}`}>
      {task.name}
      {isDone ? (
        <MdOutlineCheckBox
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDone(false);
          }}
        />
      ) : (
        <MdOutlineCheckBoxOutlineBlank
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDone(true);
          }}
        />
      )}
    </Link>
  );
};

export default Task;
