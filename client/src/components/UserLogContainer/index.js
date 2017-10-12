import React, { Component } from "react";
import { arrayMove } from "react-sortable-hoc";

import UserLog from "./UserLog";

class UserLogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items || [],
      search: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items && nextProps.items.length !== this.props.items.length) {
      this.setState({ items: nextProps.items });
    }
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (!this.state.search.length) {
      const items = arrayMove(this.state.items, oldIndex, newIndex);
      this.props.updateArray(items);
      this.setState({ items });
    }
  };

  onChangeSearch = e => {
    const search = e.target.value.toLowerCase();
    let items = this.props.items || [];
    items = items.filter(item => item.name.toLowerCase().includes(search));
    this.setState({ search, items });
  };

  actions = {
    onSortEnd: this.onSortEnd,
    onChangeSearch: this.onChangeSearch
  };

  render() {
    const { title, resource } = this.props;
    const info = { ...this.state, title, resource };
    return <UserLog info={info} actions={this.actions} />;
  }
}

export default UserLogContainer;
