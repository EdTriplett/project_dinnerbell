import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "material-ui/TextField";
import asyncValidate from "../../services/AsyncValidate";
import CircularProgress from "material-ui/CircularProgress";
import { withRouter } from "react-router-dom";

import "./LoginForm.css";

const validate = values => {
  const errors = {};
  const requiredFields = ["username", "email", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
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

class LoginForm extends Component {
  onSubmit = () => {
    const { loginUser, formData, setUserError } = this.props;
    const { password, email } = formData.LoginForm.values;

    loginUser({ password, email }).then(() => {
      if (this.props.userReducer.userError) {
        alert(this.props.userReducer.userError);
        setUserError(null);
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
      userLoading,
      userReducer
    } = this.props;

    const authOptions = !userReducer.user ? (
      <div className="oauth">
        <a href="/auth/facebook">
          <img src="https://imgur.com/Hw9YUrJ.png" alt="" />
        </a>
        <a href="/auth/google">
          <img src="https://i.imgur.com/ETp8DOT.png" alt="" />
        </a>
      </div>
    ) : null;

    if (userLoading && !this.props.userReducer.userError) {
      return <CircularProgress size={80} thickness={3} color="#fc5830" />;
    }

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <p className="label">dinnerbell</p>
          <div>
            <Field
              autoComplete="off"
              className="material-field"
              name="email"
              component={this.renderTextField}
              label="email"
              required="required"
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
              required="required"
            />
          </div>
          <div className="login-buttons">
            <button type="submit" disabled={pristine || submitting}>
              login
            </button>
            <button
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              back
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

export default reduxForm({
  form: "LoginForm",
  validate,
  asyncValidate
})(withRouter(LoginForm));
