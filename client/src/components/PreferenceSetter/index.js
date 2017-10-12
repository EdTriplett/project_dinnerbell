import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import "../Profile/Profile.css";
import { withRouter, Link } from "react-router-dom";
import Checkbox from "material-ui/Checkbox";
import FlatButton from "material-ui/FlatButton";
import UpdateSettings from "./UpdateSettings";

import AlertContainer from "react-alert";

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
    this.state = {
      settings: false,
      checkboxes: allPreferences.reduce(buildCheckboxes, {})
    };
  }

  alertOptions = {
    offset: 14,
    position: "bottom left",
    theme: "dark",
    time: 5000,
    transition: "scale"
  };

  showAlert = () => {
    this.msg.show("Your dietary requirements have been updated!", {
      time: 2000,
      type: "success",
      icon: <img src="path/to/some/img/32x32.png" />
    });
  };

  populatePreferences = user => {
    const checkboxes = { ...this.state.checkboxes };
    if (user && Array.isArray(user.dietaryRestrictions)) {
      user.dietaryRestrictions.forEach(restriction => {
        if (allPreferences.includes(restriction)) {
          checkboxes[restriction] = true;
        }
      });
      this.setState({ checkboxes });
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
    let checkboxes = {
      ...this.state.checkboxes,
      [preference]: !this.state.checkboxes[preference]
    };
    this.setState({ checkboxes });
  };

  buildCheckbox = label => (
    <Checkbox
      labelStyle={{ color: "#494949" }}
      key={label}
      label={label}
      checked={this.state.checkboxes[label]}
      onCheck={this.props.allowedActions ? this.onCheck(label) : null}
      disabled={!this.props.allowedActions}
    />
  );

  handleFormSubmit = e => {
    e.preventDefault();
    const user = this.props.user;
    const preferences = Object.entries(
      this.state.checkboxes
    ).reduce((acc, [pref, selected]) => {
      if (selected) acc.push(pref);
      return acc;
    }, []);
    if (this.props.allowedActions) {
      this.props.allowedActions
        .updateUser({
          ...user,
          dietaryRestrictions: preferences
        })
        .then(() => {
          this.showAlert();
        });
    }
  };

  handleLeaveSettings = () => {
    this.setState({ settings: false });
  };

  render() {
    if (this.state.settings) {
      return <UpdateSettings leaveSettings={this.handleLeaveSettings} />;
    } else {
      return (
        <div className="preference-setter">
          <AlertContainer ref={a => (this.msg = a)} {...this.alertOptions} />
          <h4>
            {this.props.allowedActions
              ? "Select your dietary requirements"
              : `${this.props.user.username}'s dietary preferences:`}
          </h4>
          <form onSubmit={this.handleFormSubmit}>
            {allPreferences.map(pref => this.buildCheckbox(pref))}
            {this.props.allowedActions && (
              <div className="preference-setter-buttons">
                <FlatButton
                  backgroundColor="#E34B27"
                  hoverColor="#C32B07"
                  style={{ padding: "0px 10px", color: "#fff" }}
                  onClick={this.handleFormSubmit}
                >
                  Save
                </FlatButton>
                <FlatButton
                  backgroundColor="#E34B27"
                  hoverColor="#C32B07"
                  style={{ padding: "0px 10px", color: "#fff" }}
                  onClick={() => this.setState({ settings: true })}
                >
                  Settings
                </FlatButton>
              </div>
            )}
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreferenceSetter)
);
