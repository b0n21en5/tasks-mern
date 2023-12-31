import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  deleteTaskRoute,
  taskDetailsRoute,
  updateTaskRoute,
} from "../../utills/apiRoutes";

import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { TbPencil } from "react-icons/tb";
import styles from "./TaskDetails.module.css";

const TaskDetails = () => {
  const [task, setTask] = useState({});
  const [isDone, setIsDone] = useState("");

  const { taskid } = useParams();

  const navigate = useNavigate();

  const fetchTaskDetails = async () => {
    try {
      const { data } = await axios.get(`${taskDetailsRoute}/${taskid}`);
      setTask(data);
      setIsDone(data.isDone);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, []);

  const handleDeleteTask = async () => {
    try {
      const { data } = await axios.delete(`${deleteTaskRoute}/${taskid}`);

      if (data.message) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTask = async (putdata) => {
    try {
      const { data } = await axios.put(`${updateTaskRoute}/${taskid}`, putdata);
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.cnt}>
      <div className={styles.details}>
        <div className={styles.taskName}>
          <div>
            <TbPencil style={{ marginTop: "6px" }} />
            <input
              className={styles.heading}
              value={task?.name}
              onChange={(e) => setTask((p) => ({ ...p, name: e.target.value }))}
            />
            {task.isDone ? (
              <MdOutlineCheckBox
                onClick={() => {
                  setIsDone(false);
                  handleUpdateTask({ isDone: false });
                }}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <MdOutlineCheckBoxOutlineBlank
                onClick={() => {
                  setIsDone(true);
                  handleUpdateTask({ isDone: true });
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <TbPencil style={{ marginTop: "6px" }} />
          <textarea
            value={task?.description}
            onChange={(e) =>
              setTask((p) => ({ ...p, description: e.target.value }))
            }
          />
        </div>
      </div>

      <div className={styles.ctaCnt}>
        <div className={styles.btn} onClick={() => handleUpdateTask(task)}>
          Update
        </div>
        <div className={styles.btn} onClick={() => handleDeleteTask()}>
          Delete
        </div>
        <label
          className={styles.btn}
          htmlFor="isDone"
          onClick={() => setIsDone(!isDone)}
        >
          <input name="isDone" type="checkbox" checked={isDone} />
          {isDone ? "Done" : "Active"}
        </label>
      </div>
    </div>
  );
};

export default TaskDetails;
