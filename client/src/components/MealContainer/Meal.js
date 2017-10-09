import React from "react";

const Meal = ({ meal }) =>
  <div>
    <h1>
      {meal.name}
    </h1>
    <img src={meal.image} />
    <h3>
      This delicious meal hosted by {meal.owner.username}
    </h3>
  </div>;

export default Meal;
