import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import Dropzone from "react-dropzone";
import "./Profile.css";
import PreferenceSetter from "../PreferenceSetter";
import ProfileUpdater from '../ProfileUpdater/ProfileUpdater.js'
import { withRouter } from "react-router-dom";
import AsyncManager from '../../services/AsyncManager.js'

const Searchbar = () => (
  <form className="search-form" method="get">
    <input
      className="logs-search-box"
      name="q"
      size="40"
      type="text"
      placeholder="Search through your logs"
    />
    <button className="logs-search-btn" type="submit">
      <i className="fa fa-search search-form-icon" aria-hidden="true" />
    </button>
  </form>
);

class Profile extends Component {
  state = {
    isUpdatingImage: false,
    displayedUser: this.props.userReducer.user

  };

  imageSelected = files => {
    const image = files[0];

    this.props.userActions.setUserProfileImage(image);
  };

  async componentDidMount() {
    let displayedUser = await AsyncManager.getRequest(`/api/users/${this.props.match.params._id}`)
    this.setState({
      displayedUser
    })
  }

  async componentWillReceiveProps(nextProps) {
    const currentId = this.props.match.params._id;
    const nextId = nextProps.match.params._id;
//    const storedId = this.state.displayedUser._id;
    if (nextId && nextId !== currentId) {
      let displayedUser = await AsyncManager.getRequest(`/api/users/${nextId}`)
      this.setState({displayedUser});
    }
  }



  render() {
    const {userReducer} = this.props;
    // const loadUsername =
    //  this.state.displayedUser
    //     ?this.state.displayedUser.username
    //     : userReducer.user ? userReducer.user.username: null;

         
    return !userReducer.user ? null : !this.state.displayedUser ? null : this.state.displayedUser._id ===userReducer.user._id ?
    (
      <div className="profile">
        <p className="profile-name">{userReducer.user ? userReducer.user.username : null}</p>
        <Dropzone onDrop={this.imageSelected} style={{ border: "none" }}>
          {userReducer.user && !userReducer.user.profilePicture ? (
            <div className="profile-pic-default" />
          ) : (
            <div className="profile-pic-custom">
              <img
                src={userReducer.user && userReducer.user.profilePicture}
                alt=""
              />
            </div>
          )}
        </Dropzone>
        {this.state.isUpdatingImage && (
          <a style={{ color: "white", marginTop: "10px" }}>save</a>
        )}
        {/*<ProfileUpdater 
            updateUser={this.props.userActions.updateUser}
            user={this.props.user}/>  */}
          

        <PreferenceSetter
          updateUser={this.props.userActions.updateUser}
          show={true}
          user={this.props.user}
        />


        <div className="user-logs-container">
          <div className="user-logs-col">
            <div className="user-logs-recipes">
              <p>recipes</p>
            </div>

            <Searchbar />

            <div className="user-logs">
              {userReducer.user ? (
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
              {userReducer.user ? (
                userReducer.user.meals
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
    )
    : (
      <div className="profile">
        <p className="profile-name">{this.state.displayedUser.username}</p>
        <Dropzone onDrop={null} style={{ border: "none" }}>
          {!this.state.displayedUser.profilePicture ? (
            <div className="profile-pic-default" />
          ) : (
            <div className="profile-pic-custom">
              <img
                src={this.state.displayedUser &&this.state.displayedUser.profilePicture}
                alt="this.displayedUser"
              />
            </div>
          )}
        </Dropzone>
        {this.state.isUpdatingImage && (
          <a style={{ color: "white", marginTop: "10px" }}>save</a>
        )}
          

        <PreferenceSetter
          updateUser={null}
          show={false}
          user={this.state.displayedUser}
        />


        <div className="user-logs-container">
          <div className="user-logs-col">
            <div className="user-logs-recipes">
              <p>recipes</p>
            </div>

            <Searchbar />

            <div className="user-logs">
              {this.state.displayedUser ? (
               this.state.displayedUser.recipes
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
              {this.state.displayedUser ? (
               this.state.displayedUser.meals
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
      )
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
