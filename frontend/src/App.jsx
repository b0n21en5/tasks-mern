import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import TaskDetails from "./pages/TaskDetails/TaskDetails";
import TaskList from "./pages/TaskList/TaskList";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task-details/:taskid" element={<TaskDetails />} />
        <Route path="/all-tasks" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
