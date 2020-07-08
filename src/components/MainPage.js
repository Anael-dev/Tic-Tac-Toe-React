import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import logo from "../images/logo.png";
import Board from "./Board";
import LandingPage from "./LandingPage";

import "../css/MainPage.css";

const MainPage = () => {
  return (
    <>
      <header>
        <div className='container container-header'>
          <h1 className='header-title'>Tic Tac Toe</h1>
          <img src={logo} className='header-logo' alt='logo-game' />
        </div>
      </header>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/game' component={Board} />
        <Route path='/main' component={LandingPage} />
      </Switch>
    </>
  );
};

export default MainPage;
