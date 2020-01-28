import * as React from "react";

interface SquareProps {
  value: number;
  selected: boolean;
  onClick: () => void;
}

class Square extends React.Component<SquareProps> {
  render() {
    let className = "square";
    if (this.props.selected) {
      className += " selected_square";
    }
    return (
      <button className={className} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
