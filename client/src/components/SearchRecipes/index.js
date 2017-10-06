import React, { Component } from "react";

import { DropDownMenu, MenuItem } from "material-ui";
import ReactSuperSelect from "react-super-select";

import * as userActions from "../../actions/user_actions";
import * as searchActions from "../../actions/search_actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

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
    sortFilter: null,
    sortValue: 1,
    dietaryFilter: null,
    dietaryValue: 1,
    recipes: [],
    value: 1,
    tokens: [],
    options: [
      { id: 1, name: "butter", element: <span>butter</span> },
      { id: 2, name: "milk", element: <span>milk</span> },
      { id: 3, name: "apple", element: <span>apple</span> },
      { id: 4, name: "chestnut", element: <span>chestnut</span> },
      { id: 5, name: "nutella", element: <span>nutella</span> }
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

  selectToken = ({ target: { value: tokens } }) => {
    this.setState({ tokens });
    console.log({ tokens });
  };

  renderInputToken = () =>
    <InputToken
      name="filters"
      value={this.state.tokens}
      placeholder="pick filter"
      options={this.state.options}
      onSelect={this.selectToken}
    />;

  render() {
    const recipes = this.state.recipes
      ? this.state.recipes.map((recipe, index) =>
          <Card className="recipe-card">
            <Link to={`/recipes/${index}`}>
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
            </Link>
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
