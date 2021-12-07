import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import './Menu.css';

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

const Menu = () => {
  const [toggle, setToggle] = useState(true);

  // if screen size decreases, need to toggle back to true
  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-0">
            <span>Periodic Tables</span>
            <br />
            <span> Reservation System</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        {toggle && (
          <ul className="nav navbar-nav text-light" id="accordionSidebar">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                <span className="oi oi-dashboard" />
                &nbsp;Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">
                <span className="oi oi-magnifying-glass" />
                &nbsp;Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservations/new">
                <span className="oi oi-plus" />
                &nbsp;New Reservation
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tables/new">
                <span className="oi oi-layers" />
                &nbsp;New Table
              </Link>
            </li>
          </ul>
        )}
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0 plus-btn"
            id="sidebarToggle"
            type="button"
            onClick={() => setToggle(!toggle)}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
