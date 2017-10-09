import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import TextField from "material-ui/TextField";
import InputToken from "./InputTokenForm";

import serialize from "form-serialize";

import * as userActions from "../../actions/user_actions";
import * as mealActions from "../../actions/meal_actions";

import Dropzone from "react-dropzone";

import "./CreateMeal.css";
import "./InputTokenForm.css";

class CreateMeal extends Component {
	state = {
		value: 2,
		mealName: "",
		mealDescription: "",
		isUpdatingImage: false,
		recipeTokens: [],
		selectedRecipes: [],
		recipeOptions: [
			{ id: 1, name: "Apple Pie", element: <span>Apple Pie</span> },
			{ id: 2, name: "New York Steak", element: <span>New York Steak</span> },
			{ id: 3, name: "Chicken Soup", element: <span>Chicken Soup</span> },
			{ id: 4, name: "French Fries", element: <span>French Fries</span> },
			{ id: 5, name: "Tuna Salad", element: <span>Tuna Salad</span> }
		],
		userTokens: [],
		selectedUsers: [],
		userOptions: [
			
		],
		isLoading: false
	};

	componentDidMount() {
		this.props.userActions.getUsers()
	}

	componentDidUpdate() {
		const { userReducer } = this.props;
		if (this.props.userReducer.users && !this.state.userOptions.length) {
			let filtered = userReducer.users.filter(user => user.username !== userReducer.user.username);

			filtered.forEach((item, index) => {
				item.id = index;
				item.name = item.username;
				item.element = <span>{item.username}</span>
			})

			this.setState({
				userOptions: filtered
			})
		}
	}


	handleUsersKeyPress = e => {
		if (e.key === "Enter") {
			e.stopPropagation();
			e.preventDefault();

			let optionsLen = this.state.userOptions.length;
			const newUser = {
				id: ++optionsLen,
				name: e.target.value,
				element: <span>{e.target.value}</span>
			};

			let userOptions = [
				...this.state.userOptions,
				newUser
			];
			let userTokens = [
				...this.state.userTokens,
				newUser.id
			];

			this.setState({ userOptions, userTokens });
		}
	};

	handleRecipesKeyPress = e => {
		if (e.key === "Enter") {
			e.stopPropagation();
			e.preventDefault();

			let optionsLen = this.state.recipeOptions.length;
			const newRecipe = {
				id: ++optionsLen,
				name: e.target.value,
				element: <span>{e.target.value}</span>
			};

			let recipeOptions = [
				...this.state.recipeOptions,
				newRecipe
			];
			let recipeTokens = [...this.state.recipeTokens, newRecipe.id];

			this.setState({ recipeOptions, recipeTokens });
		}
	};

	selectedUserToken = e => {
		let tokens = e.target.value;
		let selectedUsers = [];
		let copy = [...tokens];
		copy.pop();
		let result = this.state.userOptions.filter(
			x => x.id === selectedUsers
		);
		if (result.length) {
			selectedUsers = [...this.state.selectedUsers, result[0].name];
		} else {
			selectedUsers.pop();
		}

		this.setState({ userTokens: tokens, selectedUsers });
	};

	selectRecipeToken = e => {
		let tokens = e.target.value;
		let selectedRecipes = [];
		let copy = [...tokens];
		const recipeIndex = copy.pop();
		let result = this.state.recipeOptions.filter(
			x => x.id === recipeIndex
		);

		if (result.length) {
			selectedRecipes = [...this.state.selectedRecipes, result[0].name];
		} else {
			selectedRecipes.pop();
		}

		this.setState({ recipeTokens: tokens, selectedRecipes });
	};

	renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
		<TextField
			hintText={label}
			floatingLabelText={label}
			errorText={touched && error}
			{...input}
			{...custom}
		/>
	);

	onTextInputName = e => {
		this.setState({
			mealName: e.target.value
		});
	};

	onTextFieldInput = e => {
		this.setState({
			mealDescription: e.target.value
		});
	};

	onSubmitForm = e => {
		e.preventDefault();
		let form = serialize(e.target, { hash: true });
	};

	imageSelected = files => {
		const image = files[0];

		console.log("touched this!");
		this.props.mealActions.setMealProfileImage(image);

		// TODO: create meals
	};

	render() {
		const { userReducer, mealReducer } = this.props;
		return (
			<div className="create-recipe">
				<form onSubmit={this.onSubmitForm}>
					<p className="label">Plan out your meal</p>
					{!mealReducer.mealPicture ? (
						<div
							className="user-recipe-img-default"
							style={{ margin: "0 auto" }}
						/>
					) : (
						<div
							className="user-recipe-img-custom"
							style={{ margin: "0 auto" }}
						>
							<img src={mealReducer.mealPicture} />
						</div>
					)}
					<div className="recipe-form-body">
						<div className="recipe-name-ingredient-container">
							<div
								style={{
									marginBottom: 20,
									display: "flex",
									alignItems: "center"
								}}
							>
								<TextField
									name="name"
									hintText={"meal name"}
									floatingLabelText={"give your meal a name"}
									floatingLabelStyle={{ color: "white" }}
									hintStyle={{ color: "white" }}
									inputStyle={{ color: "white" }}
									autoComplete="off"
									onChange={this.onTextInputName}
								/>
								<Dropzone
									onDrop={this.imageSelected}
									style={{ border: "none" }}
								>
									<i className="fa fa-camera" aria-hidden="true" />
								</Dropzone>
							</div>

							<InputToken
								name="Recipes"
								isLoading={this.state.isLoading}
								value={this.state.recipeTokens}
								placeholder="pick recipes"
								options={this.state.recipeOptions}
								onSelect={this.selectRecipeToken}
								onKeyPress={this.handleRecipesKeyPress}
								color="blue"
							/>

							<InputToken
								name="Guests"
								isLoading={this.state.isLoading}
								value={this.state.userTokens}
								placeholder="choose guests"
								options={this.state.userOptions}
								onSelect={this.selectedUserToken}
								onKeyPress={this.handleUsersKeyPress}
								color="orange"
							/>
						</div>

						<div className="wrapper">
							<div className="paper">
								<textarea
									placeholder="Write a description of your meal :)"
									className="text"
									name="instructions"
									rows="4"
									style={{
										overflow: "hidden",
										wordWrap: "break-word",
										resize: "none",
										height: "500px",
										width: "700px"
									}}
									onChange={this.onTextFieldInput}
								/>
								<br />
							</div>
						</div>
					</div>

					<div className="recipe-login-buttons">
						<button type="submit">submit</button>
						<button
							onClick={() => {
								this.props.history.goBack;
							}}
						>
							cancel
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  mealActions: bindActionCreators(mealActions, dispatch)
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CreateMeal)
);
