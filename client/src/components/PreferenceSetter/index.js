import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import "../Profile/Profile.css";
import { withRouter, Link } from "react-router-dom";
import Checkbox from "material-ui/Checkbox";
import FlatButton from "material-ui/FlatButton";

import "./PreferenceSetter.css";

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

const buildCheckboxes = (acc, preference) => {
  acc[preference] = false;
  return acc;
};

class PreferenceSetter extends Component {
  constructor(props) {
    super(props);
    this.state = allPreferences.reduce(buildCheckboxes, {});
  }

  populatePreferences = user => {
    const checkboxes = { ...this.state };
    if (user && Array.isArray(user.dietaryRestrictions)) {
      user.dietaryRestrictions.forEach(restriction => {
        if (allPreferences.includes(restriction)) {
          checkboxes[restriction] = true;
        }
      });
      this.setState(checkboxes);
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.user._id && nextProps.user._id !== this.props.user._id) {
      this.populatePreferences(nextProps.user);
    }
  };

  componentDidMount = () => {
    if (this.props.user) {
      this.populatePreferences(this.props.user);
    }
  };

  onCheck = preference => () => {
    this.setState({ ...this.state, [preference]: !this.state[preference] });
  };

  buildCheckbox = label => (
    <Checkbox
      labelStyle={{ color: "#494949" }}
      key={label}
      label={label}
      checked={this.state[label]}
      onCheck={this.props.allowedActions ? this.onCheck(label) : null}
      disabled={!this.props.allowedActions}
    />
  );

  handleFormSubmit = e => {
    e.preventDefault();
    const user = this.props.user;
    const preferences = Object.entries(
      this.state
    ).reduce((acc, [pref, selected]) => {
      if (selected) acc.push(pref);
      return acc;
    }, []);
    if (this.props.allowedActions) {
      this.props.allowedActions.updateUser({
        ...user,
        dietaryRestrictions: preferences
      });
    }
  };

  render() {
    return (
      <div className="preference-setter">
        <h4>
          {this.props.allowedActions
            ? "Select your dietary requirements"
            : `${this.props.user.username}'s dietary preferences:`}
        </h4>
        <form onSubmit={this.handleFormSubmit}>
          {allPreferences.map(pref => this.buildCheckbox(pref))}
          {this.props.allowedActions ? (
            <div className="preference-setter-buttons">
              <FlatButton
                backgroundColor="#E34B27"
                hoverColor="#C32B07"
                style={{ padding: "0px 10px", color: "#fff" }}
                onClick={this.handleFormSubmit}
              >
                Save
              </FlatButton>
              <Link to={"/profileUpdater"}>
                <FlatButton
                  backgroundColor="#E34B27"
                  hoverColor="#C32B07"
                  style={{ padding: "0px 10px", color: "#fff" }}
                >
                  Settings
                </FlatButton>
              </Link>
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreferenceSetter)
);
