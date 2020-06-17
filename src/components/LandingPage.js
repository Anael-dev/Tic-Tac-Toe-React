import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import "../css/LandingPage.css";

import hero1 from "../images/heroes/1.png";
import hero2 from "../images/heroes/2.png";
import hero3 from "../images/heroes/3.png";
import hero4 from "../images/heroes/4.png";
import hero5 from "../images/heroes/5.png";
import hero6 from "../images/heroes/6.png";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      heroes: [hero1, hero2, hero3, hero4, hero5, hero6],
      player1: "",
      player2: "",
    };
  }

  selectPlayer = (hero) => {
    if (!this.state.player1) {
      this.setState({ player1: hero });
    } else {
      this.setState({ player2: hero });
    }
  };

  selectAgain = () => {
    this.setState({ player1: "", player2: "" });
  };

  startGame = () => {
    sessionStorage["player1"] = this.state.player1;
    sessionStorage["player2"] = this.state.player2;
    this.props.history.push("/game");
  };
  render() {
    let noSelect;
    let selecetQuote;

    if (!this.state.player1) {
      selecetQuote = <p>Select Hero 1</p>;
    } else if (!this.state.player2) {
      selecetQuote = <p>Select Hero 2</p>;
    }

    let buttonsStart;
    if (this.state.player1 && this.state.player2) {
      noSelect = "no-click";
      selecetQuote = (
        <p>
          <span className="under-lined">Are You Ready?</span>
        </p>
      );
      buttonsStart = (
        <ButtonGroup
          className="buttons"
          aria-label="outlined primary button group"
          color="primary"
        >
          <Button variant="contained" onClick={() => this.startGame()}>
            Start Game
          </Button>
          <Button variant="outlined" onClick={() => this.selectAgain()}>
            Choose Again
          </Button>
        </ButtonGroup>
      );
    }

    let heroes = this.state.heroes.map((x) => {
      return (
        <img
          className={`  ${
            this.state.player1 === x || this.state.player2 === x
              ? "selected"
              : "hero"
          } ${noSelect}  `}
          key={x}
          src={x}
          alt={x}
          onClick={() => this.selectPlayer(x)}
        />
      );
    });

    return (
      <div>
        <div className="flex header-section">{selecetQuote}</div>
        <div className="heroes">{heroes}</div>
        {buttonsStart}
      </div>
    );
  }
}

export default LandingPage;
