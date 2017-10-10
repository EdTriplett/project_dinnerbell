import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Landing from "../Landing";
import Navbar from "../Navbar";
import Authentication from "../Authentication";
import Recipes from "../Recipes";
import Profile from "../Profile";
// import RecipeContainer from "../RecipeContainer";
import UsersContainer from "../UsersContainer/UsersContainer";
import Test from "../Test";
import CreateMeal from "../CreateMeal";
import MealContainer from "../MealContainer/MealContainer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" render={() => <Landing />} />
            <Route
              path="/register"
              render={() => <Authentication showLogin={false} />}
            />
            <Route
              path="/login"
              render={() => <Authentication {...this.props} showLogin={true} />}
            />
            <Route path="/recipes" render={() => <Recipes {...this.props} />} />
            <Route
              path="/profile/:name"
              render={() => <Profile {...this.props} />}
            />
            <Route
              path="/create_meal"
              render={() => <CreateMeal {...this.props} />}
            />
            <Route path="/meals/:id" component={MealContainer} />
            />
            <Route
              path="/users"
              render={() =>
                <UsersContainer>
                  <Test />
                </UsersContainer>}
            />
            {/*<Route path="/recipes/:id" component={RecipeContainer} /> */}
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
