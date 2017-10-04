import React, { Component } from "react";
import SignupForm from "../SignupForm";
import LoginForm from "../LoginForm";
import * as userActions from "../../actions/user_actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./Authentication.css";

class Authentication extends Component {
  render() {
    console.log(this.props, "props in authentication");
    return (
      <div className="authentication">
        {!this.props.showLogin
          ? <SignupForm
              registerUser={this.props.userActions.registerUser}
              formData={this.props.form}
            />
          : <LoginForm
              loginUser={this.props.userActions.loginUser}
              formData={this.props.form}
            />}
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
