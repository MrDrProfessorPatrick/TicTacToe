import React from "react";

export class Players extends React.Component {
  playersCreate(sign) {
    return (
      <button
        className={this.props.value}
        style={this.props.style}
        playingFor={this.props.playingFor}
        onClick={this.props.onClick}
      >
        {sign}
      </button>
    );
  }

  render() {
    return (
      <div>
        <p> Choose your player </p>
        <p> {this.props.playingFor} </p>
        <div className="chosePlayerButtonsContainer">
          <div className="X">{this.playersCreate("X")}</div>
          <div className="O">{this.playersCreate("O")}</div>
        </div>
      </div>
    );
  }
}
