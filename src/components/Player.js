import React from "react";
import MyContext from "../MyContext";
import winCup from "../images/winner.png";

import "../css/Player.css";
const Player = (props) => {
  return (
    <MyContext.Consumer>
      {(context) => (
        <div className='container-player'>
          <p
            className='player-title'
            style={{
              backgroundColor: `${
                context.currPlayer === props.playerNum
                  ? "orange"
                  : "rgb(245, 242, 238)"
              }`,
            }}>
            {props.winner === props.playerNum
              ? "winner!"
              : `player ${props.playerNum}`}
          </p>
          <div className='icon-section'>
            <img
              className='icon player-icon'
              src={props.icon}
              alt='icon-player'
            />
            {props.winner === props.playerNum && (
              <img className='icon winner-cup' src={winCup} alt='win-cup' />
            )}
          </div>
        </div>
      )}
    </MyContext.Consumer>
  );
};

export default Player;
