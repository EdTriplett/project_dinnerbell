import React, { Component } from "react";
import { PaperList } from "../UsersContainer/PaperList";
import Dialog from "material-ui/Dialog";
import Recipe from "../Recipe";

const styles = {
  background: "#3c8d41",
  top: "75px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "25px",
  color: "white",
  fontFamily: "'Open Sans', sans-serif",
  width: "100%"
};

class Meal extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { meal } = this.props;

    // ({ meal }) => {
    let registeredGuests = [];
    let unregisteredGuests = [];
    if (meal.registeredGuests.length)
      registeredGuests = registeredGuests.concat(meal.registeredGuests);
    if (meal.unregisteredGuests.length)
      unregisteredGuests = unregisteredGuests.concat(meal.unregisteredGuests);

    return (
      <div style={styles}>
        {console.log(meal)}
        <h1 style={{ fontSize: "3em" }}>
          {meal.name}
        </h1>
        <img src={meal.image} />
        <h3>
          This delicious meal hosted by {meal.owner.username}
        </h3>
        {registeredGuests
          ? <div>
              <p>Attending</p>
              <PaperList users={registeredGuests} />{" "}
            </div>
          : null}
        {unregisteredGuests
          ? <div>
              <p>Also attending</p>
              <ul>
                {unregisteredGuests.map(guest =>
                  <li key={guest}>
                    {guest}
                  </li>
                )}
              </ul>
            </div>
          : null}
        {meal.recipes.map(recipe =>
          <div key={recipe._id}>
            <h3 onClick={this.handleOpen}>
              {recipe.name}test
            </h3>
            <Dialog title={recipe.name} modal={true} open={this.state.open}>
              <Recipe recipe={recipe} />
            </Dialog>
          </div>
        )}
      </div>
    );
  }
}

export default Meal;
