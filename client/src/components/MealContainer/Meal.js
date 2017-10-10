import React from "react";
import { PaperList } from "../UsersContainer/PaperList";

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
          <PaperList users={regGuests} />{" "}
        </div>
      : null}
    {unregGuests
      ? <div>
          <p>Also attending</p>
          <ul>
            {unregGuests.map(guest =>
              <li key={guest}>
                {guest}
              </li>
            )}
          </ul>
        </div>
      : null}
  </div>;

const Tasks = ({ tasks }) =>
  <div>
    {tasks
      ? <ul>
          {tasks.map((task, index) =>
            <li key={index}>
              {task}
            </li>
          )}
        </ul>
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
      <img src={meal.image} />
      <h3>
        This delicious meal hosted by {meal.owner.username}
      </h3>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Guests regGuests={regGuests} unregGuests={unregGuests} />
        <Tasks tasks={meal.tasks} />
      </div>
    </div>
  );
};

export default Meal;
