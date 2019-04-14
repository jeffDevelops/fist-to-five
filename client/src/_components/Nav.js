import React from 'react';
import { withRouter } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';

import P from '../_styled/P';
import Button from '../_styled/Button';

import { ReactComponent as Logo } from '../assets/logo.svg';

import { BCS_TOKEN, BCS_USER_ID } from '../enum/localStorageKeys';

const NavBar = styled.nav`
  background-color: ${props => props.theme.bcs};
  width: 100%;
  height: 75px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${props => props.theme.boxShadow};
`;

const FlexGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: ${props => props.width ? props.width : 'auto'};
`;

const LogoContainer = styled.div`
  width: 75px;
  display: inline-block;
`;

const Nav = props => (
  <NavBar>
    <FlexGroup>
      <LogoContainer>
        <Logo />
      </LogoContainer>
      <P margin="0 0 0 15px" display="inline-block">Fist To Five</P>
    </FlexGroup>

    <FlexGroup width="100px">
      <Button 
        backgroundColor="#fff"
        color={ props.theme.bcs }
        onClick={ () => {
          localStorage.removeItem(BCS_TOKEN);
          localStorage.removeItem(BCS_USER_ID);
          props.history.push('/login');
        }}>Logout</Button>
    </FlexGroup>

  </NavBar>
);

export default withRouter(withTheme(Nav));