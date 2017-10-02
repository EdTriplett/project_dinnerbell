import React, { Component } from "react";
import { Paper } from "material-ui";

const style = {
  height: 100,
  width: 100,
  display: "inline-block"
};

const Landing = () => {
  return (
    <section>
      <h1>Dinnerbell</h1>
      <Paper style={style}>
        <img
          src="https://www.bellamysorganic.com.au/blog/wp-content/uploads/2013/12/understanding-the-health-benefits-of-organic-food-1.jpg"
          style={{ width: 80, height: "auto" }}
        />
        <p>some text</p>
      </Paper>
      <Paper style={style}>
        <img
          src="./restaurant-eating.jpg"
          style={{ width: 80, height: "auto" }}
        />
      </Paper>
      <img
        src="./restaurant-eating.jpg"
        style={{ width: 80, height: "auto" }}
      />
      <Paper style={style}>
        <img
          src="./sprig-organic-meal.jpg"
          style={{ width: 80, height: "auto" }}
        />
      </Paper>
    </section>
  );
};

export default Landing;
