import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Context
import { ThemeProvider } from 'styled-components';
import theme from './_styled/theme';

// Components
import GlobalStyles from './_styled/GlobalStyles';
import ProtectedRoute from './_components/ProtectedRoute';
import Home from './_components/Home';
import Login from './_components/Login';

// Modules
import bcsAPIClient from './http/bcsApiClient';
import { BCS_TOKEN } from './enum/localStorageKeys';

class App extends Component {

  state = {
    loggedIn: false,
    user: null,
  }

  componentDidMount() {
    this.checkToken();
  }

  componentDidUpdate(_, prevState) {
    // If state goes from *not logged in* to *logged in*, update the user using the BCS /me endpoint
    if (this.state.loggedIn && this.state.user && prevState.loggedIn !== this.state.loggedIn) {
      console.log({ UPDATINGUSER: this.state.user });
      this.checkToken();
    }
  }

  checkToken = () => new Promise(async (resolve, reject) => {
      const bcsToken = localStorage.getItem(BCS_TOKEN);
      if (!bcsToken) return;

      const response = await bcsAPIClient().post('/me').catch(error => console.error(error));
      if (!response) return;

      this.setState({ loggedIn: true, user: response.data }, () => resolve());
  });

  updateUser = user => this.setState({ user });

  render() {
    const { state } = this;
    return (
      <Fragment>
        <GlobalStyles /> {/* a very minimal style reset, and base styles */}
        <ThemeProvider theme={ theme }>

          <Router>
            <Switch>

              <ProtectedRoute
                exact path="/"
                user={ state.user }
                component={ Home }
              />

              <Route
                exact path="/login"
                render={ props => (
                  <Login checkToken={ this.checkToken } />
                )}
              />

            </Switch>
          </Router>

        </ThemeProvider>
      </Fragment>
    );
  }
}

export default App;
