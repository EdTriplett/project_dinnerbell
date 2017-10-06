import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import Dropzone from "react-dropzone";
import sha1 from "sha1";
import AsyncManager from "../../services/AsyncManager";
import "./Profile.css";

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
	state = {
		isUpdatingImage: false
	};

	imageSelected = files => {
		const image = files[0];

		this.props.userActions.setUserProfileImage(image);
	};

	render() {
		const { userReducer, userActions } = this.props;
		const loadUsername =
			userReducer.user && userReducer.user.username
				? userReducer.user.username
				: null;

		return (
			<div className="profile">
				<p className="profile-name">{loadUsername}</p>
				<Dropzone onDrop={this.imageSelected} style={{ border: "none" }}>
					{userReducer.user && !userReducer.user.profilePicture ? (
						<div className="profile-pic-default" />
					) : (
						<div className="profile-pic-custom">
							<img src={userReducer.user && userReducer.user.profilePicture} />
						</div>
					)}
				</Dropzone>
				{this.state.isUpdatingImage && (
					<a style={{ color: "white", marginTop: "10px" }}>save</a>
				)}

				<div className="user-logs-container">
					<div className="user-logs-col">
						<div className="user-logs-recipes">
							<p>recipes</p>
						</div>

						<Searchbar />

						<div className="user-logs">
							{userReducer.user && userReducer.user.recipes.length ? (
								userReducer.user.recipes
							) : (
								<p>No saved recipes</p>
							)}
						</div>
					</div>

					<div className="user-logs-col">
						<div className="user-logs-meals">
							<p>meals</p>
						</div>
						<Searchbar />
						<div className="user-logs">
							{userReducer.user && userReducer.user.meals.length ? (
								userReducer.user.recipes
							) : (
								<p>No saved meals</p>
							)}
						</div>
					</div>

					<div className="user-logs-col">
						<div className="user-logs-activities">
							<p>activities</p>
						</div>
						<Searchbar />
						<div className="user-logs">
							<p>Activities (Sprint 2)</p>
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
