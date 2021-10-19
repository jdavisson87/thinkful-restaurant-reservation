import React from 'react';
import Menu from '../../Components/Menu/Menu';
import Routes from './Routes';
import { SideBar } from './Layout.styles';

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
const Layout = () => {
  return (
    <div className="container-fluid">
      <div className="row h-100">
        <SideBar className="col-md-2">
          <Menu />
        </SideBar>
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
};

export default Layout;
