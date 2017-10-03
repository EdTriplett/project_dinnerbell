import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import * as searchActions from '../../actions/search_actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Landing from '../Landing';
import SignupForm from '../SignupForm';
import Navbar from '../Navbar';
import Authentication from '../Authentication';

import './App.css';

class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<Router>
					<div>
						<Navbar />
						<Route exact path="/" render={() => <Landing {...this.props} />} />
						<Route
							path="/register"
							render={() => (
								<Authentication {...this.props} showLogin={false} />
							)}
						/>
						<Route
							path="/login"
							render={() => <Authentication {...this.props} showLogin={true} />}
						/>
					</div>
				</Router>
			</MuiThemeProvider>
		);
	}
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	searchActions: bindActionCreators(searchActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
