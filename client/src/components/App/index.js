import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import * as searchActions from '../../actions/search_actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';
import Landing from '../Landing';
import Navbar from '../Navbar';

class App extends Component {
	render() {
		console.log(this.props);
		return (
			<div>
				<Navbar />
				<MuiThemeProvider>
					<Landing />
				</MuiThemeProvider>
			</div>
		);
	}
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	searchActions: bindActionCreators(searchActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
