import React, { Component } from "react";
import queryString from "query-string";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as userActions from "../../actions/user_actions";
import AsyncManager from "../../services/AsyncManager";
import LoadingFork from "../LoadingFork";
import InputToken from "./InputTokenForm";
import "./InputTokenForm.css";
import "./Recipes.css";
import RecipeCard from "../RecipeCard";

class Recipes extends Component {
  state = {
    q: "",
    loading: false,
    recipes: [],
    healthTokens: [],
    healthOptions: [
      { id: 1, name: "vegan", element: <span>vegan</span> },
      { id: 2, name: "vegetarian", element: <span>vegetarian</span> },
      { id: 3, name: "sugar-conscious", element: <span>sugar-conscious</span> },
      { id: 4, name: "peanut-free", element: <span>peanut-free</span> },
      { id: 5, name: "tree-nut-free", element: <span>tree-nut-free</span> },
      { id: 6, name: "alcohol-free", element: <span>alcohol-free</span> }
    ],
    healthFilters: [],
    dietTokens: [],
    dietOptions: [
      { id: 1, name: "balanced", element: <span>balanced</span> },
      { id: 2, name: "high-protein", element: <span>high-protein</span> },
      { id: 3, name: "low-fat", element: <span>low-fat</span> },
      { id: 4, name: "low-carb", element: <span>low-carb</span> }
    ],
    dietFilters: []
  };

  async componentWillMount() {
    let { q, preferences } = await this.parseSearchParams(
      this.props.location.search
    );
    await this.setDietaryPreferences(preferences);
    if (q !== this.state.q) {
      this.setState({ q }, this.searchRecipes);
    }
  }

  async componentWillReceiveProps(nextProps) {
    console.log("I recieved props");
    console.log("nextProps: ", nextProps);
    let { q, preferences } = this.parseSearchParams(nextProps.location.search);
    if (
      q !== this.state.q ||
      !_.isEqual(
        preferences.sort(),
        [...this.state.healthFilters, ...this.state.dietFilters].sort()
      )
    ) {
      await this.setDietaryPreferences(preferences);
      this.setState({ q }, this.searchRecipes);
    } else if (!this.state.recipes.length) {
      await this.setDietaryPreferences(preferences);
      this.setState({ q }, this.searchRecipes);
    }
  }

  parseSearchParams = url => {
    let { q, preferences } = queryString.parse(url);
    q = q ? q : "";
    preferences = preferences ? preferences : [];
    if (!Array.isArray(preferences)) {
      preferences = preferences.split(",");
    }
    return { q, preferences };
  };

  searchRecipes = async () => {
    try {
      await this.setState({ loading: true });
      const url = `/api/recipes?q=${this.state.q}&preferences=${[
        ...this.state.healthFilters,
        ...this.state.dietFilters
      ].join(",")}`;
      const recipes = await AsyncManager.getRequest(url);
      await this.setState({ recipes, loading: false });
    } catch (error) {
      console.log(error);
      await this.setState({ loading: false });
    }
  };

  selectToken = async e => {
    const filterType = e.target.name;
    const filterTokenArray = e.target.value;
    await this.setState({
      [`${filterType}Tokens`]: filterTokenArray,
      [`${filterType}Filters`]: filterTokenArray.map(
        token => this.state[`${filterType}Options`][token - 1].name
      )
    });
    let statePrefs = this.state.healthFilters.concat(this.state.dietFilters);
    this.props.history.push(
      `/recipes?q=${this.state.q}&preferences=${statePrefs.join(",")}`
    );
    this.searchRecipes();
  };

  setDietaryPreferences = async preferences => {
    const dietTokens = [];
    const dietFilters = [];
    const healthTokens = [];
    const healthFilters = [];
    await ["diet", "health"].forEach(async filterType => {
      preferences.forEach(userPreference => {
        const foundPreference = this.state[`${filterType}Options`].find(
          preference =>
            preference.name.toLowerCase() === userPreference.toLowerCase()
        );

        if (foundPreference) {
          switch (filterType) {
            case "health":
              healthTokens.push(foundPreference.id);
              healthFilters.push(foundPreference.name);
              break;
            case "diet":
              dietTokens.push(foundPreference.id);
              dietFilters.push(foundPreference.name);
              break;
            default:
              break;
          }
        }
      });
      await this.setState({
        dietTokens,
        dietFilters,
        healthTokens,
        healthFilters
      });
    });
  };

  filterRecipesLength = filteredRecipes => {
    return filteredRecipes.length <= 10
      ? filteredRecipes
      : new Array(10).fill(0).map((_, index) => filteredRecipes[index]);
  };

  addRecipeToUser = async (user, recipe) => {
    await AsyncManager.patchRequest(
      `/api/users/${user._id}/recipes/${recipe._id}`
    );
    await this.props.userActions.checkCurrentUser();
  };

  recipeBelongsToUser = (user, recipe) => {
    return user.recipes.some(r => r._id === recipe._id);
  };

  removeRecipeToUser = async (user, recipe) => {
    await AsyncManager.deleteRequest(
      `/api/users/${user._id}/recipes/${recipe._id}`
    );
    await this.props.userActions.checkCurrentUser();
  };

  renderHealthInputToken = () =>
    <InputToken
      name="health"
      value={this.state.healthTokens}
      placeholder="pick health option"
      options={this.state.healthOptions}
      onSelect={this.selectToken}
    />;

  renderDietInputToken = () =>
    <InputToken
      name="diet"
      value={this.state.dietTokens}
      placeholder="pick diet option"
      options={this.state.dietOptions}
      onSelect={this.selectToken}
    />;

  // getRandomIndex = () => {
  //   let random = Math.floor(Math.random() * 4) + 1;
  //
  //   if (previous_rand !== random) {
  //     previous_rand = random;
  //     return random;
  //   }
  //
  //   return this.getRandomIndex(random);
  // };

  render() {
    const recipeArray = Array.isArray(this.state.recipes)
      ? this.state.recipes
      : [];
    const filteredRecipes = this.filterRecipesLength(recipeArray);
    const recipes = filteredRecipes
      ? filteredRecipes.map((recipe, index) =>
          <RecipeCard
            recipe={recipe}
            user={this.props.userReducer.user}
            addRecipeToUser={this.addRecipeToUser}
            removeRecipeToUser={this.removeRecipeToUser}
            recipeBelongsToUser={this.recipeBelongsToUser}
            index={Math.floor(Math.random() * 4)}
            key={recipe._id}
          />
        )
      : null;
    return (
      <div className="background">
        <div className="search-container">
          <div className="search-recipes">
            <p className="search-recipes-title">find delicious recipes</p>
            <div className="filters-container">
              <div className="filter filter-health">
                {this.renderHealthInputToken()}
              </div>
              <div className="filter filter-diet">
                {this.renderDietInputToken()}
              </div>
            </div>
            <div className="recipe-results">
              {this.state.loading ? <LoadingFork /> : recipes}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Recipes)
);
