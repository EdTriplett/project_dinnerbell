import React, { Component } from "react";

import * as userActions from "../../actions/user_actions";
import * as searchActions from "../../actions/search_actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withRouter, Link } from "react-router-dom";
import "./Navbar.css";

const ROUTE_MAP = {
  login: (
    <Link to="/login" className="non-logo-item" key="login">
      login
    </Link>
  ),
  register: (
    <Link to="/register" className="non-logo-item" key="register">
      register
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
    <form action="" method="get" onSubmit={onSearchInputSubmit}>
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
    </form>
  );
};

class Navbar extends Component {
  state = {
    query: ""
  };

  componentDidMount() {
    this.props.userActions.checkCurrentUser();
  }

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
    console.log("successfully submitted");
    e.preventDefault();
    console.log("query: ", this.state.query);
    this.props.searchActions.setSearchQuery(this.state.query);
    this.props.history.push("/search");
  };

  render() {
    let navItems = [];

    switch (this.props.location.pathname) {
      case "/login":
        navItems.push(ROUTE_MAP.register);
        break;

      case "/register":
        navItems.push(ROUTE_MAP.login);
        break;

      case "/create_recipe":
        const showProfile = this.props.userReducer.user && (
          <Link
            to={`/profile/${this.props.userReducer.user._id}`}
            className="non-logo-item"
            key="profile"
          >
            profile
          </Link>
        );
        navItems.push(
          showProfile,
          <a
            onClick={this.onClickLogout}
            className="non-logo-item"
            key="logout"
          >
            logout
          </a>
        );
        break;
      default:
        if (this.props.userReducer.user) {
          navItems.push(
            <Link
              to={`/profile/${this.props.userReducer.user._id}`}
              className="non-logo-item"
              key="profile"
            >
              profile
            </Link>,
            ROUTE_MAP.createRecipe,
            <a
              onClick={this.onClickLogout}
              className="non-logo-item"
              key="logout"
            >
              logout
            </a>
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
