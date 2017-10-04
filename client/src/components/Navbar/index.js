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

const Searchbar = ({ onSearchInputChange, onSearchInputSubmit }) => {
  return (
    <form className="searchthis" method="get">
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

  onSearchInputChange = e => {
    this.setState({
      query: e.target.value
    });
  };

  onSearchInputSubmit = () => {
    searchActions.getSearchRequest(this.state.query);
    this.props.history.push("/search");
  };

  render() {
    let navItems = [];

    switch (this.props.location.pathname) {
      case "/":
        break;

      case "/login":
        navItems.push(
          <Link to="/register" className="non-logo-item">
            register
          </Link>
        );
        break;

      case "/register":
        navItems.push(
          <Link to="/login" className="non-logo-item">
            login
          </Link>
        );
        break;

      default:
        if (this.props.userReducer.user) {
          navItems.push(
            <a
              onClick={() => {
                this.props.userActions.logoutUser();
              }}
              className="non-logo-item"
            >
              logout
            </a>
          );
        } else {
          navItems.push(
            <Link to="/login" className="non-logo-item">
              login
            </Link>
          );
          navItems.push(
            <Link to="/register" className="non-logo-item">
              register
            </Link>
          );
        }
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
  userActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
