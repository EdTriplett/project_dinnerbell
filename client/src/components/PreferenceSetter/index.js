import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import "../Profile/Profile.css";
import { withRouter } from "react-router-dom";
import Checkbox from "../Checkbox";

const allPreferences = [
  "balanced",
  "high-protein",
  "low-fat",
  "low-carb",
  "vegan",
  "vegetarian",
  "sugar-conscious",
  "peanut-free",
  "tree-nut-free",
  "alcohol-free"
];

class PreferenceSetter extends Component {
  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  };

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const user = this.props.userReducer.user
    const {updateUser} = this.props;
    updateUser({...user, dietaryRestrictions: [...this.selectedCheckboxes]})
  };

  createCheckbox = label => {
    const user = this.props.userReducer.user
    return (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label} isChecked={user && Array.isArray(user.dietaryRestrictions) && user.dietaryRestrictions.includes(label)}
    />
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
          Select your dietary requirements:
            <form onSubmit={this.handleFormSubmit}>
              {allPreferences.map(pref=>this.createCheckbox(pref))}

              <button className="btn btn-default" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreferenceSetter));
