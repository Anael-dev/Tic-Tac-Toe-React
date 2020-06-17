import React from "react";
import MyContext from "../MyContext";

import winCup from "../images/winner.png";

const Player = (props) => {
  return (
    <MyContext.Consumer>
      {(context) => (
        <div>
          <p
            className="icon-title"
            style={{
              backgroundColor: `${
                context.currPlayer === props.playerNum
                  ? "orange"
                  : "rgb(245, 242, 238)"
              }`,
            }}
          >
            {props.winner === props.playerNum
              ? "winner!"
              : `player ${props.playerNum}`}
          </p>
          <img className="player-icon" src={props.icon} alt="icon-player" />
          {props.winner === props.playerNum ? (
            <div className="winner-cup">
              <img src={winCup} alt="win-cup" />
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </MyContext.Consumer>
  );
};

export default Player;
