import React from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import styles from "./Task.module.css";

const Task = ({ task }) => {
  return (
    <Link className={styles.task} to={`/task-details/${task._id}`}>
      {task.name}
      {task.isDone ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
    </Link>
  );
};

export default Task;
