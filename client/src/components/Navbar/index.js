import React from "react";
import muiThemeable from "material-ui/styles/muiThemeable";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import FlatButton from "material-ui/FlatButton";
import AssignmentIcon from "material-ui/svg-icons/action/assignment";
import { TextField, IconMenu, MenuItem } from "material-ui";

const style = {
  width: "100vw",
  // height: "50px",
  display: "flex",
  justifyContent: "space-between",
  position: "absolute",
  zIndex: 2
};

const Searchbar = () =>
  <form className="searchthis" method="get">
    <input
      id="namanyay-search-box"
      name="q"
      size="40"
      type="text"
      placeholder="  Type! :D "
    />
    <input className="namanyay-search-btn" value="Search" type="submit" />
  </form>;

const Navbar = () => {
  return (
    <div style={style}>
      <div className="nav-items" />
      <div className="nav-searchbar">
        <Searchbar />
        {/* <AppBar iconElementRight={Searchbar} /> */}
      </div>
    </div>
  );
};

export default Navbar;
