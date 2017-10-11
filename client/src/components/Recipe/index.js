import React from "react";
import "./Recipe.css";
import PaperList from "../PaperList";

const Recipe = ({ recipe }) => (
  <div className="recipe-container">
    <h1>{recipe.name}</h1>
    <p>
      From the kitchen of <a href={recipe.url}>{recipe.source}</a>
    </p>
    <img src={recipe.image} alt="" />
    <h2>Serves {recipe.serves} hungry people</h2>
    <button>Save this recipe!</button>
    <p>Calories: {Math.floor(recipe.calories)}</p>
    <div className="flex-col" style={{ width: "100%" }}>
      <div className="flex-row" style={{ justifyContent: "center" }}>
        <PaperList title={"Ingredients"} data={recipe.ingredients} />
        <PaperList title={"Health Stuff"} data={recipe.preferences} />
      </div>
      <div className="table-wrapper">
        <div className="table">
          <div className="row header">
            <div className="cell">Tag</div>
            <div className="cell">Total</div>
            <div className="cell">Daily</div>
          </div>
          {recipe.digest.slice(0, 9).map(nut => (
            <div key={nut.label} className="row">
              <div className="cell">{nut.label}</div>
              <div className="cell">{Math.floor(nut.total)}</div>
              <div className="cell">{Math.floor(nut.daily)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
export default Recipe;
