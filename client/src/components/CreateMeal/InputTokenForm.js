import React, { Component } from "react";
import _uniq from "lodash/uniq";
import _without from "lodash/without";
import classNames from "classnames";

class TokenInput extends Component {
  static defaultProps = {
    maxLength: 0,
    options: [],
    placeholder: "Choose option",
    value: []
  };

  state = {
    filter: "",
    isOpen: false
  };

  get selected() {
    const { options, value } = this.props;

    return options.filter(option => value.indexOf(option.id) > -1);
  }

  get options() {
    const { options, value } = this.props;
    const { filter } = this.state;

    return options.filter(option => {
      const isSelected = value.indexOf(option.id) > -1;

      if (filter) {
        return !isSelected && new RegExp(filter, "gi").test(option.name);
      }

      return !isSelected;
    });
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  setContainerRef = node => {
    this.container = node;
  };

  handleChange = value => {
    const { name, onSelect } = this.props;

    onSelect({ target: { name, value } });
  };

  handleInput = ({ target: { value: filter } }) => {
    this.setState({ filter });
  };

  handleSelect = selectedId => () => {
    const { value, maxLength } = this.props;
    // if options maxLength reached
    if (maxLength && value.length >= maxLength) return;

    const selected = _uniq(value.concat([selectedId]));
    this.handleChange(selected);
    this.setState({
      filter: "",
      isOpen: false
    });
  };

  // unselect selected option
  handleRemove = removedId => () => {
    const selected = _without(this.props.value, removedId);

    this.handleChange(selected);
  };

  handleClickOutside = ({ target }) => {
    if (!this.container.contains(target)) {
      this.closeDropdown();
    }
  };

  closeDropdown = () => {
    if (this.state.isOpen) {
      this.setState({ filter: "", isOpen: false });
    }
  };

  openDropdown = () => {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true });
    }
  };

  render() {
    const { filter, isOpen } = this.state;
    const {
      className,
      disabled,
      id,
      isLoading,
      loaderElement,
      maxLength,
      name,
      placeholder,
      value,
      onKeyPress,
      errorType
    } = this.props;
    const isMaxLengthReached =
      maxLength !== 0 && value.length !== 0 && maxLength === value.length;

    return (
      <div
        ref={this.setContainerRef}
        className={classNames("ReactTokenInput", {
          "ReactTokenInput--disabled": disabled,
          "ReactTokenInput--is-loading": isLoading,
          "ReactTokenInput--maxlength": isMaxLengthReached,
          "ReactTokenInput--open": isOpen,
          [className]: className
        })}
      >
        {this.selected.map(this.renderSelectedToken)}
        {!isMaxLengthReached && (
          <div className="ReactTokenInput__input-col">
            <input
              autoComplete="off"
              className="ReactTokenInput__input"
              disabled={disabled}
              id={id}
              name={name}
              onChange={this.handleInput}
              placeholder={placeholder}
              spellCheck="false"
              value={filter}
              onFocus={this.openDropdown}
              onKeyPress={onKeyPress}
            />
            <div className="ReactTokenInput__options-list">
              {isLoading &&
                (loaderElement || (
                  <span className="ReactTokenInput__loading-label">
                    Loading...
                  </span>
                ))}
              {this.options.length ? (
                this.options.map(this.renderOption)
              ) : (
                errorType === 'recipe' ? <div className="text-muted p-1">
                  No recipes left! Add recipes via the search page :)
                </div> : <div className="text-muted p-1">
                  No guests found. Invite more people to use the app!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  renderOption = option => {
    return (
      <div
        key={`option-${option.id}-${Math.floor(Math.random() * 99)}`}
        className="ReactTokenInput__option"
        onClick={this.handleSelect(option.id)}
      >
        {option.element || option.name}
      </div>
    );
  };

  renderSelectedToken = selected => {
    const { color } = this.props;

    return (
      <div
        key={`token_${selected.id}-${Math.floor(Math.random() * 99)}`}
        className={
          color === "blue"
            ? "ReactTokenInput__token"
            : "ReactTokenInput__token-orange"
        }
      >
        <span className="icon-times" onClick={this.handleRemove(selected.id)}>
          &times;
        </span>
        {selected.name}
      </div>
    );
  };
}

export default TokenInput;

/**
 * To handle creating a new item if none are found
 * Do not delete code below please
 */

// const handleUsersKeyPress = e => {
//   if (e.key === "Enter") {
//     e.stopPropagation();
//     e.preventDefault();

//     let optionsLen = this.state.userOptions.length;
//     const newUser = {
//      id: ++optionsLen,
//      name: e.target.value,
//      element: <span>{e.target.value}</span>
//     };

//     let userOptions = [
//       ...this.state.userOptions
//       // newUser
//     ];
//     let userTokens = [
//       ...this.state.userTokens
//       // newUser.id
//     ];

//     this.setState({ userOptions, userTokens });
//   }
// };

// const selectRecipeToken = e => {
//   let tokens = e.target.value;
//   let selectedRecipes = [];
//   let copy = [...tokens];
//   const recipeIndex = copy.pop();
//   let result = this.state.recipeOptions.filter(
//     x => x.id === recipeIndex
//   );

//   if (result.length) {
//     selectedRecipes = [...this.state.selectedRecipes, result[0].name];
//   } else {
//     selectedRecipes.pop();
//   }

//   this.setState({ recipeTokens: tokens, selectedRecipes });
// };