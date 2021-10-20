import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ address, iconClass, name }) => {
  return (
    <li className="nav-item" key={name}>
      <Link className="nav-link" to={address}>
        <span className={`oi ${iconClass}`} />
        &nbsp;{name}
      </Link>
    </li>
  );
};

export default MenuItem;
