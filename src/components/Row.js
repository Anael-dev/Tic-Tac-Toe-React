import React, { Component } from "react";
import Cell from "./Cell";

class Row extends Component {
  constructor() {
    super();
  }

  handleClick = (cellNum) => {
    this.props.addPlayerCell(this.props.rowNum, cellNum);
  };

  render() {
    let cells = this.props.rowData.map((x, i) => {
      return (
        <Cell
          key={i}
          cellNum={x.cell}
          cellData={x}
          clickCallback={(cellNum, playerNum) =>
            this.handleClick(cellNum, playerNum)
          }
        />
      );
    });
    return <div className="row">{cells}</div>;
  }
}

export default Row;
