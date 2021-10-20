import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem/MenuItem';

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

const Menu = () => {
  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <span>Periodic Tables</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light" id="accordionSidebar">
          <MenuItem
            address="/dashboard"
            iconClass="oi-dashboard"
            name="Dashboard"
          />
          <MenuItem
            address="/search"
            iconClass="oi-magnifying-glass"
            name="Search"
          />
          <MenuItem
            address="/reservations/new"
            iconClass="oi-plus"
            name="New Reservation"
          />
          <MenuItem
            address="/tables/new"
            iconClass="oi-layers"
            name="New Table"
          />
        </ul>
        {/*<div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          >
            <span className="oi oi-plus" />
          </button>
  </div>*/}
      </div>
    </nav>
  );
};

export default Menu;
