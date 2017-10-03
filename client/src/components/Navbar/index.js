import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import { TextField, IconMenu, MenuItem } from 'material-ui';
import './Navbar.css';

// const style = {
// 	width: '100vw',
// 	// height: "50px",
// 	display: 'flex',
// 	justifyContent: 'space-between',
// 	position: 'absolute',
// 	zIndex: 2
// };

const Searchbar = () => (
	<form className="searchthis" method="get">
		<input
			className="namanyay-search-box"
			name="q"
			size="40"
			type="text"
			placeholder="Search for recipes"
		/>
		<button className="namanyay-search-btn" type="submit">
			<i className="fa fa-search" aria-hidden="true" />
		</button>
	</form>
);

const Navbar = () => {
	return (
		<div className="nav">
			<div className="nav-items">
				<div className="logo" />
			</div>
			<div className="nav-searchbar">
				<Searchbar />
			</div>
		</div>
	);
};

export default Navbar;
