import React from "react";
import "../index.css";

function Square(props) {
  return (
    <button className="square" style={props.style} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function SquareResult(props) {
  return <th> {props.value} </th>;
}

export class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]} // gives a number for the cell
        style={this.props.style[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderSquareResult(i) {
    return (
      <SquareResult value={this.props.resultTable[i]} /> // it goes to the square of the same value
    );
  }

  render() {
    return (
      <>
        <div className="result-table-container">
          <table className="tableWithResults">
            <tr>
              <th> X </th>
              <th> O </th>
            </tr>
            <tr>
              {this.renderSquareResult(0)}
              {this.renderSquareResult(1)}
            </tr>
            <tr>
              {this.renderSquareResult(2)}
              {this.renderSquareResult(3)}
            </tr>
            <tr>
              {this.renderSquareResult(4)}
              {this.renderSquareResult(5)}
            </tr>
            <tr>
              {this.renderSquareResult(6)}
              {this.renderSquareResult(7)}
            </tr>
            <tr>
              {this.renderSquareResult(8)}
              {this.renderSquareResult(9)}
            </tr>
          </table>
        </div>

        <div className="board-container">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      </>
    );
  }
}
