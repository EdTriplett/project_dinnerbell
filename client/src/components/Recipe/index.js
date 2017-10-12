import React, { Component } from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentRemove from "material-ui/svg-icons/content/remove";
import ReactTooltip from "react-tooltip";

import "./Recipe.css";
import PaperList from "../PaperList";
import StarRatingComponent from "react-star-rating-component";

const LINE_NUM = 50;

const createLines = () => {

  for (let i = 0; i < LINE_NUM; i++) {
    return <span></span>
  }
}

const Recipe = ({
  recipe,
  user,
  addRecipeToUser,
  removeRecipeToUser,
  recipeBelongsToUser,
  onStarClick,
  initialRating,
  showRating
}) => <div className="recipe-container">
    <h1>
        {recipe.name}
      </h1>
    <div id="recipe-wrapper">
      <p>
        From the kitchen of <a href={recipe.url}>{recipe.source}</a>
      </p>
      <img src={recipe.image} alt="recipe-image" width="200" />
      {showRating
      ? <div className="star-container"><StarRatingComponent
          name="star-rating"
          value={initialRating}
          starCount={5}
          editing={true}
          onStarClick={onStarClick}
        /></div>
      : null}
    
      <h2>
        Serves {recipe.serves} hungry people
      </h2>
      <p>
        ({Math.floor(recipe.calories)} calories)
      </p>
          {user && user._id
      ? <div className="floating-btn-container"><FloatingActionButton
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
        </FloatingActionButton></div>
      : null}
    </div>

    <div className="notes-group">
      <PaperList title={"Ingredients"} data={recipe.ingredients} />

      <PaperList title={"Dietary Preferences"} data={recipe.preferences} />
    </div>

    <div id="note">
          <span className="scratch"></span>
          <div className="sticky">
            <div className="inner">
              
            <div className="paper">
 
              <b>Table</b>
            </div>
          </div>
        </div>
      </div>




</div>

export default Recipe;



    




    // <div className="flex-col" style={{ width: "100%" }}>

    //   <div className="table-wrapper">
    //     <div className="table">
    //       <div className="row header">
    //         <div className="cell">Tag</div>
    //         <div className="cell">Total</div>
    //         <div className="cell">Daily</div>
    //       </div>
    //       {recipe.digest.slice(0, 9).map(nut =>
    //         <div key={nut.label} className="row">
    //           <div className="cell">
    //             {nut.label}
    //           </div>
    //           <div className="cell">
    //             {Math.floor(nut.total)}
    //           </div>
    //           <div className="cell">
    //             {Math.floor(nut.daily)}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>