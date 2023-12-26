import React, { useEffect, useState } from "react";
import { allTasksRoute } from "../../utills/apiRoutes";
import axios from "axios";
import Task from "../../components/Task/Task";
import styles from "./TaskList.module.css";

const TaskList = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAllTasks = async () => {
    try {
      const { data } = await axios.get(
        `${allTasksRoute}?isDone=${isDone}&page=${currentPage}`
      );
      
      setAllTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  useEffect(() => {
    fetchAllTasks();
  }, [isDone, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [isDone]);

  return (
    <div className={styles.pageCnt}>
      {/* Filters for the tasks */}
      <div className={styles.filters}>
        <label
          htmlFor="done"
          onClick={(e) => {
            e.preventDefault();
            setIsDone(true);
          }}
        >
          <input
            name="isDone"
            id="done"
            type="radio"
            checked={isDone === true}
          />
          Completed
        </label>
        <label
          htmlFor="active"
          onClick={(e) => {
            e.preventDefault();
            setIsDone(false);
          }}
        >
          <input
            name="isDone"
            id="active"
            type="radio"
            checked={isDone === false}
          />
          Active
        </label>
      </div>

      {/* All task lists */}
      <div className={styles.allTasks}>
        {allTasks?.map((task) => (
          <Task task={task} key={task._id} />
        ))}

        {/* Pagination controls */}
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>{currentPage}</span>
          <button onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
