import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import "./App.css";
import Landing from "../Landing";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Landing />
      </MuiThemeProvider>
    );
  }
}

export default App;
