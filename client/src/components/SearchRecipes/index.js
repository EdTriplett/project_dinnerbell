import React, { Component } from "react";

import { DropDownMenu, MenuItem } from "material-ui";
import ReactSuperSelect from "react-super-select";

import * as userActions from "../../actions/user_actions";
import * as searchActions from "../../actions/search_actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { withRouter } from "react-router-dom";
import { Paper } from "material-ui";

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
    const recipes = new Array(5).fill(0).map(() =>
      <Paper className="recipe">
        <img src="https://eat24hours.com/files/cuisines/v4/thai.jpg?e24v=103?e24v=178?e24v=178" />

        <p>
          Non incurreret philosophari, non sint fugiat ad litteris. Ea nescius
          consectetur. Id ut irure appellat, culpa aut senserit id quid, est
          nulla nisi o quamquam, summis in quamquam ab nulla. Quibusdam in elit
          aut admodum o constias sed nam dolor multos ea senserit, e illum quis
          de commodo si enim est arbitror ne excepteur tempor eiusmod, eram se
          non noster ingeniis, aliquip fore aute qui export.Ubi velit pariatur,
          sed summis voluptatibus ab mentitum sempiternum ad commodo se admodum
          anim cillum ullamco summis. A malis sint culpa quamquam do ita fugiat
          praetermissum, export voluptate nam quem eram iis incididunt cillum
          quid vidisse sint. Si quorum voluptate.
        </p>
      </Paper>
    );
    return (
      <div className="search-recipes">
        <div className="recipe-results">
          {recipes}
        </div>
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
