import React, { Component } from "react";
import { CssBaseline } from "@material-ui/core";

import Chat from "./pages/Chat";

/** Aplicação principal */
export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Chat />
      </React.Fragment>
    );
  }
}
