import React from "react";
import MyContext from "../MyContext";

const Cell = (props) => {
  const handleClick = async (currPlayer) => {
    console.log("clicked");
    props.clickCallback(props.cellNum, currPlayer);
  };

  return (
    <MyContext.Consumer>
      {(context) => (
        <div
          style={{
            backgroundImage: `url(${
              props.cellData.player &&
              sessionStorage[`player${props.cellData.player}`]
            })`,
          }}
          className={`cell ${props.cellData.player && "player"} ${
            !context.isGame && "no-click"
          } ${props.cellData.check ? "check-cell" : "uncheck-cell"}`}
          onClick={() => handleClick(context.currPlayer)}
        ></div>
      )}
    </MyContext.Consumer>
  );
};

export default Cell;
