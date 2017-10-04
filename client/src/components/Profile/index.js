import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user_actions';
import './Profile.css';

class Profile extends Component {
	render() {
		return (
			<div className="profile">
				<p className="profile-name">Username's Profile page</p>
				<div className="profile-pic" />
			</div>
		);
	}
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
