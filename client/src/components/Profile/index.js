import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import FlatButton from "material-ui/FlatButton";

import "./Profile.css";
import * as userActions from "../../actions/user_actions";
import PreferenceSetter from "../PreferenceSetter";
import AsyncManager from "../../services/AsyncManager.js";
import UserLogContainer from "../UserLogContainer";

class Profile extends Component {
  state = {};

  allowedActions = () => {
    const local = this.state;
    const current = this.props.userReducer;
    if (local && current.user && local._id === current.user._id) {
      return this.props.userActions;
    }
  };

  imageSelected = async files => {
    const actions = this.allowedActions();
    if (actions) actions.setUserProfileImage(files[0]);
  };

  updateArray = field => async newData => {
    const actions = this.allowedActions();
    if (actions) actions.updateUser({ ...this.state, [field]: newData });
  };

  fetchUser = async id => {
    this.setState(await AsyncManager.getRequest(`/api/users/${id}`));
  };

  componentDidMount() {
    const user = this.props.userReducer.user;
    let id = this.props.match.params._id;
    id = id ? id : user._id;
    if (id) this.fetchUser(id);
  }

  componentWillReceiveProps(nextProps) {
    const current = this.props.match.params._id;
    const next = nextProps.match.params._id;
    if (next && next !== current) this.fetchUser(next);

    const nextUser = nextProps.userReducer.user;
    const currentPic = this.state.profilePicture;
    const allowed = !!this.allowedActions();
    if (allowed && nextUser && currentPic !== nextUser.profilePicture) {
      this.setState({ profilePicture: nextUser.profilePicture });
    }
  }

  render() {
    const { userReducer } = this.props;
    const { recipes = [], meals = [], registeredMeals = [] } = this.state;
    const allowed = !!this.allowedActions();
    return (
      <div className="profile">
        <p className="profile-name">{this.state.username}</p>
        <Dropzone onDrop={this.imageSelected} style={{ border: "none" }}>
          {!this.state.profilePicture ? (
            <div className="profile-pic-default" />
          ) : (
            <div className="profile-pic-custom">
              <img src={this.state.profilePicture} alt="" />
            </div>
          )}
        </Dropzone>

        <div className="user-profile">
          {allowed && (
            <Link to={"/profileUpdater"}>
              <FlatButton
                backgroundColor="#E34B27"
                hoverColor="#C32B07"
                fullWidth={true}
                style={{ padding: "0px 10px", color: "#fff" }}
              >
                Update Account Settings
              </FlatButton>
            </Link>
          )}

          <PreferenceSetter
            updateUser={this.props.userActions.updateUser}
            show={allowed}
            user={this.state}
          />
        </div>

        <div className="user-logs-container">
          <UserLogContainer
            title="recipes"
            resource="recipes"
            items={recipes}
            updateArray={this.updateArray("recipes")}
          />
          <UserLogContainer
            title="meals"
            resource="meals"
            items={meals}
            updateArray={this.updateArray("meals")}
          />
          <UserLogContainer
            title="invited"
            resource="meals"
            items={registeredMeals}
            updateArray={this.updateArray("registeredMeals")}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
