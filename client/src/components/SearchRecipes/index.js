import React, { Component } from "react";

import { DropDownMenu, MenuItem } from "material-ui";
import ReactSuperSelect from "react-super-select";

import * as userActions from "../../actions/user_actions";
import * as searchActions from "../../actions/search_actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withRouter } from "react-router-dom";
import { Paper } from "material-ui";
import { Card, CardHeader, CardTitle, CardText, CardMedia } from "material-ui";
import CircularProgress from "material-ui/CircularProgress";

import InputToken from "./InputTokenForm";

import "./InputTokenForm.css";

import "./SearchRecipes.css";
import StarRatingComponent from "react-star-rating-component";

class SearchRecipes extends Component {
  state = {
    // sortFilter: null,
    // sortValue: 1,
    // dietaryFilter: null,
    // dietaryValue: 1,
    recipes: [],
    // healthValue: 1,
    healthTokens: [],
    healthOptions: [
      { id: 1, name: "vegan", element: <span>vegan</span> }
      // { id: 2, name: "vegetarian", element: <span>vegetarian</span> },
      // { id: 3, name: "sugar-conscious", element: <span>sugar-conscious</span> },
      // { id: 4, name: "peanut-free", element: <span>peanut-free</span> },
      // { id: 5, name: "tree-nut-free", element: <span>tree-nut-free</span> },
      // { id: 5, name: "alcohol-free", element: <span>alcohol-free</span> }
    ]
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: !Array.isArray(nextProps.searchReducer.results)
        ? []
        : nextProps.searchReducer.results
    });
    if (nextProps.searchReducer.query !== this.props.searchReducer.query) {
      this.props.searchActions.requestSearch(nextProps.searchReducer.query);
    }
  }

  componentWillMount() {
    this.props.searchActions.requestSearch(this.props.searchReducer.query);
  }

  // handleChange = (event, index, value) => this.setState({ value });

  selectHealthToken = ({ target: { value: healthTokens } }) => {
    this.setState({ healthTokens });
  };

  renderInputToken = () =>
    <InputToken
      name="healthFilters"
      value={this.state.healthTokens}
      placeholder="pick health option"
      options={this.state.healthOptions}
      onSelect={this.selectToken}
    />;

  render() {
    const recipes = this.state.recipes
      ? this.state.recipes.map(recipe =>
          <Card className="recipe-card">
            <CardMedia>
              {recipe.image && <img src={recipe.image.url} />}
            </CardMedia>
            <CardTitle className="card-title">
              {recipe.name}
            </CardTitle>
            <StarRatingComponent
              className="star-rating"
              name="rating"
              value={Math.floor(Math.random() * 5)}
              editing={false}
            />
          </Card>
        )
      : null;
    return (
      <div className="background">
        <div className="search-container">
          <div className="search-recipes">
            <p className="search-recipes-title">find delicious recipes</p>
            {this.renderInputToken()}
            <div className="recipe-results">
              {this.props.searchReducer.isSearching
                ? <CircularProgress />
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
  searchActions: bindActionCreators(searchActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchRecipes)
);
