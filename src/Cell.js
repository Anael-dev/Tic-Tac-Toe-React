import React, { Component } from "react";
import MyContext from "./MyContext";

class Cell extends Component {
  constructor() {
    super();
  }

  handleClick = async (currPlayer) => {
    this.props.clickCallback(this.props.cellNum, currPlayer);
  };

  render() {
    let playerImage;
    let selectedClass;
    if (this.props.cellData.player) {
      selectedClass = "player";
      if (this.props.cellData.player === 1) {
        playerImage = sessionStorage["player1"];
      }
      if (this.props.cellData.player === 2) {
        playerImage = sessionStorage["player2"];
      }
    }

    return (
      <MyContext.Consumer>
        {(context) => (
          <div
            style={{ backgroundImage: `url(${playerImage})` }}
            className={`cell ${selectedClass} ${
              context.isGame ? "" : "no-click"
            } ${this.props.cellData.check ? "check-cell" : "uncheck-cell"}`}
            onClick={() => this.handleClick(context.currPlayer)}
          ></div>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Cell;
