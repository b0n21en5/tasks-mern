import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const path = useLocation().pathname;

  return (
    <div className={styles.navCnt}>
      <Link to="/" className={path === "/" && styles.active}>
        Home
      </Link>
      <Link to="/all-tasks" className={path === "/all-tasks" && styles.active}>
        All Tasks
      </Link>
    </div>
  );
};

export default Navbar;
