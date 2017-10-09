import React, { Component } from "react";
import { connect } from "react-redux";
import Recipe from "../Recipe";

class RecipeContainer extends Component {
  render() {
    const id = this.props.match.params.id;
    return <Recipe recipe={this.props.recipes[id]} />;
  }
}

const mapStateToProps = state => {
  return {
    recipes: state.searchReducer.results
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     forkRecipe: recipe => dispatch(forkRecipe(recipe))
//   };
// };

export default connect(mapStateToProps, null)(RecipeContainer);
