import React, { Component } from "react";

import { DropDownMenu, MenuItem } from "material-ui";
import ReactSuperSelect from "react-super-select";

import "./SearchRecipes.css";

const styles = {
  menuStyle: {
    marginLeft: "20px"
  },
  listStyle: {
    marginLeft: "20px"
  }
};

class SearchRecipes extends Component {
  state = {
    sortFilter: null,
    sortValue: 1,
    dietaryFilter: null,
    dietaryValue: 1
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
        </div>

        <div className="newsfeed" />
      </div>
    );
  }
}

export default SearchRecipes;
