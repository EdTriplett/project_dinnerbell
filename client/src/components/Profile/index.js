import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import Dropzone from "react-dropzone";
import "./Profile.css";
import PreferenceSetter from "../PreferenceSetter";
import ProfileUpdater from "../ProfileUpdater/ProfileUpdater.js";
import { withRouter, Link } from "react-router-dom";
import AsyncManager from "../../services/AsyncManager.js";
import FlatButton from "material-ui/FlatButton";
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from "react-sortable-hoc";

const Searchbar = () =>
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
  </form>;

const SortableItem = SortableElement(props =>
  <div>
    <Link to={`/recipes/${props.recipe.edamamId}`}><p key={props.recipe._id}>{props.recipe.name}</p></Link>
  </div>
);

const SortableList = SortableContainer(props => {
  return (
    <div>
      {props.items.map((recipe, index) => {
        return (
          <SortableItem
            key={`item-${index}`}
            index={index}
            {...props}
            recipe={recipe}
          />
        );
      })}
    </div>
  );
});

class Profile extends Component {
  state = {
    isUpdatingImage: false,
    displayedUser: this.props.userReducer.user,
    recipes: []
  };

  imageSelected = files => {
    const image = files[0];
    this.props.userActions.setUserProfileImage(image);
  };

  async componentDidMount() {
    let displayedUser = await AsyncManager.getRequest(
      `/api/users/${this.props.match.params._id}`
    );
    this.setState({
      ...this.state,
      displayedUser,
      recipes: displayedUser.recipes
    });
  }

  async componentWillReceiveProps(nextProps) {
    const currentId = this.props.match.params._id;
    const nextId = nextProps.match.params._id;
    //    const storedId = this.state.displayedUser._id;
    if (nextId && nextId !== currentId) {
      let displayedUser = await AsyncManager.getRequest(`/api/users/${nextId}`);
      this.setState({ displayedUser });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.recipes && this.state.recipes.length) {
      if (!_.isEqual(this.state.recipes, nextState.recipes)) {
        console.log('different!')
        console.log(nextState.displayedUser, 'current')
        this.props.userActions.updateUser(nextState.displayedUser)
      }    
    }
  }

  // deleteRecipe = recipe => async ()=> {
  //     const recipes = this.props.userReducer.user.recipes.filter(entry=> entry._id !== recipe._id )
  //     await userActions.updateUser({
  //       ...this.props.userReducer.user,
  //       recipes
  //     })
  //   }

  onSortEnd = ({oldIndex, newIndex}) => {
    let newRecipeLocations = arrayMove(this.state.recipes, oldIndex, newIndex)
    this.setState({
      recipes: newRecipeLocations,
      displayedUser: { ...this.state.displayedUser, recipes: newRecipeLocations }
    });
  };

  // buildRecipeListItem(recipe) {
  //   return
  //     (<div>
  //       <p key={recipe._id}>
  //         <Link to={`/recipes/${recipe.edamamId}`}>
  //         {recipe.name}</Link>
  //         <FlatButton label='remove'  primary={true} onClick={this.deleteRecipe(recipe)}/>

  //       </p>
  //     </div>)
  // }

  render() {
    const {userReducer} = this.props;
    const renderLists = <SortableList 
                          items={this.state.recipes} 
                          onSortEnd={this.onSortEnd} 
                          pressDelay={200}
                          />

    return !userReducer.user ? null : !this.state.displayedUser ? null : this.state.displayedUser._id === userReducer.user._id ?
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
                    {userReducer.user ? renderLists : <p>No saved recipes</p>}
                  </div>
                </div>

                <div className="user-logs-col">
                  <div className="user-logs-meals">
                    <p>meals</p>
                  </div>
                  <Searchbar />
                  <div className="user-logs">
                    {userReducer.user
                      ? userReducer.user.meals.map(meal =>
                          <Link to={`/meals/${meal._id}`}>
                            {meal.name}
                          </Link>
                        )
                      : <p>No saved meals</p>}
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
          : <div className="profile">
              <p className="profile-name">
                {this.state.displayedUser.username}
              </p>
              {!this.state.displayedUser.profilePicture
                ? <div className="profile-pic-default" />
                : <div className="profile-pic-custom">
                    <img
                      src={
                        this.state.displayedUser &&
                        this.state.displayedUser.profilePicture
                      }
                      alt="this.displayedUser"
                    />
                  </div>}
              {this.state.isUpdatingImage &&
                <a style={{ color: "white", marginTop: "10px" }}>save</a>}

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
                    {this.state.displayedUser
                      ? this.state.displayedUser.recipes.map(recipe =>
                          <p key={recipe._id}>
                            {recipe.name}
                          </p>
                        )
                      : <p>No saved recipes</p>}
                  </div>
                </div>

                <div className="user-logs-col">
                  <div className="user-logs-meals">
                    <p>meals</p>
                  </div>
                  <Searchbar />
                  <div className="user-logs">
                    {this.state.displayedUser
                      ? this.state.displayedUser.meals.map(meal =>
                          <Link to={`/meals/${meal._id}`}>
                            {meal.name}
                          </Link>
                        )
                      : <p>No saved meals</p>}
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
            </div>;
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
