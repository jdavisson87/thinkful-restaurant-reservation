import React from 'react';
import { MenuLinkItem } from './MenuLink.styles';

const MenuLink = ({ directsTo }) => (
  <MenuLinkItem to={directsTo}>
    <p>Hey there</p>
  </MenuLinkItem>
);

export default MenuLink;
