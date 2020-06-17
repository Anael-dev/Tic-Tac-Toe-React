import React from "react";
import Cell from "./Cell";

const Row = (props) => {
  const handleClick = (cellNum) => {
    console.log("triggered");
    props.addPlayerCell(props.rowNum, cellNum);
  };

  return (
    <div className="row">
      {props.rowData.map((x, i) => {
        return (
          <Cell
            key={i}
            cellNum={x.cell}
            cellData={x}
            clickCallback={(cellNum, playerNum) =>
              handleClick(cellNum, playerNum)
            }
          />
        );
      })}
    </div>
  );
};

export default Row;
