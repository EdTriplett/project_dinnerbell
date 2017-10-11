import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/user_actions";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import { Link } from "react-router-dom";

const listStyles = {
  width: "300px",
  top: "75px",
  position: "relative"
};

const UserList = ({ users }) => {
  users = users.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
  return (
    <Paper style={listStyles} zDepth={4}>
      <List>
        {users.map(user =>
          <Link
            to={`profile/${user._id}`}
            key={user._id}
            style={{ textDecoration: "none" }}
          >
            <ListItem
              primaryText={user.username}
              leftAvatar={<Avatar src={user.profilePicture} />}
            />
          </Link>
        )}
      </List>
    </Paper>
  );
};

class UsersContainer extends Component {
  componentDidMount() {
    this.props.users ? console.log(this.props.users) : this.props.getUsers();
  }

  render() {
    return (
      <div>
        {this.props.users
          ? <UserList users={this.props.users} />
          : <div>Loading...</div>}
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
