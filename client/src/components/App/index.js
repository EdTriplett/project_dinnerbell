import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Landing from '../Landing';
import SignupForm from '../SignupForm';
import Navbar from '../Navbar';
import Authentication from '../Authentication';
import SearchRecipes from '../SearchRecipes';
import Profile from '../Profile';

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" render={() => <Landing {...this.props} />} />
            <Route
              path="/register"
              render={() => (
                <Authentication {...this.props} showLogin={false} />
              )}
            />
            <Route
              path="/login"
              render={() => <Authentication {...this.props} showLogin={true} />}
            />
            <Route
              path="/search"
              render={() => <SearchRecipes {...this.props} />}
            />
            <Route
              path="/profile/:name"
              render={() => <Profile {...this.props} />}
            />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
