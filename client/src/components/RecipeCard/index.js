import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardMedia } from "material-ui";
import StarRatingComponent from "react-star-rating-component";
import FloatingActionButton from "material-ui/FloatingActionButton";
// import FlatButton from 'material-ui/FlatButton';
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentRemove from "material-ui/svg-icons/content/remove";
import ReactTooltip from 'react-tooltip'

import "./RecipeCard.css";

const RecipeCard = ({
  recipe,
  user,
  addRecipeToUser,
  removeRecipeToUser,
  recipeBelongsToUser,
  index
}) => (
  <Card className={`recipe-card delay-${index}`}>
    <ReactTooltip place="left" type="dark" effect="float" className="recipe-btn-tooltip" />
    <Link to={`/recipes/${recipe.edamamId}`}>
      <CardMedia>
        <img src={recipe.image} alt="" />
      </CardMedia>
      <CardTitle className="card-title">{recipe.name}</CardTitle>
    </Link>
    {user && user._id ? (
      <FloatingActionButton
        data-tip="Add or remove recipe"
        className="add-button"
        mini={true}
        secondary={recipeBelongsToUser(user, recipe)}
        // style={recipeBelongsToUser(user, recipe) ? removeStyle : addStyle}
        onClick={
          recipeBelongsToUser(user, recipe)
            ? () => removeRecipeToUser(user, recipe)
            : () => addRecipeToUser(user, recipe)
        }
      >
      
        {recipeBelongsToUser(user, recipe) ? <ContentRemove /> : <ContentAdd />}
      </FloatingActionButton>
    ) : null}
  </Card>
);

export default RecipeCard;
