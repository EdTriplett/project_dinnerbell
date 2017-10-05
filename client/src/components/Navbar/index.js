import React, { Component } from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import AssignmentIcon from "material-ui/svg-icons/action/assignment";

import * as userActions from "../../actions/user_actions";
import * as searchActions from "../../actions/search_actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { TextField, IconMenu, MenuItem } from "material-ui";
import { withRouter, Link } from "react-router-dom";
import "./Navbar.css";

const URL_SHORT = "http://localhost3001/api/recipes";

const ROUTE_MAP = {
  login: (
    <Link to="/login" className="non-logo-item" key="login">
      login
    </Link>
  ),
  logout: (
    <a onClick={this.onClickLogout} className="non-logo-item" key="logout">
      logout
    </a>
  ),
  register: (
    <Link to="/register" className="non-logo-item" key="register">
      register
    </Link>
  ),
  profile: (
    <Link
      to="/profile/user" // TODO: make dynamic
      className="non-logo-item"
      key="profile"
    >
      profile
    </Link>
  ),
  createRecipe: (
    <Link to="/create_recipe" className="non-logo-item" key="recipe">
      create recipe
    </Link>
  )
};

const Searchbar = ({ onSearchInputChange, onSearchInputSubmit }) => {
  return (
    <div>
      <input
        className="namanyay-search-box"
        name="q"
        size="40"
        type="text"
        placeholder="Search for recipes"
        onChange={onSearchInputChange}
      />
      <button
        className="namanyay-search-btn"
        type="submit"
        onClick={onSearchInputSubmit}
      >
        <i className="fa fa-search" aria-hidden="true" />
      </button>
    </div>
  );
};

class Navbar extends Component {
  state = {
    query: ""
  };

  onClickLogout = async () => {
    await this.props.userActions.logoutUser();
    this.props.history.push("/");
  };

  onSearchInputChange = e => {
    this.setState({
      query: e.target.value
    });
  };

  onSearchInputSubmit = e => {
    e.preventDefault();
    console.log("query: ", this.state.query);
    this.props.searchActions.setSearchQuery(this.state.query);
    this.props.history.push("/search");
  };

  render() {
    let navItems = [];

    switch (this.props.location.pathname) {
      case "/":
        if (this.props.userReducer.user) {
          navItems.push(ROUTE_MAP.profile, ROUTE_MAP.createRecipe);
        }
        break;

      case "/login":
        navItems.push(ROUTE_MAP.register);
        break;

      case "/register":
        navItems.push(ROUTE_MAP.login);
        break;

      case "/create_recipe":
        navItems.push(ROUTE_MAP.profile, ROUTE_MAP.logout);
        break;

      default:
        if (this.props.userReducer.user) {
          navItems.push(
            ROUTE_MAP.profile,
            ROUTE_MAP.createRecipe,
            ROUTE_MAP.logout
          );
        } else {
          navItems.push(ROUTE_MAP.login, ROUTE_MAP.register);
        }
        break;
    }

    return (
      <div className="nav">
        <div className="nav-items">
          <Link to="/">
            <div className="logo" />
          </Link>
          {navItems}
        </div>
        <div className="nav-searchbar">
          <Searchbar
            onSearchInputChange={this.onSearchInputChange}
            onSearchInputSubmit={this.onSearchInputSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  searchActions: bindActionCreators(searchActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
