import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as userActions from "../../actions/user_actions";
import Recipe from "../Recipe";
import AsyncManager from "../../services/AsyncManager";

class RecipeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  fetchRecipe = async id => {
    try {
      const url = `/api/recipes/${id}`;
      const recipe = await AsyncManager.getRequest(url);
      if (recipe && !(recipe.error || recipe.errors)) {
        this.setState(recipe);
      } else {
        console.error(recipe);
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentWillMount() {
    this.props.userActions.checkCurrentUser();
  }

  componentDidMount() {
    this.fetchRecipe(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const currentId = this.props.match.params.id;
    const nextId = nextProps.match.params.id;
    const storedId = this.state.edamamId;
    if (nextId && nextId !== currentId && nextId !== storedId) {
      this.fetchRecipe(nextId);
    }
  }

  onStarClick = async rating => {
    const requestRating = await AsyncManager.postRequest("/api/ratings", {
      user: this.props.userReducer.user,
      recipe: this.state,
      rating
    });
    this.props.userActions.checkCurrentUser();
  };

  findRecipeRating = () => {
    const rating = this.props.userReducer.user.ratings.find(
      rating => rating.recipe === this.state._id
    );
    // rating is an object that contains a "rating" which is a value from 1 - 5
    return rating ? rating.rating : rating;
  };

  addRecipeToUser = async (user, recipe) => {
    await AsyncManager.patchRequest(
      `/api/users/${user._id}/recipes/${recipe._id}`
    );
    await this.props.userActions.checkCurrentUser();
  };

  removeRecipeToUser = async (user, recipe) => {
    await AsyncManager.deleteRequest(
      `/api/users/${user._id}/recipes/${recipe._id}`
    );
    await this.props.userActions.checkCurrentUser();
  };

  recipeBelongsToUser = (user, recipe) => {
    return user.recipes.some(r => r._id === recipe._id);
  };

  render() {
    return this.state.edamamId
      ? this.props.userReducer.user
        ? <Recipe
            recipe={this.state}
            user={this.props.userReducer.user}
            addRecipeToUser={this.addRecipeToUser}
            removeRecipeToUser={this.removeRecipeToUser}
            recipeBelongsToUser={this.recipeBelongsToUser}
            showRating={true}
            onStarClick={this.onStarClick}
            initialRating={
              this.findRecipeRating() ? this.findRecipeRating() : 0
            }
          />
        : <Recipe
            recipe={this.state}
            user={this.props.userReducer.user}
            addRecipeToUser={this.addRecipeToUser}
            removeRecipeToUser={this.removeRecipeToUser}
            recipeBelongsToUser={this.recipeBelongsToUser}
            showRating={false}
          />
      : <h1>
          <br />No. Recipe. Yo.
        </h1>;
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeContainer);
