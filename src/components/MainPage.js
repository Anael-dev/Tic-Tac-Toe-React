import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import logo from "../images/logo.png";
import Board from "./Board";
import LandingPage from "./LandingPage";

import "../css/MainPage.css";

class MainPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="container">
          <img src={logo} className="logo" alt="logo-game" />
          <h2>Tic Tac Toe</h2>
        </div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/game" component={Board} />
          <Route path="/main" component={LandingPage} />
        </Switch>
      </div>
    );
  }
}

export default MainPage;
