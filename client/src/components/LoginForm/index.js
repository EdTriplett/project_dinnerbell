import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import asyncValidate from '../../services/AsyncValidate';
import CircularProgress from 'material-ui/CircularProgress';
import { withRouter } from 'react-router-dom';

const validate = values => {
  const errors = {};
  const requiredFields = ['username', 'email', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

class LoginForm extends Component {
  state = { error: null };

  onSubmit = () => {
    alert('pressed log in!');
    // const { login, formData, history } = this.props;

    // login(formData.LoginForm.values)
    //   .then(() => {
    //     history.replace('/dashboard')
    //   })
    //   .catch((e) => {
    //     this.setState({
    //       error: e.message
    //     })

    //     alert('User does not exist!')
    //   })
  };

  render() {
    const { handleSubmit, pristine, reset, submitting, loading } = this.props;

    if (loading && !this.state.error) {
      return <CircularProgress size={80} thickness={5} />;
    }

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3>Login</h3>
        <div>
          <Field
            name="email"
            component={renderTextField}
            label="Email"
            required="required"
          />
        </div>
        <div>
          <Field
            name="password"
            type="password"
            component={renderTextField}
            label="Password"
            required="required"
          />
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Login
          </button>
          <button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'LoginForm',
  validate,
  asyncValidate
})(withRouter(LoginForm));
