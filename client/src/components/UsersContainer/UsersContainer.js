import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/user_actions";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";
import UsersList from "./UsersList";
import LoadingFork from "../LoadingFork";

import "./UsersContainer.css";

const listStyles = {
  width: "300px",
  top: "75px",
  position: "relative"
};

class UsersContainer extends Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    let users = this.props.users || [];
    users = users.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return (
      <div>
        {this.props.users ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h1 className="users-container___title">users</h1>
            <UsersList users={users} />
          </div>
        ) : (
          <div className="recipe-results">
            <LoadingFork />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.userReducer.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => {
      dispatch(getUsers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
