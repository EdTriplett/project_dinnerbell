import React, { Component } from "react";

import * as userActions from "../../actions/user_actions";
import * as searchActions from "../../actions/search_actions";
import * as recipeActions from "../../actions/recipe_actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";
import { Card, CardTitle, CardMedia } from "material-ui";

import CustomLoader from "../CustomLoader";

import InputToken from "./InputTokenForm";
import "./InputTokenForm.css";

import "./SearchRecipes.css";
import StarRatingComponent from "react-star-rating-component";

let previous_rand = 1;

class SearchRecipes extends Component {
  state = {
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

  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: !Array.isArray(nextProps.searchReducer.results)
        ? []
        : nextProps.searchReducer.results
    });
    if (
      nextProps.searchReducer.query !== this.props.searchReducer.query ||
      nextProps.searchReducer.preferences !==
        this.props.searchReducer.preferences
    ) {
      this.props.searchActions.requestSearch(
        nextProps.searchReducer.query,
        nextProps.searchReducer.preferences
      );
    }
  }

  componentWillMount() {
<<<<<<< HEAD
    console.log("WillMount this.props = ", this.props);
=======
>>>>>>> be85e3e40d536388db99b148b095e255983f2ae1
    if (this.props.userReducer.user) {
      const defaultPrefs = this.props.userReducer.user.dietaryRestrictions;
      this.setDefaultDietaryPreferences(defaultPrefs);
      this.props.searchActions.requestSearch(
        this.props.searchReducer.query,
        defaultPrefs
      );
    } else {
      this.props.searchActions.requestSearch(this.props.searchReducer.query);
    }
    this.props.userActions.checkCurrentUser();
  }

  selectToken = e => {
    const filterType = e.target.name;
    const filterTokenArray = e.target.value;
    this.setState({
      [`${filterType}Tokens`]: filterTokenArray,
      [`${filterType}Filters`]: filterTokenArray.map(
        token => this.state[`${filterType}Options`][token - 1].name
      )
    });
  };

  setDefaultDietaryPreferences = preferences => {
    const dietTokens = [];
    const dietFilters = [];
    const healthTokens = [];
    const healthFilters = [];
    ["diet", "health"].forEach(filterType => {
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
      this.setState({
        dietTokens,
        dietFilters,
        healthTokens,
        healthFilters
      });
    });
  };

  filterRecipes = () => {
    return this.state.recipes.filter(recipe => {
      return this.isValidRecipe(recipe);
    });
  };

  filterRecipesLength = filteredRecipes => {
    return filteredRecipes.length <= 9
      ? filteredRecipes
      : new Array(9).fill(0).map((_, index) => filteredRecipes[index]);
  };

  findOrCreateRecipe = recipe => async () => {
    this.props.recipeActions.findOrCreateRecipe(recipe);
  };

  isValidRecipe = recipe => {
    const filters = [...this.state.dietFilters, ...this.state.healthFilters];
    return filters.reduce(
      (isValid, filter) =>
        recipe.preferences &&
        !!recipe.preferences.find(
          preference => preference.toLowerCase() === filter.toLowerCase()
        ) &&
        isValid,
      true
    );
  };

  renderHealthInputToken = () => (
    <InputToken
      name="health"
      value={this.state.healthTokens}
      placeholder="pick health option"
      options={this.state.healthOptions}
      onSelect={this.selectToken}
    />
  );

  renderDietInputToken = () => (
    <InputToken
      name="diet"
      value={this.state.dietTokens}
      placeholder="pick diet option"
      options={this.state.dietOptions}
      onSelect={this.selectToken}
    />
  );

  getRandomIndex = () => {
    let random = Math.floor(Math.random() * 4) + 1;

    if (previous_rand !== random) {
      previous_rand = random;
      return random;
    }

    return this.getRandomIndex(random);
  }

  render() {
    const recipes = this.state.recipes
      ? this.state.recipes.map((recipe, index) => (
          <Card
            className="recipe-card"
            key={`${recipe.name}${recipe.edamamId
              ? recipe.edamamId
              : "bad recipe"}`}
          >
            <Link to={`/recipes/${recipe.edamamId}`}>
              <CardMedia>
                {recipe.image && <img src={recipe.image} alt="" />}
              </CardMedia>
              <CardTitle className="card-title">{recipe.name}</CardTitle>
              <StarRatingComponent
                className="star-rating"
                name="rating"
                value={Math.floor(Math.random() * 5)}
                editing={false}
              />
            </Link>
          </Card>
        ))
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
              {this.props.searchReducer.isSearching ? (
                <CustomLoader />
              ) : (
                recipes
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  searchActions: bindActionCreators(searchActions, dispatch),
  recipeActions: bindActionCreators(recipeActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchRecipes)
);
