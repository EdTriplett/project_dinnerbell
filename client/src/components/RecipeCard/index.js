import React from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardMedia } from "material-ui";
import StarRatingComponent from "react-star-rating-component";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";

const RecipeCard = ({ recipe, index }) =>
  <Card
    className={`recipe-card delay-${index}`}
    key={recipe.edamamId}
    showExpandableButton={true}
  >
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
    <FloatingActionButton mini={true}>
      <ContentAdd />
    </FloatingActionButton>
  </Card>;

export default RecipeCard;
