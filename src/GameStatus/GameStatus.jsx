import React, { Component, useEffect, useState } from "react";

export default class GameStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style: "gameStatusInitial",
    };

    this.gameStatus = "";
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps, this.gameStatus);

    if (prevProps.xIsNext !== this.props.xIsNext) {
      if (this.props.xIsNext === true) {
        this.setState({
          style: "gameStatusX",
        });
      } else {
        this.setState({
          style: "gameStatusO",
        });
      }
    }

    if (prevProps.winnerSign !== this.props.winnerSign) {
      if (this.props.winnerSign === "X") {
        this.setState({
          style: "winnerX",
        });
      } else {
        this.setState({
          style: "winnerO",
        });
      }
    }
  }

  render() {
    if (this.props.winnerSign) {
      this.gameStatus = "Winner: " + this.props.winnerSign;
    } else {
      this.gameStatus = "Next player: " + (this.props.xIsNext ? "X" : "O");
    }

    return <div className={this.state.style}>{this.gameStatus}</div>;
  }
}
