import React, { Component } from "react";

import { DropDownMenu, MenuItem } from "material-ui";
import ReactSuperSelect from "react-super-select";

import * as userActions from "../../actions/user_actions";
import * as searchActions from "../../actions/search_actions";
import * as recipeActions from "../../actions/recipe_actions";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

import { withRouter } from "react-router-dom";
import { Paper } from "material-ui";
import { Card, CardHeader, CardTitle, CardText, CardMedia } from "material-ui";

import CustomLoader from "../CustomLoader";
import CircularProgress from "material-ui/CircularProgress";

import InputToken from "./InputTokenForm";
import "./InputTokenForm.css";

import "./SearchRecipes.css";
import StarRatingComponent from "react-star-rating-component";

import { parseRecipe } from "../../services/RecipeParser";

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
    if (nextProps.searchReducer.query !== this.props.searchReducer.query) {
      this.props.searchActions.requestSearch(
        nextProps.searchReducer.query,
        nextProps.searchReducer.preferences
      );
    }
  }

  componentWillMount() {
    this.props.searchActions.requestSearch(this.props.searchReducer.query);
    this.props.userActions.checkCurrentUser();
    // const defaultDietaryRestrictions = [
    //   "vegetarian",
    //   "peanut-free",
    //   "balanced"
    // ];
    // console.log("defaults: ", defaultDietaryRestrictions);
    // this.setDefaultDietaryPreferences(defaultDietaryRestrictions);
    // if (this.props.user) {
    // TODO add intial user preferences
    // this.setDefaultDietaryPreferences()
    // }
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
    console.log("originalRecipe: ", recipe);
    const parsedRecipe = parseRecipe(recipe);
    console.log("parsedRecipe: ", parsedRecipe);
    // this.props.recipeActions.findOrCreateRecipe(parsedRecipe);
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

  renderRecipeRating = recipe => {
    return recipe.length > 0
      ? <div className="rating-container">
          <StarRatingComponent
            className="star-rating"
            name="rating"
            value={3}
            editing={false}
          />
          <p className="rating-users">
            ({recipe.length} user ratings)
          </p>
          <button onClick={this.findOrCreateRecipe(recipe)}>Recipe</button>
        </div>
      : <div className="rating-container">
          <StarRatingComponent
            className="star-rating"
            name="rating"
            value={0}
            editing={false}
          />
          <p className="rating-users">(0 user ratings)</p>
          {recipe._id
            ? <button onClick={this.findOrCreateRecipe(recipe)}>
                Add (database)
              </button>
            : <button onClick={this.findOrCreateRecipe(recipe)}>
                Add (!database)
              </button>}
        </div>;
  };

  render() {
    console.log("this.props: ", this.props);
    const recipes = Array.isArray(this.state.recipes)
      ? this.filterRecipesLength(
          this.filterRecipes(this.state.recipes)
        ).map((recipe, index) =>
          <Card
            className="recipe-card"
            key={
              recipe._id ? recipe._id : recipe.uri ? recipe.uri : "bad recipe"
            }
          >
            {/* <Link to={`/recipes/${index}`} className="link-container"> */}
            <CardMedia>
              <img
                src={
                  !recipe.image
                    ? null
                    : recipe.image.url ? recipe.image.url : recipe.image
                }
              />
            </CardMedia>
            <CardTitle className="card-title">
              {recipe.name}
            </CardTitle>
            {this.renderRecipeRating(recipe)}
            {/* </Link> */}
          </Card>
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
              {this.props.searchReducer.isSearching
                ? <CustomLoader />
                : recipes}
            </div>
          </div>
          <Paper className="newsfeed">placeholder</Paper>
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
