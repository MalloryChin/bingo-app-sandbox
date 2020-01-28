import * as React from "react";
import Overlay from "./Overlay";
import { OverlayTheme } from "./Overlay";
import Board from "./Board";
import InputForm from "./InputForm";

interface GameProps {
  size: number;
}

interface GameState {
  values: number[];
  selectedValues: boolean[];
}

class Game extends React.Component<GameProps, GameState> {
  boardSize: number;

  constructor(props: GameProps) {
    super(props);
    this.boardSize = this.props.size * this.props.size;
    this.state = {
      values: randomNumbers(this.boardSize),
      selectedValues: Array(this.boardSize).fill(false)
    };
  }

  handleClick(i: number) {
    const selectedValues = this.state.selectedValues.slice();
    selectedValues[i] = true;
    this.setState({
      selectedValues: selectedValues
    });
  }

  restart() {
    this.setState({
      values: randomNumbers(this.boardSize),
      selectedValues: Array(this.boardSize).fill(false)
    });
  }

  render() {
    return (
      <div className="game">
        <OverlayTheme.Provider
          value={bingo(this.props.size, this.state.selectedValues)}
        >
          <Overlay onClick={() => this.restart()} />
        </OverlayTheme.Provider>
        <div className="game-main">
          <InputForm
            values={this.state.values}
            onClick={(i: number) => this.handleClick(i)}
          />
          <Board
            size={this.props.size}
            values={this.state.values}
            selectedValues={this.state.selectedValues}
            onClick={(i: number) => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
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
