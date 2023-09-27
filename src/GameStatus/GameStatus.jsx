import React, { Component } from "react";

export default class GameStatus extends Component {
  constructor(props) {
    super(props);
    this.gameStatus = "";
  }

  render() {
    if (this.props.winnerSign) {
      this.gameStatus = "Winner: " + this.props.winnerSign;
    } else {
      this.gameStatus = "Next player: " + (this.props.xIsNext ? "X" : "O");
    }

    return <div className="gameStatus">{this.gameStatus}</div>;
  }
}
