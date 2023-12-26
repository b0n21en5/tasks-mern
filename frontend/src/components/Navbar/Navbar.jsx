import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navCnt}>
      <Link to="/">Home</Link>
      <Link to="/all-tasks">All Tasks</Link>
    </div>
  );
};

export default Navbar;
