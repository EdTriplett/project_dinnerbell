import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/user_actions";
import Avatar from "material-ui/Avatar";
import { List, ListItem } from "material-ui/List";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";

const listStyles = {
  width: "300px",
  top: "75px",
  position: "relative"
};

const UserList = ({ users }) =>
  <Paper style={listStyles} zDepth={4}>
    <List>
      {users.map(user =>
        <ListItem
          primaryText={user.username}
          leftAvatar={<Avatar src={user.image} />}
        />
      )}
    </List>
  </Paper>;

class UsersContainer extends Component {
  componentDidMount() {
    this.props.users ? console.log(this.props.users) : this.props.getUsers();
  }

  render() {
    console.log(this.props.users);
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
