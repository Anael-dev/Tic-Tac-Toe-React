import React, { Component } from "react";
import MyContext from "./MyContext";

import winCup from "./winner/winner1.png";

class Player extends Component {
  constructor() {
    super();
  }

  render() {
    let winImg;
    let title;
    if (this.props.winner === this.props.playerNum) {
      winImg = (
        <div className="winner-cup">
          <img src={winCup} alt="win-cup" />
        </div>
      );
      title = "winner!";
    } else {
      title = `player ${this.props.playerNum}`;
    }
    return (
      <MyContext.Consumer>
        {(context) => (
          <div>
            <p
              className="icon-title"
              style={{
                backgroundColor: `${
                  context.currPlayer === this.props.playerNum
                    ? "orange"
                    : "rgb(245, 242, 238)"
                }`,
              }}
            >
              {title}
            </p>
            <img
              className="player-icon"
              src={this.props.icon}
              alt="icon-player"
            />
            {winImg}
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Player;
