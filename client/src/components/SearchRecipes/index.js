import React, { Component } from "react";

import { DropDownMenu, MenuItem } from "material-ui";
import ReactSuperSelect from "react-super-select";

import * as userActions from "../../actions/user_actions";
import * as searchActions from "../../actions/search_actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withRouter } from "react-router-dom";

import "./SearchRecipes.css";

class SearchRecipes extends Component {
  state = {
    sortFilter: null,
    sortValue: 1,
    dietaryFilter: null,
    dietaryValue: 1,
    recipes: []
  };

  componentWillReceiveProps(nextProps) {
    console.log("nextProps: ", nextProps);
  }

  componentWillMount() {
    this.props.searchActions.requestSearch();
    // console.log("this.props: ", this.props);
    // this.props.userActions.checkCurrentUser();
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
    return (
      <div className="search-recipes">
        <div className="recipe-results" />
        <div className="newsfeed" />
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
