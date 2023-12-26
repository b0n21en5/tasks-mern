import React, { useEffect, useState } from "react";
import axios from "axios";
import { addTaskRoute, allTasksRoute } from "../../utills/apiRoutes";
import { Link } from "react-router-dom";
import Task from "../../components/Task/Task";

import styles from "./Home.module.css";

const Home = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", description: "" });

  const fetchAlltasks = async () => {
    try {
      const { data } = await axios.get(`${allTasksRoute}?page=1&pageSize=8`);
      setAllTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAlltasks();
  }, []);

  const handleInputChange = (event, fieldName) => {
    setNewTask((prev) => ({ ...prev, [fieldName]: event.target.value }));
  };

  const handleAddNewTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${addTaskRoute}`, newTask);
      setNewTask({ name: "", description: "" });
      fetchAlltasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.homeCnt}>
      {/* Add new task here */}
      <form className={styles.addNew} onSubmit={handleAddNewTask}>
        <input
          type="text"
          placeholder="Enter task name"
          onChange={(e) => handleInputChange(e, "name")}
          value={newTask.name}
          required
        />
        <textarea
          type="text"
          placeholder="Enter task description"
          onChange={(e) => handleInputChange(e, "description")}
          value={newTask.description}
          rows={12}
          required
        />
        <button className={styles.addBtn} type="submit">
          Add Task
        </button>
      </form>

      {/*  All tasks list with pagination */}
      <div className={styles.allTasks}>
        {allTasks?.map((task) => (
          <Task task={task} key={task._id} />
        ))}
        <Link className={styles.showAll} to={"/all-tasks"}>
          Show All Tasks
        </Link>
      </div>
    </div>
  );
};

export default Home;
