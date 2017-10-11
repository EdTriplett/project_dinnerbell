import React from "react";
import { UsersList } from "../UsersContainer/UsersList";
import PaperList from "../PaperList";
import Paper from "material-ui/Paper";

const styles = {
  background: "#3c8d41",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "25px",
  color: "white",
  fontFamily: "'Open Sans', sans-serif",
  width: "100%",
  height: "100%"
};

const Guests = ({ unregGuests, regGuests }) =>
  <div>
    {regGuests
      ? <div>
          <UsersList users={regGuests} title="Attending" />
        </div>
      : null}
    {unregGuests.length
      ? <div>
          <PaperList title="others attending" data={unregGuests} />
        </div>
      : null}
  </div>;

const RecipesList = ({ recipes }) =>
  <div>
    <h3 style={{ textAlign: "center", margin: 0, paddingTop: "10px" }}>
      Recipes
    </h3>
    {recipes.length
      ? recipes.map(recipe =>
          <p key={recipe._id}>
            {recipe.name}
          </p>
        )
      : null}
  </div>;
const Meal = ({ meal }) => {
  let regGuests = [];
  let unregGuests = [];
  if (meal.registeredGuests.length)
    regGuests = regGuests.concat(meal.registeredGuests);
  if (meal.unregisteredGuests.length)
    unregGuests = unregGuests.concat(meal.unregisteredGuests);

  return (
    <div style={styles}>
      <h1 style={{ fontSize: "3em" }}>
        {meal.name}
      </h1>

      <img
        src={meal.image}
        alt="meal"
        style={{ width: "300px", borderRadius: "300px" }}
      />
      <h3>
        hosted by {meal.owner.username}
      </h3>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <Guests regGuests={regGuests} unregGuests={unregGuests} />
        <PaperList title="Tasks" data={meal.tasks} />
        <Paper zDepth={4} style={{ borderRadius: "25px" }}>
          <RecipesList recipes={meal.recipes} />
        </Paper>
      </div>
    </div>
  );
};

export default Meal;
