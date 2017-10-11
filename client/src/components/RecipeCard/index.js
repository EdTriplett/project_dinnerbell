import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardMedia } from "material-ui";
import StarRatingComponent from "react-star-rating-component";
import FloatingActionButton from "material-ui/FloatingActionButton";
// import FlatButton from 'material-ui/FlatButton';
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentRemove from "material-ui/svg-icons/content/remove";

import "./RecipeCard.css";

const RecipeCard = ({
  recipe,
  user,
  addRecipeToUser,
  removeRecipeToUser,
  recipeBelongsToUser,
  index
}) =>
  <Card className={`recipe-card delay-${index}`}>
    <Link to={`/recipes/${recipe.edamamId}`}>
      <CardMedia>
        <img src={recipe.image} alt="" />
      </CardMedia>
      <CardTitle className="card-title">
        {recipe.name}
      </CardTitle>
      <StarRatingComponent
        className="star-rating"
        name="rating"
        value={Math.floor(Math.random() * 5)}
        editing={false}
      />
    </Link>
    {user && user._id
      ? <FloatingActionButton
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
          {recipeBelongsToUser(user, recipe)
            ? <ContentRemove />
            : <ContentAdd />}
        </FloatingActionButton>
      : null}
  </Card>;

export default RecipeCard;
