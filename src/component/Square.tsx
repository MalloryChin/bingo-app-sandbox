import * as React from "react";

interface SquareProps {
  value: number;
  selected: boolean;
  onClick: () => void;
}

function Square(props: SquareProps) {
  let className = "square";
  if (props.selected) {
    className += " selected_square";
  }
  return (
    <button className={className} onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

export default Square;
