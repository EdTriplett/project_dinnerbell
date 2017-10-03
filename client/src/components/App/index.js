import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import "./App.css";
import Landing from "../Landing";
import Navbar from "../Navbar";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Navbar />
        <Landing />
      </MuiThemeProvider>
    );
  }
}

export default App;
