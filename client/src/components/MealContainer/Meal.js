import React from "react";

const Meal = ({ meal }) =>
  <div>
    <h1>
      {meal.name}
    </h1>
    <img src={meal.image} alt="meal-img" />
    <h3>
      This delicious meal hosted by {meal.owner.username}
    </h3>
    {meal.registeredGuests || meal.unregisteredGuests
      ? <div>
          <ul>
            {meal.registeredGuests.length
              ? meal.registeredGuests.map(guest =>
                  <li>
                    {guest.username}
                  </li>
                )
              : null}
            {meal.unregisteredGuests.length
              ? meal.unregisteredGuests.map(guest =>
                  <li>
                    {guest.username}
                  </li>
                )
              : null}
          </ul>
        </div>
      : null}
  </div>;

export default Meal;
