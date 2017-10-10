import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import asyncValidate from "../../services/AsyncValidate";
import { withRouter } from "react-router-dom";
// import FlatButton from "material-ui/FlatButton";
import './ProfileUpdater.css';

const validate = values => {
  const errors = {};
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

// const allDetails = ['Username', 'Email', 'Password']

class ProfileUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const user = this.props.userReducer.user;
    const { updateUser, formData } = this.props;
    const {email, password, username} = formData.ProfileUpdater.values;
    let newDetails = {};
    if (email) {newDetails.email = email}
    if (password) {newDetails.password = password}
    if (username) {newDetails.username = username}
    updateUser({ ...user, newDetails})
    .then(() => {
      if (this.props.userReducer.userError) {
        alert(this.props.userReducer.userError);
        this.props.userActions.setUserError(null);
      }
    });
  };

  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
    } = this.props;

    const authOptions = (
      <div className="oauth">
        <a href="/auth/facebook">Add your info from 
          <img src="https://imgur.com/Hw9YUrJ.png" alt="facebook logo" />
        </a>
        <a href="/auth/google"> Add your info from 
          <img src="https://i.imgur.com/ETp8DOT.png" alt='google logo'/>
        </a>
      </div>
    ) ; 

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <h3 className="label">Update your Profile</h3>
          <div>
            <Field
              autoComplete="off"
              className="material-field"
              name="username"
              component={this.renderTextField}
              label="username"
            />
          </div>
          <div>
            <Field
              autoComplete="off"
              className="material-field"
              name="email"
              component={this.renderTextField}
              label="email"
            />
          </div>
          <div>
            <Field
              autoComplete="off"
              className="material-field"
              name="password"
              type="password"
              component={this.renderTextField}
              label="password"
            />
          </div>

          <div className="signup-buttons">
            <button type="submit" disabled={pristine || submitting}>
              update
            </button>
            
            <button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              clear
            </button>
          </div>
        </form>
        {authOptions}
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default reduxForm({
  form: "ProfileUpdater",
  validate,
  asyncValidate
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileUpdater)));
