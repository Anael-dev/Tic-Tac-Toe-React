import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import "../css/LandingPage.css";

import hero1 from "../images/heroes/1.png";
import hero2 from "../images/heroes/2.png";
import hero3 from "../images/heroes/3.png";
import hero4 from "../images/heroes/4.png";
import hero5 from "../images/heroes/5.png";
import hero6 from "../images/heroes/6.png";

const LandingPage = (props) => {
  const [heroes] = useState([
    hero1,
    hero2,
    hero3,
    hero4,
    hero5,
    hero6,
  ]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [gameReady, setGameReady] = useState(false);

  const selectPlayer = (hero) => {
    if (!player1) {
      setPlayer1(hero);
    } else {
      setPlayer2(hero);
      setGameReady(!gameReady);
    }
  };

  const selectAgain = () => {
    setPlayer1("");
    setPlayer2("");
    setGameReady(!gameReady);
  };

  const startGame = () => {
    sessionStorage["player1"] = player1;
    sessionStorage["player2"] = player2;
    props.history.push("/game");
  };

  return (
    <div>
      <div className="flex header-section">
        {!gameReady ? (
          <p>Select Hero {!player1 ? "1" : "2"}</p>
        ) : (
          <p>
            <span className="under-lined">Are You Ready?</span>
          </p>
        )}
      </div>
      <div className="heroes">
        {heroes.map((x) => {
          return (
            <img
              className={`  ${
                player1 === x || player2 === x ? "selected" : "hero"
              } ${gameReady && "no-click"}  `}
              key={x}
              src={x}
              alt={x}
              onClick={() => selectPlayer(x)}
            />
          );
        })}
      </div>
      {gameReady && (
        <ButtonGroup
          className="buttons"
          aria-label="outlined primary button group"
          color="primary"
        >
          <Button variant="contained" onClick={() => startGame()}>
            Start Game
          </Button>
          <Button variant="outlined" onClick={() => selectAgain()}>
            Choose Again
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export default LandingPage;
