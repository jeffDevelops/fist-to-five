import React, { Component } from 'react';
import styled from 'styled-components';

import Nav from './Nav';
import Prompt from './Prompt';

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  width: 95%;
  max-width: 800px;
  margin: 0 auto;
`;

const Spacer = styled.div`
  height: 85px;

  @media(min-width: 800px) {
    height: 100px;
  }
`;

export default class Home extends Component {
  render() {

    const { props } = this;

    return (
      <Container>
        <Nav />

        <Spacer />{/* The Nav is position:fixed--need to account for that space */}

        <Prompt user={ props.user } />

      </Container>
    )
  }
}