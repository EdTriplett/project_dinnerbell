import React, { Component } from "react";

// import AccountCircle from "./ic_account_circle_black_24px.svg";
import SvgIcon from "material-ui/SvgIcon";
import FloatingActionButton from "material-ui/FloatingActionButton";
import IconButton from "material-ui/IconButton";
// import ChickenSvg from "./chicken";
// import Login from "./login";

import * as userActions from "../../actions/user_actions";
import * as recipesActions from "../../actions/recipes_actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withRouter, Link } from "react-router-dom";
import "./Navbar.css";

import queryString from "query-string";

const iconStyles = {
  marginLeft: "80px"
};

// const ProfileIcon = props =>
//   <SvgIcon {...props}>
//     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
//     <path d="M0 0h24v24H0z" fill="none" />
//   </SvgIcon>;

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
  createMeal: (
    <Link to="/create_meal" className="non-logo-item" key="meal">
      create meal
    </Link>
  )
};

const Searchbar = ({ onSearchInputSubmit, onSearchInputChange }) => {
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
    e.preventDefault();
    let preferencesString = "";
    if (this.props.location.pathname === "/recipes") {
      let { preferences } = this.parseSearchParams(this.props.location.search);
      preferencesString = preferences.join(",");
    } else {
      preferencesString =
        this.props.userReducer.user &&
        this.props.userReducer.user.dietaryRestrictions
          ? this.props.userReducer.user.dietaryRestrictions.join(",")
          : "";
    }
    this.props.history.push(
      `/recipes?q=${this.state.query}&preferences=${preferencesString}`
    );
  };

  parseSearchParams = url => {
    let { q, preferences } = queryString.parse(url);
    q = q ? q : "";
    preferences = preferences ? preferences : [];
    if (!Array.isArray(preferences)) {
      preferences = preferences.split(",");
    }
    return { q, preferences };
  };

  render() {
    let navItems = [];
    // navItems.push(<ProfileIcon color="#FAFAFA" />);
    navItems.push(
      <SvgIcon>
        <path d="M367.282,78.106c0,14.692-11.954,26.645-26.645,26.645H178.155c-13.252,0-24.033,10.78-24.033,24.033
  			s10.78,24.033,24.033,24.033h75.233c9.218,0,16.718,7.5,16.718,16.718c0,9.218-7.5,16.718-16.718,16.718H145.241
  			c-24.487,0-44.408,19.921-44.408,44.408h15.673c0-15.844,12.891-28.735,28.735-28.735h108.147
  			c17.862,0,32.392-14.53,32.392-32.392c0-17.862-14.53-32.392-32.392-32.392h-75.233c-4.609,0-8.359-3.75-8.359-8.359
  			s3.75-8.359,8.359-8.359h162.482c23.335,0,42.318-18.984,42.318-42.318H367.282z" />
      </SvgIcon>
    );

    switch (this.props.location.pathname) {
      case "/login":
        navItems.push(ROUTE_MAP.register);
        break;

      case "/register":
        navItems.push(ROUTE_MAP.login);
        break;

      case "/create_meal":
        const showProfile =
          this.props.userReducer.user &&
          <Link
            to={`/profile/${this.props.userReducer.user._id}`}
            className="non-logo-item"
            key="profile"
          >
            profile
          </Link>;
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
            <Link
              to={'/users'}
              className="non-logo-item"
              key="users"
            >
              users
            </Link>,
            ROUTE_MAP.createMeal,
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
  recipesActions: bindActionCreators(recipesActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
