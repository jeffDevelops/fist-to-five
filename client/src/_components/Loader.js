import React from 'react';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as LogoImage } from '../assets/logo.svg';

const animate = keyframes`
  0% { transform: scale(1); opacity: 0; }
  50% { transform: scale(1.2); opacity: .5; }
  60% { transform: scale(1.05); opacity: .6; }
  100% { transform: scale(1); opacity: 1;  }
`;

const Logo = styled(LogoImage)`
  animation: ${animate} .4s linear infinite;
`;

const LoaderScrim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = () => (
  <LoaderScrim>
    <Logo width="200px"/>
  </LoaderScrim>
);

export default Loader;