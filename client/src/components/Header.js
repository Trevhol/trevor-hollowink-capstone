import React from "react";
import { NavLink } from "react-router-dom";
const Header = ({ isLoggedIn, loggedIn }) => {
  const logOut = (e) => {
    e.preventDefault();
    localStorage.setItem("user", "");
    loggedIn(false);
  };
  return (
    <header className="main-header">
      <h1 className="main-header__title">My Home Room</h1>
      <ul className="main-header__list">
        <li>
          <NavLink className="main-header__item" to="/" exact>
            My Board
          </NavLink>
        </li>
        <li>
          <NavLink className="main-header__item" to="/classroom">
            My Classroom
          </NavLink>
        </li>
        <li>
          <NavLink className="main-header__item" to="/users">
            My Class
          </NavLink>
        </li>
        <li>
          <NavLink className="main-header__item" to="/register" exact>
            Register
          </NavLink>
        </li>
        <li>
          {isLoggedIn ? (
            <a className="main-header__logout" href="#" onClick={logOut}>
              Log out
            </a>
          ) : (
            <NavLink className="main-header__login" to="/login" exact>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
