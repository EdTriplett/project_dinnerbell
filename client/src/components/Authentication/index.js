import React, { Component } from "react";
import SignupForm from "../SignupForm";
import LoginForm from "../LoginForm";
import * as userActions from "../../actions/user_actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import "./Authentication.css";

import _ from "lodash";

class Authentication extends Component {
  componentWillMount() {
    this.props.userActions.checkCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.userReducer.user, this.props.userReducer.user)) {
      this.props.history.push("/search");
    }
  }

  render() {
    return (
      <div className="authentication">
        {!this.props.showLogin
          ? <SignupForm
              registerUser={this.props.userActions.registerUser}
              userLoading={this.props.userReducer.userLoading}
              formData={this.props.form}
            />
          : <LoginForm
              loginUser={this.props.userActions.loginUser}
              userLoading={this.props.userReducer.userLoading}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Authentication)
);
