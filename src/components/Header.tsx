import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../App";
import Logout from "../auth/Logout";
import User from "./User";

function Header() {
  const context = useContext(AppContext);
  const isLoggedIn = context && context.userName.length > 0;

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/bizcards">
            Business Cards App
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/about">
                  About
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav d-flex">
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/signup"
                    >
                      Sign up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/biz">
                      Business
                    </NavLink>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/mycards">
                      My Cards
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/myfavcards">
                      My Favorite Cards
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <Logout />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <User />
    </header>
  );
}

export default Header;
