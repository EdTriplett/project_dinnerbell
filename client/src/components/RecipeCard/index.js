import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardMedia } from "material-ui";
import StarRatingComponent from "react-star-rating-component";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

const RecipeCard = ({
  recipe,
  user,
  addRecipeToUser,
  recipeBelongsToUser,
  index
}) =>
  <Card className={`recipe-card delay-${index}`} key={recipe.edamamId}>
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
    {user && user._id && !recipeBelongsToUser(user, recipe)
      ? <FloatingActionButton onClick={() => addRecipeToUser(user, recipe)}>
          <ContentAdd />
        </FloatingActionButton>
      : null}
  </Card>;

export default RecipeCard;
