import React, { Component } from 'react';

import { DropDownMenu, MenuItem } from 'material-ui';
import ReactSuperSelect from 'react-super-select';

import * as userActions from '../../actions/user_actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';

import './SearchRecipes.css';

const styles = {
  menuStyle: {
    marginLeft: '20px'
  },
  listStyle: {
    marginLeft: '20px'
  }
};

class SearchRecipes extends Component {
  state = {
    sortFilter: null,
    sortValue: 1,
    dietaryFilter: null,
    dietaryValue: 1
  };

  onClickLogout = async () => {
    await this.props.userActions.logoutUser();
    this.props.history.push('/');
  };

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    return (
      <div className="search-recipes">
        <div className="recipe-results">
          <ReactSuperSelect
            placeholder="Make Your Selections"
            // ajaxDataFetch={simulatedAjaxFetch}
            // onChange={handlerExample}
            searchable={true}
            className="super-test"
          />
          <button onClick={this.onClickLogout}>Logout</button>
        </div>

        <div className="newsfeed" />
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchRecipes)
);
