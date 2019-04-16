import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
import Card from '../_styled/Card';
import ErrorCard from '../_styled/ErrorCard';
import { Input, Label } from '../_styled/Input';
import Button from '../_styled/Button';

// Modules
import bcsAPIClient from '../http/bcsApiClient';

// Assets
import { ReactComponent as BCSLogo } from '../assets/bcs-logo-solid.svg';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { BCS_TOKEN, BCS_USER_ID } from '../enum/localStorageKeys';

const Container = styled.main`
  padding-top: 75px;
`;

const LogoContainer = styled.div`
  width: 275px;
  margin: 0 auto 100px;
  padding: 0 0 0 15px;
`;

const BCSLogoContainer = styled.div`
  width: 75%;
  margin: 0 auto 25px 40px; /* Eyeballed it */
`;

class Login extends Component {
  state = {
    creds: {
      email: '',
      password: '',
    },
    error: '',
  }

  handleInputChange = (name, value) => {
    const creds = { ...this.state.creds };
    creds[name] = value;
    this.setState({ creds });
  }

  handleError = error => this.setState({ error });

  render() {

    const { state, props } = this;

    return (
      <Container>
        
        <LogoContainer>
          <Logo width="275px" />
        </LogoContainer>

        <Card
          margin="0 auto"
          width="400px"
        >
          <BCSLogoContainer>
            <BCSLogo width="100%" />
          </BCSLogoContainer>

          <form onSubmit={ async e => {
            e.preventDefault();

            // Detect missing fields and notify user of error before submitting
            if (Object.keys(state.creds).map(key => state.creds[key]).filter(value => !value).length > 0) {
              return this.handleError('Not all fields are valid. Please check the inputs above and try again.');
            }

            const response = await bcsAPIClient().post('/login', state.creds).catch(error => {
              console.error(error);
              this.handleError('Could not connect to the Bootcampspot API. Please check your network connectivity and try again.')
            });

            if (!response.data.success) return this.handleError(`Authentication Failed: ${response.data.errorCode}`);

            localStorage.setItem(BCS_TOKEN, response.data.authenticationInfo.authToken);
            localStorage.setItem(BCS_USER_ID, response.data.authenticationInfo.userId);

            props.checkToken().then(() => props.history.push('/'));
          }}>

            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="BCS Email"
              onChange={ e => this.handleInputChange(e.target.name, e.target.value) }
            />

            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="BCS Password"
              onChange={ e => this.handleInputChange(e.target.name, e.target.value) }
            />

            <Button type="submit">Login</Button>

          </form>

        </Card>

        { state.error && <ErrorCard width="400px" margin="25px auto">{ state.error }</ErrorCard> }

      </Container>
    );
  }
}

export default withRouter(Login);