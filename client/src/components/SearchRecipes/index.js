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

import "./SearchRecipes.css";
import StarRatingComponent from "react-star-rating-component";

class SearchRecipes extends Component {
  state = {
    sortFilter: null,
    sortValue: 1,
    dietaryFilter: null,
    dietaryValue: 1,
    recipes: []
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      recipes: nextProps.searchReducer.results
    });
    console.log("nextProps: ", nextProps);
    if (nextProps.searchReducer.query !== this.props.searchReducer.query) {
      this.props.searchActions.requestSearch(nextProps.searchReducer.query);
    }
  }

  componentWillMount() {
    this.props.searchActions.requestSearch(this.props.searchReducer.query);
  }

  // searchRecipes = () => {
  //   this.props.userReducer
  // }
  //
  // onClickLogout = async () => {
  //   await this.props.userActions.logoutUser();
  //   this.props.history.push("/");
  // };

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    const recipes = this.state.recipes
      ? this.state.recipes.map(recipe =>
          <Card className="recipe-card">
            <CardMedia>
              <img src={recipe.image.url} />
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
            {/* <CardText className="card-text">
              Non incurreret philosophari, non sint fugiat ad litteris. Ea
              nescius // consectetur. Id ut irure appellat, culpa aut senserit
              id quid, est
            </CardText> */}
          </Card>
        )
      : null;
    return (
      <div className="background">
        <div className="search-recipes">
          <div className="recipe-results">
            {recipes}
          </div>
          <div className="newsfeed" />
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
