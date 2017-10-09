import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../actions/user_actions";
import "../Profile/Profile.css";
import { withRouter } from "react-router-dom";
import Checkbox from "material-ui/Checkbox";
import FlatButton from "material-ui/FlatButton";

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
    if (
      this.props.userReducer.user === null &&
      nextProps.userReducer.user !== null
    ) {
      this.populatePreferences(nextProps.userReducer.user);
    }
  };

  componentDidMount = () => {
    if (this.props.userReducer.user) {
      this.populatePreferences(this.props.userReducer.user);
    }
  };

  onCheck = preference => () => {
    this.setState({ ...this.state, [preference]: !this.state[preference] });
  };

  buildCheckbox = label => (
    <Checkbox
      key={label}
      label={label}
      checked={this.state[label]}
      onCheck={this.onCheck(label)}
    />
  );

  handleFormSubmit = e => {
    e.preventDefault();
    const user = this.props.userReducer.user;
    const { updateUser } = this.props;
    const preferences = Object.entries(
      this.state
    ).reduce((acc, [pref, selected]) => {
      if (selected) acc.push(pref);
      return acc;
    }, []);
    updateUser({ ...user, dietaryRestrictions: preferences });
  };

  render() {
    return (
      <div className="preference-setter">
        Select your dietary requirements:
        <form onSubmit={this.handleFormSubmit}>
          {allPreferences.map(pref => this.buildCheckbox(pref))}

          <FlatButton
            primary
            backgroundColor="#fff"
            hoverColor="#aaa"
            onClick={this.handleFormSubmit}
          >
            Save
          </FlatButton>
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
