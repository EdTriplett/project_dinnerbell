import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import asyncValidate from "../../services/AsyncValidate";
import TextField from "material-ui/TextField";
import CircularProgress from "material-ui/CircularProgress";

import InputToken from "./InputTokenForm";

import * as userActions from "../../actions/user_actions";

import "./CreateRecipe.css";
import "./InputTokenForm.css";

const validate = values => {
	const errors = {};
	const requiredFields = ["name", "ingredients", "instructions", "serving"];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = "Required";
		}
	});

	return errors;
};

const renderTextField = ({
	input,
	label,
	meta: { touched, error },
	...custom
}) => (
	<TextField
		hintText={label}
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		{...custom}
	/>
);

const styles = {
	right: "25px"
};

class CreateRecipe extends Component {
	state = {
		value: 2,
		tokens: [],
		options: [
			{ id: 1, name: "butter", element: <span>butter</span> },
			{ id: 2, name: "milk", element: <span>milk</span> },
			{ id: 3, name: "apple", element: <span>apple</span> },
			{ id: 4, name: "chestnut", element: <span>tum</span> },
			{ id: 5, name: "nutella", element: <span>tumpok</span> }
		],
		isLoading: false
	};

	handleChange = (event, index, value) => this.setState({ value });

	handleKeyPress = e => {
		if (e.key === "Enter") {
			let optionsLen = this.state.options.length;
			let newIngredient = {
				id: ++optionsLen,
				name: e.target.value,
				element: <span>{e.target.value}</span>
			};

			console.log(newIngredient, "what is this?");

			let options = [...this.state.options, newIngredient];
			console.log(options, "wat this");

			this.setState({
				options: options
			});
		}
	};

	selectToken = ({ target: { value: tokens } }) => {
		this.setState({ tokens });
		console.log({ tokens });
	};

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;
		console.log(pristine, "what is this?");
		return (
			<div className="create-recipe">
				<form>
					<p className="label">Create your own recipe</p>
					<div className="recipe-form-body">
						<div>
							<Field
								autoComplete="off"
								className="material-field"
								name="name"
								component={renderTextField}
								label="name"
								required="required"
							/>
						</div>
						<InputToken
							name="ingredients"
							isLoading={this.state.isLoading}
							value={this.state.tokens}
							placeholder="pick ingredient"
							options={this.state.options}
							onSelect={this.selectToken}
							onKeyPress={this.handleKeyPress}
						/>
						<div className="wrapper">
							<div className="paper">
								<textarea
									placeholder="Explain the steps needed to get the delicious creation :)"
									className="text"
									name="text"
									rows="4"
									style={{
										overflow: "hidden",
										wordWrap: "break-word",
										resize: "none",
										height: "400px"
									}}
								/>
								<br />
							</div>
						</div>
					</div>

					<div className="recipe-login-buttons">
						<button type="submit" disabled={pristine || submitting}>
							submit
						</button>
						<button
							onClick={() => {
								this.props.history.push("/");
							}}
						>
							back
						</button>
						<button
							type="button"
							disabled={pristine || submitting}
							onClick={reset}
						>
							clear
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

CreateRecipe = connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);

export default reduxForm({
	form: "CreateRecipeForm",
	validate,
	asyncValidate
})(withRouter(CreateRecipe));
