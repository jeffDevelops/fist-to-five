import React from 'react';
import styled from 'styled-components';

import Heading from '../_styled/Heading';

import { ReactComponent as Fist } from '../assets/hands_fist.svg';
import { ReactComponent as One } from '../assets/hands_one.svg';
import { ReactComponent as Two } from '../assets/hands_two.svg';
import { ReactComponent as Three } from '../assets/hands_three.svg';
import { ReactComponent as Four } from '../assets/hands_four.svg';
import { ReactComponent as Five } from '../assets/hands_five.svg';

const Hands = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media(max-width: 600px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const HandContainer = styled.div`
  width: 118px;
  height: 104px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
`;

const Count = styled.p`
  width: 1px;
  height: 1px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 58px auto auto 52px;
  text-align: center;
  font-weight: 600;
  font-size: 2em;
`;

const HandOMeter = ({ prompt }) => {
  return (
    <Hands>
      <HandContainer>
        <Fist height="65px" opacity=".4"/>
        <Count>{ prompt.fists }</Count>
      </HandContainer>
      <HandContainer>
        <One height="90px" opacity=".4"/>
        <Count>{ prompt.ones }</Count>
      </HandContainer>
      <HandContainer>
        <Two height="90px" opacity=".4"/>
        <Count>{ prompt.twos }</Count>
      </HandContainer>
      <HandContainer>
        <Three height="90px" opacity=".4"/>
        <Count>{ prompt.threes }</Count>
      </HandContainer>
      <HandContainer>
        <Four height="90px" opacity=".4"/>
        <Count>{ prompt.fours }</Count>
      </HandContainer>
      <HandContainer>
        <Five height="90px" opacity=".4"/>
        <Count>{ prompt.fives }</Count>
      </HandContainer>
    </Hands>
  );
}

export default HandOMeter;