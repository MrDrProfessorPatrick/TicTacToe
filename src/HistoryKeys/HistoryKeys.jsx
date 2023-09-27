import React, { Component } from "react";

export class HistoryKeys extends Component {
  render() {
    return this.props.history.map(
      (step, moveIndex) =>
        moveIndex !== 0 && (
          <button onClick={() => this.props.jumpTo(moveIndex - 1)}>
            {moveIndex === 1 ? "Go to start" : "Go to move #" + (moveIndex - 1)}
          </button>
        )
    );
  }
}
