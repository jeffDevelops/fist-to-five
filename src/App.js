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
    loggedIn: false
  }

  componentDidMount() {
    this.checkToken();
  }

  checkToken = async () => {
    const bcsToken = localStorage.getItem(BCS_TOKEN);
    if (!bcsToken) return;

    const user = await bcsAPIClient.post('/me').catch(error => console.error(error));
    if (!user) return;

    this.setState({ loggedIn: true, user });
  }

  render() {
    const { state } = this;
    return (
      <Fragment>
        <GlobalStyles /> {/* a very minimal style reset, and base styles */}
        <ThemeProvider theme={ theme }>

          <Router>
            <Switch>
              <ProtectedRoute exact path="/" component={ Home } />
              <Route exact path="/login" component={ Login } />
            </Switch>
          </Router>

        </ThemeProvider>
      </Fragment>
    );
  }
}

export default App;
