import React, { Component } from "react";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import { withRouter } from "react-router-dom";
import "./ProfileUpdater.css";

class ProfileUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      errors: {
        username: null,
        email: null,
        password: null
      }
    };
  }

  validate = async newDetails => {
    const errors = {};
    if (newDetails.username && newDetails.username.length > 25) {
      errors.username = "username should be less than 25 characters";
    }
    await this.props.userActions.getUsers();
    if (
      this.props.userReducer.users &&
      this.props.userReducer.users.some(
        user => user.username === newDetails.username
      )
    ) {
      errors.username = "username already taken";
    }
    if (
      newDetails.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(newDetails.email)
    ) {
      errors.email = "invalid email address";
    }
    const passwordLength = 6;
    if (newDetails.password && newDetails.password.length < passwordLength) {
      errors.password = `password must be at least ${passwordLength} characters`;
    }
    return errors;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFormSubmit = async e => {
    e.preventDefault();
    const { email, password, username } = this.state;
    let newDetails = {};
    if (email.length) {
      newDetails.email = email;
    }
    if (password.length) {
      newDetails.password = password;
    }
    if (username.length) {
      newDetails.username = username;
    }
    await this.setState({
      errors: await this.validate(newDetails)
    });
    if (
      Object.keys(this.state.errors).every(
        key => this.state.errors[key] === null
      )
    ) {
      await this.props.userActions.updateUser({
        ...this.props.userReducer.user,
        ...newDetails
      });
    }

    // if (this.props.userReducer.userError) {
    //   alert(this.props.userReducer.userError);
    //   this.props.userActions.setUserError(null);
    // }

    this.props.history.goBack();
  };

  render() {
    return (
      <div className='profile-updater-form'>
        <form onSubmit={this.handleFormSubmit} >
          <h3 className="label">Update your Profile</h3>
          <div>
            <TextField
              name="username"
              type="text"
              onChange={this.handleChange}
              value={this.state.username}
              floatingLabelText="New Username"
              errorText={this.state.errors.username}
            />
          </div>
          <div>
            <TextField
              name="email"
              type="text"
              onChange={this.handleChange}
              value={this.state.email}
              floatingLabelText="New Email"
              errorText={this.state.errors.email}
            />
          </div>
          <div>
            <TextField
              name="password"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
              floatingLabelText="New Password"
              errorText={this.state.errors.password}
            />
          </div>

          <div className="signup-buttons">
            <button type="submit">update</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileUpdater)
);
