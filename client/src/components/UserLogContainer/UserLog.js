import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Link } from "react-router-dom";

const SortableItem = SortableElement(({ item, resource }) => (
  <div className="user-logs-item">
    <Link to={`/${resource}/${item._id}`}>
      <p>{item.name}</p>
    </Link>
  </div>
));

const SortableList = SortableContainer(({ items, resource }) => (
  <div>
    {items.map((item, index) => (
      <SortableItem
        key={`item-${index}`}
        index={index}
        item={item}
        resource={resource}
      />
    ))}
  </div>
));

const UserLog = ({ info, actions }) => (
  <div className="user-logs-col">
    <div className="user-logs">
      <span className="scratch" />
      <span className="user-logs-title">{info.title}</span>
      <div className="search-form">
        <input
          value={info.search}
          onChange={actions.onChangeSearch}
          className="logs-search-box"
          name="q"
          size="40"
          type="text"
          placeholder="Search..."
        />
      </div>
      <SortableList {...info} onSortEnd={actions.onSortEnd} pressDelay={200} />
    </div>
  </div>
);

export default UserLog;
