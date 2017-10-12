import React, { Component } from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentRemove from "material-ui/svg-icons/content/remove";
import ReactTooltip from "react-tooltip";

import "./Recipe.css";
import PaperList from "../PaperList";
import StarRatingComponent from "react-star-rating-component";

const Recipe = ({
  recipe,
  user,
  addRecipeToUser,
  removeRecipeToUser,
  recipeBelongsToUser,
  onStarClick,
  initialRating,
  showRating
}) =>
  <div className="recipe-container">
    <ReactTooltip
      place="left"
      type="dark"
      effect="float"
      className="recipe-btn-tooltip"
    />
    <h1>
      {recipe.name}
    </h1>
    <p>
      From the kitchen of <a href={recipe.url}>{recipe.source}</a>
    </p>
    <img src={recipe.image} alt="" />
    {showRating
      ? <StarRatingComponent
          name="star-rating"
          value={initialRating}
          starCount={5}
          editing={true}
          onStarClick={onStarClick}
        />
      : null}
    <h2>
      Serves {recipe.serves} hungry people
    </h2>
    {user && user._id
      ? <FloatingActionButton
          data-tip={
            recipeBelongsToUser(user, recipe) ? "remove recipe" : "add recipe"
          }
          mini={false}
          secondary={recipeBelongsToUser(user, recipe)}
          onClick={
            recipeBelongsToUser(user, recipe)
              ? () => removeRecipeToUser(user, recipe)
              : () => addRecipeToUser(user, recipe)
          }
        >
          {recipeBelongsToUser(user, recipe)
            ? <ContentRemove />
            : <ContentAdd />}
        </FloatingActionButton>
      : null}
    <p>
      Calories: {Math.floor(recipe.calories)}
    </p>
    <div className="flex-col" style={{ width: "100%" }}>
      <div className="flex-row" style={{ justifyContent: "center" }}>
        <PaperList title={"Ingredients"} data={recipe.ingredients} />
        <PaperList title={"Health Stuff"} data={recipe.preferences} />
      </div>
          <br />
      <div className="table-wrapper">
        <div className="table">
          <div className="row header">
            <div className="cell">Tag</div>
            <div className="cell">Total</div>
            <div className="cell">Daily</div>
          </div>
          {recipe.digest.slice(0, 9).map(nut =>
            <div key={nut.label} className="row">
              <div className="cell">
                {nut.label}
              </div>
              <div className="cell">
                {Math.floor(nut.total)}
              </div>
              <div className="cell">
                {Math.floor(nut.daily)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>;

export default Recipe;
