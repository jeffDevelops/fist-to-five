import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Loader from './Loader';

import bcsApiClient from '../http/bcsApiClient';

import { BCS_TOKEN } from '../enum/localStorageKeys';

class ProtectedRoute extends PureComponent {

  state = {
    loading: true,
    authToken: false,
    sessionExistsOnServer: false,
  }

  componentDidMount() {
    this.verifySession();
  }

  verifySession = async () => {
    // Redirect if there's no auth token at all
    const authToken = localStorage.getItem(BCS_TOKEN);
    if (!authToken) return this.setState({ loading: false });

    this.setState({ authToken: true }, async () => { // authToken in localStorage where httpClient can get it
      // Check identity on the server
      const response = await bcsApiClient().get('/me').catch(error => console.error('Not authenticated. Redirecting. Error: ', error.response));
      if (!response || !response.data.userAccount) return this.setState({ loading: false, sessionExistsOnServer: false });
      this.setState({ loading: false, sessionExistsOnServer: true });
    });
  }

  render() {
    const { state } = this;
    const { component: Component, ...rest } = this.props;

    if (state.loading) return <Loader />;
    if (!state.loading && !state.authToken) return <Redirect to="/login" />;
    if (!state.loading && !state.sessionExistsOnServer) return <Redirect to="/login" />;

    return (
      <Route { ...rest } render={ props => {
        return <Component { ...rest } />
      }} />
    )
  }
}

export default ProtectedRoute;