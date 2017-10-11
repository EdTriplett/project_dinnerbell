import React, { Component } from "react";
import Recipe from "../Recipe";
import AsyncManager from "../../services/AsyncManager";

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
        console.error(recipe);
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
    const storedId = this.state.edamamId;
    if (nextId && nextId !== currentId && nextId !== storedId) {
      this.fetchRecipe(nextId);
    }
  }

  render() {
    return this.state.edamamId ? (
      <Recipe recipe={this.state} />
    ) : (
      <h1>
        <br />No. Recipe. Yo.
      </h1>
    );
  }
}

export default RecipeContainer;
