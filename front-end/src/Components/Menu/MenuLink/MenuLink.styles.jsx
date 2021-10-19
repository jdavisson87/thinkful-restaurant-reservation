import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color } from '../../../utils/color-palette';

export const MenuLinkItem = styled(Link)`
  color: ${color.light};
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  margin: 0;
  &:hover {
    color: ${color.mdLight};
  }
`;
