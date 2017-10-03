import React from 'react';
import SignupForm from '../SignupForm';
import LoginForm from '../LoginForm';
import './Authentication.css';

const Authentication = props => {
	console.log(props, 'authentication props');
	return (
		<div className="authentication">
			{!props.showLogin ? <SignupForm /> : <LoginForm />}
		</div>
	);
};

export default Authentication;
