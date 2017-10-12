// 59dbd2105e9bc04250f9d16c
import React, { Component } from "react";
import { connect } from "react-redux";
import { getMeal } from "../../actions/meal_actions";
import Meal from "./Meal";

const styles = {
  display: "flex",
  backgroundColor: "#3c8d41",
  justifyContent: "center",
  height: "100%"
};

class MealContainer extends Component {
  // On mount, checks to see if meal is stored in state, dispatches an async
  // action to populate if it isn't based on the url parameter
  componentDidMount() {
    this.props.meal
      ? console.log(this.props.meal)
      : this.props.getMeal(this.props.match.params.id);
  }

  render() {
    return (
      <div style={styles}>
        {this.props.meal ? <Meal meal={this.props.meal.meal[0]} /> : null}
      </div>
    );
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
