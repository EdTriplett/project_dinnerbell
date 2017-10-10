import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import "../Profile/Profile.css";
import { withRouter } from "react-router-dom";
import FlatButton from "material-ui/FlatButton";
import './ProfileUpdater.css';

const validate = values => {
  const errors = {};
  // const requiredFields = ["email", "password"];
  // requiredFields.forEach(field => {
  //   if (!values[field]) {
  //     errors[field] = "Required";
  //   }
  // });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  const passwordLength = 6;
  if (values.password && values.password.length < passwordLength) {
    errors.password = `Password must be at least ${passwordLength} characters`;
  }
  return errors;
};

class ProfileUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {});
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const user = this.props.userReducer.user;
    const { updateUser } = this.props;
    const newDetails = ;
    updateUser({ ...user, newDetails});
  };

  render() {
    return (
      <div className="preference-setter">
        Select your dietary requirements:
        <form onSubmit={this.handleFormSubmit}>
          {allPreferences.map(pref => this.buildCheckbox(pref))}

          <FlatButton
            primary
            backgroundColor="#fff"
            hoverColor="#aaa"
            onClick={this.handleFormSubmit}
          >
            Save
          </FlatButton>
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
  connect(mapStateToProps, mapDispatchToProps)(PreferenceSetter)
);