import React, { Component } from "react";
import Row from "./Row";
import Player from "./Player";
import MyContext from "../MyContext";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import "../css/Board.css";

class Board extends Component {
  constructor() {
    super();
    this.state = {
      rows: [
        [{ cell: 1 }, { cell: 2 }, { cell: 3 }],
        [{ cell: 1 }, { cell: 2 }, { cell: 3 }],
        [{ cell: 1 }, { cell: 2 }, { cell: 3 }],
      ],
      currPlayer: 1,
      isGame: true,
      gameStatus: "",
      winner: "",
    };
  }

  changePlayer = () => {
    const temp = this.state.currPlayer;
    if (temp === 1) {
      this.setState({ currPlayer: 2 });
    } else {
      this.setState({ currPlayer: 1 });
    }
  };

  addPlayerCell = async (rowNum, cellNum) => {
    const allRows = this.state.rows;
    const row = allRows[rowNum];
    const cell = row.find((x) => x.cell === cellNum);
    cell.player = this.state.currPlayer;
    await this.setState({ rows: allRows });

    //check diagonal
    if (
      //check middle cell
      allRows[1].find(
        (x) => x.cell === 2 && x.player === this.state.currPlayer
      ) &&
      //check 3 rows with same player cells
      allRows.filter((row) =>
        row.some((x) => x.player === this.state.currPlayer)
      ).length === allRows.length
    ) {

      if (
        //check one diagonal
        allRows[0].find(
          (x) => x.cell === 1 && x.player === this.state.currPlayer
        ) &&
        allRows[2].find(
          (x) => x.cell === 3 && x.player === this.state.currPlayer
        )
      ) {
        this.stopGame();
        const cell1 = allRows[0].find((x) => x.cell === 1);
        cell1.check = true;
        const cell2 = allRows[1].find((x) => x.cell === 2);
        cell2.check = true;
        const cell3 = allRows[2].find((x) => x.cell === 3);
        cell3.check = true;
        await this.setState({ rows: allRows });
        this.playerWon();
        return;
      }

      //check second diagonal
      if (
        allRows[0].find(
          (x) => x.cell === 3 && x.player === this.state.currPlayer
        ) &&
        allRows[2].find(
          (x) => x.cell === 1 && x.player === this.state.currPlayer
        )
      ) {
        this.stopGame();
        const cell3 = allRows[0].find((x) => x.cell === 3);
        cell3.check = true;
        const cell2 = allRows[1].find((x) => x.cell === 2);
        cell2.check = true;
        const cell1 = allRows[2].find((x) => x.cell === 1);
        cell1.check = true;
        this.playerWon();
        return;
      }
    }

    //check row
    if (row.every((x) => x.player === this.state.currPlayer)) {
      this.stopGame();
      row.forEach((cell) => {
        cell.check = true;
      });
      await this.setState({ rows: allRows });
      this.playerWon();
      return;
    }

    //check column
    if (
      allRows.every((row) =>
        row.find(
          (x) => x.cell === cellNum && x.player === this.state.currPlayer
        )
      )
    ) {
      allRows.forEach((row) => {
        const cells = row.filter(
          (x) => x.cell === cellNum && x.player === this.state.currPlayer
        );
        cells.map((cell) => (cell.check = true));
      });
      await this.setState({ rows: allRows });
      this.stopGame();
      this.playerWon();
      return;
    }

    //check draw
    if (allRows.every((row) => row.every((cell) => cell.player))) {
      this.stopGame();
      this.setState({ gameStatus: "It's a draw!", winner: "" });
      return;
    }

    ///keep playing
    else {
      this.changePlayer();
    }
  };

  ///finish game
  stopGame = () => {
    this.setState({ isGame: false });
  };

  ///winner
  playerWon = async () => {
    await this.setState({ winner: this.state.currPlayer });
    this.setState({
      gameStatus: `Player ${this.state.winner} is the winner!`,
    });
  };

  ///renew game
  restartGame = () => {
    this.setState({
      rows: [
        [{ cell: 1 }, { cell: 2 }, { cell: 3 }],
        [{ cell: 1 }, { cell: 2 }, { cell: 3 }],
        [{ cell: 1 }, { cell: 2 }, { cell: 3 }],
      ],
      currPlayer: 1,
      isGame: true,
      gameStatus: "",
      winner: "",
    });
  };

  ///make rows
  renderRows = () => {
    let rowsArr = [];
    this.state.rows.forEach((row, index) =>
      rowsArr.push(
        <Row
          key={index}
          rowNum={index}
          rowData={row}
          addPlayerCell={(rowNum, cellNum) =>
            this.addPlayerCell(rowNum, cellNum)
          }
        />
      )
    );
    return rowsArr;
  };

  backToMain = () => {
    this.props.history.push("/main");
  };

  render() {
    let playAgain = "Reset Game";
    if (this.state.gameStatus) {
      playAgain = "New Game";
    }

    let drawStatus;
    if (this.state.gameStatus === "It's a draw!") {
      drawStatus = <h1 className="status">{this.state.gameStatus}</h1>;
    }

    return (
      <MyContext.Provider
        value={{
          currPlayer: this.state.currPlayer,
          isGame: this.state.isGame,
          cells: this.state.cells,
        }}
      >
        <div className="container-game">
          <Player
            playerNum={1}
            icon={sessionStorage["player1"]}
            winner={this.state.winner}
          />
          <div className="board-section">
            <div className="flex">
              {drawStatus}
              <ButtonGroup>
                <Button
                  size="medium"
                  onClick={() => this.restartGame()}
                  variant="contained"
                  color="primary"
                >
                  {playAgain}
                </Button>
                <Button
                  color="primary"
                  size="medium"
                  variant="outlined"
                  onClick={() => this.backToMain()}
                >
                  New Players
                </Button>
              </ButtonGroup>
            </div>
            <div className="board">{this.renderRows()} </div>
          </div>
          <Player
            playerNum={2}
            icon={sessionStorage["player2"]}
            winner={this.state.winner}
          />
        </div>
      </MyContext.Provider>
    );
  }
}

export default Board;
