import * as React from "react";
import Overlay from "./Overlay";
import { OverlayTheme } from "./Overlay";
import Board from "./Board";
import InputForm from "./InputForm";

interface GameProps {
  size: number;
}

function Game(props: GameProps) {
  const boardSize = props.size * props.size;
  const [values, setValues] = React.useState(randomNumbers(boardSize));
  const [selectedValues, setSelectedValues] = React.useState(
    Array(boardSize).fill(false)
  );

  function handleClick(i: number) {
    const newSelectedValues = selectedValues.slice();
    newSelectedValues[i] = true;
    setSelectedValues(newSelectedValues);
  }

  function restart() {
    setValues(randomNumbers(boardSize));
    setSelectedValues(Array(boardSize).fill(false));
  }

  return (
    <div className="game">
      <OverlayTheme.Provider value={bingo(props.size, selectedValues)}>
        <Overlay onClick={() => restart()} />
      </OverlayTheme.Provider>
      <div className="game-main">
        <InputForm values={values} onClick={(i: number) => handleClick(i)} />
        <Board
          size={props.size}
          values={values}
          selectedValues={selectedValues}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
    </div>
  );
}

export default Game;

// ===============Helpers===================

function bingo(size: number, selectedSquare: boolean[]) {
  let lines = 0;

  for (let i = 0; i < size; i++) {
    let hline = true;
    let vline = true;
    for (let j = 0; j < size; j++) {
      if (!selectedSquare[i * size + j]) hline = false;
      if (!selectedSquare[i + j * size]) vline = false;
    }
    if (hline) lines++;
    if (vline) lines++;
  }

  let ldiagonal = true;
  let rdiagonal = true;
  for (let i = 0; i < size; i++) {
    if (!selectedSquare[i * size + i]) ldiagonal = false;
    if (!selectedSquare[i * size + (size - i - 1)]) rdiagonal = false;
  }
  if (ldiagonal) lines++;
  if (rdiagonal) lines++;

  if (lines >= 3) return true;
  else return false;
}

// return an array with n unique random numbers
function randomNumbers(n: number) {
  var arr = [];
  while (arr.length < n) {
    var r = Math.floor(Math.random() * n) + 1;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  /*console.log(arr);*/
  return arr;
}
