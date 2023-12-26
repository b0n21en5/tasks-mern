export const host =
  process.env.NODE_ENV === "production"
    ? "https://tasks-wmmn.onrender.com/api"
    : "http://localhost:8000/api";

export const addTaskRoute = `${host}/tasksto`;

export const allTasksRoute = `${host}/tasksto`; // query: isDone
export const taskDetailsRoute = `${host}/task-details`; // params: taskid

export const updateTaskRoute = `${host}/tasks`; // params: idto

export const deleteTaskRoute = `${host}/tasks`; // params: idto
