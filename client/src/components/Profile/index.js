import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/user_actions';
import './Profile.css';

const Searchbar = () => (
	<form className="searchthis" method="get">
		<input
			className="logs-search-box"
			name="q"
			size="40"
			type="text"
			placeholder="Search through your logs"
		/>
		<button className="logs-search-btn" type="submit">
			<i className="fa fa-search" aria-hidden="true" />
		</button>
	</form>
);

class Profile extends Component {
	render() {
		return (
			<div className="profile">
				<p className="profile-name">Username's Profile page</p>
				<div className="profile-pic" />
				<div className="user-logs-container">
					<div className="user-logs-col">
						<div className="user-logs-recipes">
							<p>recipes</p>
						</div>

						<Searchbar />

						<div className="user-logs">
							<a>This is a single log</a>
							<a>This is a single log</a>
							<a>This is a single log</a>
							<a>This is a single log</a>
						</div>
					</div>

					<div className="user-logs-col">
						<div className="user-logs-meals">
							<p>meals</p>
						</div>
						<Searchbar />
						<div className="user-logs">
							<a>This is a single log</a>
						</div>
					</div>

					<div className="user-logs-col">
						<div className="user-logs-activities">
							<p>activities</p>
						</div>
						<Searchbar />
						<div className="user-logs">
							<a>This is a single log</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
