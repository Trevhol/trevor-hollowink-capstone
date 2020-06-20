import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className="nav-wrapper">
        <h1>My Home Room</h1>
        <ul className="right hide-on-med-and-down">
          <NavLink to="/student" exact>
            <li>My Board</li>
          </NavLink>
          <NavLink to="/classroom">
            <li>My Classroom</li>
          </NavLink>
          <NavLink to="/register" exact>
            <li>Register</li>
          </NavLink>
          <NavLink to="/login" exact>
            <li>Login</li>
          </NavLink>
        </ul>
      </header>
    </>
  );
};

export default Header;
