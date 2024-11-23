import React from "react";

import { HistoryKeys } from "../HistoryKeys/HistoryKeys";
import { Board } from "../Board/Board";
import { Players } from "../Players/Players";
import GameStatus from "../GameStatus/GameStatus";
import "../index.css";

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      playerIsChosen: null,
      stepNumber: 0,
      resultTable: Array(0),
      cellColors: Array(9).fill(null),
      computerTurn: null,
      arrForWinner: null,
      winner: null,
      winnerSign: null,
      playingFor: null,
    };

    this.chosePlayer = this.chosePlayer.bind(this);
    this.computerClick = this.computerClick.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  componentDidUpdate() {
    if (this.state.computerTurn) this.computerClick();
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // the last Array object with Array
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // the last array
    const cellColors = this.state.cellColors.slice();

    let resultTableChanges = this.state.resultTable.slice();
    resultTableChanges.push(i);

    if (this.calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? "X" : "O";

    let color =
      squares[i] === "X"
        ? { background: "#ff6666" }
        : { background: "#809fff" };

    cellColors.splice(i, 1, color); // arr to remember colors for cells

    this.setState({
      history: history.concat([
        // add additional obj with array
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      resultTable: resultTableChanges,
      cellColors: cellColors, // add the color for the specific cell,
      computerTurn: !this.state.computerTurn,
    });

    if (this.calculateWinner(squares)) {
      let [winnerSign, winnerArr] = this.calculateWinner(squares); // arr with numbers for winner;

      this.setState({
        winner: squares[winnerArr[0]],
        arrForWinner: winnerArr,
        winnerSign: winnerSign,
      });

      this.changeStateForWinner(winnerArr); // set yellow color for the winner row.
    }
  }

  chosePlayer(event) {
    let playerSign = event.target.innerHTML === "X" ? "X" : "O";
    if (event.target.innerHTML === "X") {
      this.setState({
        playerIsChosen: "X",
        computerTurn: false,
      });
    }

    if (event.target.innerHTML === "O") {
      this.setState({
        playerIsChosen: "O",
        computerTurn: true,
      });
    }

    this.setState({
      playingFor: (
        <p className="playingFor">
          You are playing for:
          <span className={`playingForSign${playerSign}`}>
            {event.target.innerHTML}
          </span>
        </p>
      ),
    });

    return;
  }

  computerClick() {
    // should chose the cell itself
    // will add functionality
    // ...chose the first sign by random
    //... check for X and O and add to lines arr
    //... check lines arr to chose the next move
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // the last Array object with Array
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const resultTable = this.state.resultTable;
    const playerIsChosen = this.state.playerIsChosen;

    function getRandomInt(excludedNumbers) {
      let numbersToChose = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((n) => {
        return !excludedNumbers.includes(n);
      });

      return numbersToChose[Math.floor(Math.random() * numbersToChose.length)];
    }

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    squares.forEach((item, i) => {
      if (item) {
        lines.forEach((arr) => {
          let posToChange = arr.indexOf(i);
          if (posToChange !== -1) arr[posToChange] = item;
        });
      }
    });

    function chooseSquare(lines) {
      let result;

      if (playerIsChosen === "X") {
        for (let arr of lines) {
          // win if 'OO' in a row
          if (arr.filter((item) => item === "O").length === 2) {
            result = arr.find((item, i) => {
              if (typeof item === "number") return item;
            });

            if (!result) continue;
            break;
          }

          // prevent of player winning if 'XX'

          if (arr.filter((item) => item === "X").length === 2) {
            result = arr.find((item, i) => {
              if (typeof item === "number") {
                return item;
              }
            });

            if (!result) continue;

            break;
          }

          // if 'O' and 2 empyt slots
          if (
            arr.includes("O") &&
            arr.filter((item) => item !== null).length === 2
          ) {
            result = arr.find((item, i) => {
              if (typeof item === "number") return i;
            });
            break;
          }
        }
        if (!result) result = getRandomInt(resultTable);
      }

      if (playerIsChosen === "O") {
        for (let arr of lines) {
          // win if 'OO' in a row
          if (arr.filter((item) => item === "X").length === 2) {
            result = arr.find((item, i) => {
              if (typeof item === "number") return item;
            });
            if (!result) continue;
            break;
          }

          // prevent of player winning if 'XX'

          if (arr.filter((item) => item === "O").length === 2) {
            result = arr.find((item, i) => {
              if (typeof item === "number") {
                return item;
              }
            });

            if (!result) continue;

            break;
          }

          // if 'O' and 2 empyt slots
          if (
            arr.includes("X") &&
            arr.filter((item) => item !== null).length === 2
          ) {
            result = arr.find((item, i) => {
              if (typeof item === "number") return i;
            });
            break;
          }
        }
        if (!result) result = getRandomInt(resultTable);
      }
      return result;
    }

    if (playerIsChosen) {
      setTimeout(()=>{
        let squareToChose = chooseSquare(lines);
        this.handleClick(squareToChose);
        this.setState({
          computerTurn: false,
        });
      },[1000])

    }

    // put X  according to the winner arr
    // if enemy has one cell to win - put X to that line
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        let winnerArr = [a, b, c];
        let winnerSign = squares[a];
        return [winnerSign, winnerArr];
      }
    }

    return null;
  }

  jumpTo(step) {
    let newResultTable;
    let newCellColors;

    if (step === 0) {
      newResultTable = [];
      newCellColors = Array(9).fill(null);
    }

    if (step > 0) {
      newResultTable = this.state.resultTable.slice(0, step);
      newCellColors = this.state.history[step].squares.map((item) => {
        if (item === "X") return { background: "#ff6666" };
        if (item === "O") return { background: "#809fff" };
        return null;
      });
    }

    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      resultTable: newResultTable,
      cellColors: newCellColors,
    });
  }

  changeStateForWinner(squares) {
    const colorForWinner = { background: "yellow" };
    let cellColors = this.state.cellColors.slice();

    for (let j = 0; j < squares.length; j++) {
      cellColors.splice(squares[j], 1, colorForWinner);
    }

    this.setState({
      cellColors: cellColors,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    return (
      <div className="game">
        <div className="historyKeysContainer">
          <HistoryKeys history={this.state.history} jumpTo={this.jumpTo} />
        </div>
        <div className="game-board">
          <Board
            squares={current.squares}
            style={this.state.cellColors}
            resultTable={this.state.resultTable}
            onClick={(i) => this.handleClick(i)}
          />
        </div>

        <div className="game-info">
          <Players
            playingFor={this.state.playingFor}
            onClick={this.chosePlayer}
          />
          <GameStatus
            history={this.state.history}
            xIsNext={this.state.xIsNext}
            stepNumber={this.state.stepNumber}
            winnerSign={this.state.winnerSign}
          />
        </div>
      </div>
    );
  }
}
