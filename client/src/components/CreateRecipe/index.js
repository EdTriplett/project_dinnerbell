import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import asyncValidate from "../../services/AsyncValidate";
import TextField from "material-ui/TextField";
import CircularProgress from "material-ui/CircularProgress";
import InputToken from "./InputTokenForm";

import serialize from "form-serialize";

import * as userActions from "../../actions/user_actions";

import Dropzone from "react-dropzone";
import sha1 from "sha1";
import AsyncManager from "../../services/AsyncManager";

import "./CreateRecipe.css";
import "./InputTokenForm.css";

class CreateRecipe extends Component {
	state = {
		value: 2,
		recipeName: "",
		recipeSteps: "",
		isUpdatingImage: false,
		ingredientTokens: [],
		selectedIngredients: [],
		ingredientsOptions: [
			{ id: 1, name: "butter", element: <span>butter</span> },
			{ id: 2, name: "milk", element: <span>milk</span> },
			{ id: 3, name: "apple", element: <span>apple</span> },
			{ id: 4, name: "chestnut", element: <span>chestnut</span> },
			{ id: 5, name: "nutella", element: <span>nutella</span> }
		],
		preferencesTokens: [],
		selectedPreferences: [],
		preferencesOptions: [
			{ id: 1, name: "low carb", element: <span>low carb</span> },
			{ id: 2, name: "gluten free", element: <span>gluten free</span> },
			{ id: 3, name: "paleo", element: <span>paleo</span> },
			{ id: 4, name: "carnivore", element: <span>carnivore</span> },
			{ id: 5, name: "vegetarian", element: <span>vegetarian</span> }
		],
		isLoading: false
	};

	handlePreferencesKeyPress = e => {
		if (e.key === "Enter") {
			e.stopPropagation();
			e.preventDefault();

			let optionsLen = this.state.preferencesOptions.length;
			const newIngredient = {
				id: ++optionsLen,
				name: e.target.value,
				element: <span>{e.target.value}</span>
			};

			let preferencesOptions = [
				...this.state.preferencesOptions,
				newIngredient
			];
			let preferencesTokens = [
				...this.state.preferencesTokens,
				newIngredient.id
			];

			this.setState({ preferencesOptions, preferencesTokens });
		}
	};

	handleIngredientKeyPress = e => {
		if (e.key === "Enter") {
			e.stopPropagation();
			e.preventDefault();

			let optionsLen = this.state.ingredientsOptions.length;
			const newIngredient = {
				id: ++optionsLen,
				name: e.target.value,
				element: <span>{e.target.value}</span>
			};

			let ingredientsOptions = [
				...this.state.ingredientsOptions,
				newIngredient
			];
			let ingredientTokens = [...this.state.ingredientTokens, newIngredient.id];

			this.setState({ ingredientsOptions, ingredientTokens });
		}
	};

	selectedPreferencesToken = e => {
		let tokens = e.target.value;
		let selectedPreferences = [];
		let copy = [...tokens];
		const preferencesIndex = copy.pop();
		let result = this.state.preferencesOptions.filter(
			x => x.id === selectedPreferences
		);
		if (result.length) {
			selectedPreferences = [...this.state.selectedPreferences, result[0].name];
		} else {
			selectedPreferences.pop();
		}

		this.setState({ preferencesTokens: tokens, selectedPreferences });
	};

	selectIngredientToken = e => {
		let tokens = e.target.value;
		let selectedIngredients = [];
		let copy = [...tokens];
		const ingredientIndex = copy.pop();
		let result = this.state.ingredientsOptions.filter(
			x => x.id === ingredientIndex
		);

		if (result.length) {
			selectedIngredients = [...this.state.selectedIngredients, result[0].name];
		} else {
			selectedIngredients.pop();
		}

		this.setState({ ingredientTokens: tokens, selectedIngredients });
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
			recipeName: e.target.value
		});
	};

	onTextFieldInput = e => {
		this.setState({
			recipeSteps: e.target.value
		});
	};

	onSubmitForm = e => {
		e.preventDefault();
		let form = serialize(e.target, { hash: true });
		console.log(form, "?????");
	};

	imageSelected = files => {
		const image = files[0];

		console.log("touched this!");

		// TODO: create recipe
	};

	render() {
		const {
			handleSubmit,
			pristine,
			reset,
			submitting,
			userReducer
		} = this.props;
		console.log(this.state, "selected ingredients");
		return (
			<div className="create-recipe">
				<form onSubmit={this.onSubmitForm}>
					<p className="label">Create your own recipe</p>
					{!userReducer.recipeImage ? (
						<div
							className="user-recipe-img-default"
							style={{ margin: "0 auto" }}
						/>
					) : (
						<div
							className="user-recipe-img-custom"
							style={{ margin: "0 auto" }}
						>
							<img src={userReducer.recipeImage} />
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
									hintText={"recipe name"}
									floatingLabelText={"name of your recipe"}
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
								name="ingredients"
								isLoading={this.state.isLoading}
								value={this.state.ingredientTokens}
								placeholder="pick ingredient"
								options={this.state.ingredientsOptions}
								onSelect={this.selectIngredientToken}
								onKeyPress={this.handleIngredientKeyPress}
								color="blue"
							/>
							<InputToken
								name="preferences"
								isLoading={this.state.isLoading}
								value={this.state.preferencesTokens}
								placeholder="pick preferences"
								options={this.state.preferencesOptions}
								onSelect={this.selectedPreferencesToken}
								onKeyPress={this.handlePreferencesKeyPress}
								color="orange"
							/>
						</div>

						<div className="wrapper">
							<div className="paper">
								<textarea
									placeholder="explain the steps needed to get the delicious creation :)"
									className="text"
									name="instructions"
									rows="4"
									style={{
										overflow: "scroll",
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
	userActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CreateRecipe)
);
