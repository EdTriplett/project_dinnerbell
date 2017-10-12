import React from "react";
import UsersList from "../UsersContainer/UsersList";
import PaperList from "../PaperList";
import Paper from "material-ui/Paper";
import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import { Link } from "react-router-dom";
import "./Meal.css";

const Recipes = ({ recipes = [] }) => (
  <List>
    {recipes.map(recipe => (
      <Link
        to={`/recipes/${recipe._id}`}
        key={recipe._id}
        style={{ textDecoration: "none" }}
      >
        <ListItem
          primaryText={recipe.name}
          leftAvatar={<Avatar src={recipe.image} />}
        />
      </Link>
    ))}
  </List>
);

const Tasks = ({ tasks = [] }) => (
  <List>
    {tasks.map(task => <ListItem key={task._id} primaryText={task} />)}
  </List>
);

const Attending = ({ guests = [] }) => (
  <List>
    {guests.map(user => (
      <Link
        to={`/profile/${user._id}`}
        key={user._id}
        style={{ textDecoration: "none" }}
      >
        <ListItem
          primaryText={user.username}
          leftAvatar={<Avatar src={user.profilePicture} />}
        />
      </Link>
    ))}
  </List>
);

const MealList = ({ title, children }) => (
  <div className="single-meal-card-column">
    <div className="single-meal-card">
      <span className="single-meal-card-tape" />
      <span className="single-meal-card-title">{title}</span>
      {children}
    </div>
  </div>
);

const Meal = ({ meal }) => {
  const pic = !meal.owner.profilePicture
    ? "single-meal-host-default"
    : "single-meal-host-custom";

  return (
    <div className="single-meal-container">
      <h1 className="single-meal-title">{meal.name}</h1>
      {meal.image && (
        <img src={meal.image} alt="meal" className="single-meal-image" />
      )}
      <Link
        to={`/profile/${meal.owner._id}`}
        key={meal.owner._id}
        style={{ textDecoration: "none" }}
      >
        <div className="single-meal-host">
          <div className={pic}>
            <img src={meal.owner.profilePicture} alt="" />
          </div>
          <div className="single-meal-host-name">
            <small>hosted by:</small> {meal.owner.username}
          </div>
        </div>
      </Link>
      <div className="single-meal-card-container">
        <MealList title="Attending">
          <Attending guests={meal.registeredGuests} />
        </MealList>
        <MealList title="Tasks">
          <Tasks tasks={meal.tasks} />
        </MealList>
        <MealList title="Recipes">
          <Recipes recipes={meal.recipes} />
        </MealList>
      </div>
    </div>
  );
};

export default Meal;
