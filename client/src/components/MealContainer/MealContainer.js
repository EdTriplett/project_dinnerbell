// 59dbd2105e9bc04250f9d16c
import React, { Component } from "react";
import { connect } from "react-redux";
import { getMeal } from "../../actions/meal_actions";

class MealContainer extends Component {
  componentDidMount() {
    this.props.meal
      ? console.log(this.props.meal)
      : this.props.getMeal(this.props.match.params.id);
  }

  render() {
    console.log(this.props);
    const mealId = this.props.match.params.id;
    return <div>mealcontainer</div>;
  }
}

const mapStateToProps = state => {
  return {
    meal: state.mealReducer.meal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMeal: id => {
      dispatch(getMeal(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MealContainer);
