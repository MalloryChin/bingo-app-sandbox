import * as React from "react";
import Square from "./Square";

interface BoardProps {
  size: number;
  values: number[];
  selectedValues: boolean[];
  onClick: (i: number) => void;
}

function Board(props: BoardProps) {
  function renderSquare(i: number) {
    return (
      <Square
        key={i}
        value={props.values[i]}
        selected={props.selectedValues[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  function createBoard() {
    let board = [];

    // Outer loop to create parent
    for (let i = 0; i < props.size; i++) {
      let row = [];
      //Inner loop to create children
      for (let j = 0; j < props.size; j++) {
        row.push(renderSquare(i * props.size + j));
      }
      //Create the parent and add the children
      board.push(
        <div key={i} className="board-row">
          {row}
        </div>
      );
    }
    return board;
  }

  return <div>{createBoard()}</div>;
}

export default Board;
