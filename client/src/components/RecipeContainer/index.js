import React, { Component } from "react";
import Recipe from "../Recipe";
import AsyncManager from "../../services/AsyncManager";
import LoadingFork from "../LoadingFork";

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
        this.props.history.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.fetchRecipe(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const currentId = this.props.match.params.id;
    const nextId = nextProps.match.params.id;
    const storedId = this.state._id;
    if (nextId && nextId !== currentId && nextId !== storedId) {
      this.fetchRecipe(nextId);
    }
  }

  render() {
    return this.state._id ? (
      <Recipe recipe={this.state} />
    ) : (
      <div className="recipe-container">
        <LoadingFork />
      </div>
    );
  }
}

export default RecipeContainer;
