import React from "react";
import { UsersList } from "../UsersContainer/UsersList";
import PaperList from "../PaperList";

const styles = {
  background: "#3c8d41",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "25px",
  color: "white",
  fontFamily: "'Open Sans', sans-serif",
  width: "100%"
};

const Guests = ({ unregGuests, regGuests }) =>
  <div>
    {regGuests
      ? <div>
          <p>Attending</p>
          <UsersList users={regGuests} />{" "}
        </div>
      : null}
    {unregGuests.length
      ? <div>
          <PaperList title="others attending" data={unregGuests} />
        </div>
      : null}
  </div>;

const RecipesList = ({ recipes }) => {
  return recipes.length
    ? recipes.map(recipe =>
        <p key={recipe._id}>
          {recipe.name}
        </p>
      )
    : null;
};

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
        This delicious meal hosted by {meal.owner.username}
      </h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Guests regGuests={regGuests} unregGuests={unregGuests} />
        <PaperList title="Tasks" data={meal.tasks} />
      </div>
      <RecipesList recipes={meal.recipes} />
    </div>
  );
};

export default Meal;
