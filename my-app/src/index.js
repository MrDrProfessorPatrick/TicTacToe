import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className = 'square'  style = {props.style} onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function SquareResX(props) {
  return (       
    <th> {props.value} </th>
    )
}

function SquareResO(props) {
  return (       
    <th> {props.value} </th>
    )
}


class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]} // gives a number for the cell 
        style = {this.props.style[i]}
        onClick={() => this.props.onClick(i)}
        
      />
    )}

     renderSquareResX(i){
      return(
      <SquareResX value = {this.props.resultTable[i]}  /> // it goes to the square of the same value
      )
    }

    renderSquareResO(i){
      return(
      <SquareResO value = {this.props.resultTable[i]}  />
      )
    }

  render() {
    return (
      <div>
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
        
        <table className="tableWithResults">
        <tr>
            <th> X </th>
            <th> O </th>
        </tr>
        <tr>
        {this.renderSquareResX(0)}
        {this.renderSquareResO(1)}
        </tr>
        <tr>
        {this.renderSquareResX(2)}
        {this.renderSquareResO(3)}
        </tr>
        <tr>
        {this.renderSquareResX(4)}
        {this.renderSquareResO(5)}
        </tr>
        <tr>
        {this.renderSquareResX(6)}
        {this.renderSquareResO(7)}
        </tr>
        <tr>
        {this.renderSquareResX(8)}
        {this.renderSquareResO(9)}
        </tr>
        </table>
     
      </div>
    );
  }
}


class Players extends React.Component {

  playersCreate(sign){
    return (
      <button className = {this.props.value} style = {this.props.style} playingFor = {this.props.playingFor} onClick = {this.props.onClick}> 
        {sign} 
      </button>
    )
  }
  
  render(){
    return(
  <div>
  <p> Choose your player </p>
  <p> {this.props.playingFor} </p>
  <div className = 'X'>
    {this.playersCreate('X')}
  </div>
  <div className = 'O'>
    {this.playersCreate('O')}
  </div>
  </div> )
  }
}


class Game extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      playerIsChosen:null,
      stepNumber: 0,
      resultTable: Array(0),
      cellColors: Array(9).fill(null),
      computerTurn: null,
      arrForWinner:null,
      winner:null,
      playingFor:null,
        };
    this.chosePlayer = this.chosePlayer.bind(this);
    this.computerClick = this.computerClick.bind(this);
  }

  componentDidUpdate(){
   if(this.state.computerTurn) this.computerClick()
    
  }
  
  handleClick(i) { 
   
    const history = this.state.history.slice(0, this.state.stepNumber + 1); // the last Array object with Array
    const current = history[history.length - 1]; 
    const squares = current.squares.slice();  // the last array 
    const cellColors = this.state.cellColors.slice();
    
    let resultTableChanges = this.state.resultTable.slice();
    resultTableChanges.push(i);

    if(this.calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : "O";
    let color = (squares[i] === 'X') ? {'background':'#ff6666'}: {'background':'#809fff'};
    
    cellColors.splice(i, 1, color );  // arr to remember colors for cells
    console.log("this in handleclick " + this);

    this.setState({
      history: history.concat([  // add additional obj with array
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      resultTable: resultTableChanges,
      cellColors: cellColors,  // add the color for the specific cell,
      computerTurn:!this.state.computerTurn,
    });

    if(this.calculateWinner(squares)){
     let winnerArr = this.calculateWinner(squares); // arr with numbers for winner;

      this.setState({ 
      winner:squares[winnerArr[0]],
      arrForWinner:winnerArr,
    })

    this.changeStateForWinner(winnerArr) // set yellow color for the winner row.
    }
  }

  chosePlayer(event){
    console.log("FUNC Works");

    if(event.target.innerHTML == "X"){
      console.log(this);

      this.setState({
        playerIsChosen:"X",
        computerTurn: false,
      })
    }

    if(event.target.innerHTML == "O"){
      this.setState({
        playerIsChosen: "O",
        computerTurn: true,
      })
    
    }
    this.setState({
      playingFor: <p> You are playing for {event.target.innerHTML} </p>
    })
    return 
  }

  computerClick(){
    // should chose the cell itself

    const history = this.state.history.slice(0, this.state.stepNumber + 1); // the last Array object with Array
    const current = history[history.length - 1]; 
    const squares = current.squares.slice();  // the last array [0...9]
    let emptySquares = [];

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

    for(let i = 0; i<squares.length; i++){
      if(squares[i] === null){emptySquares.push(i)}
    }

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    let squareToChose = getRandomInt(emptySquares.length-1);
    console.log("squareToChose " + squareToChose)

    if(this.state.playerIsChosen){
      this.handleClick(emptySquares[squareToChose]);
      this.setState({
        computerTurn:false,
      })
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
  
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        
          return [a,b,c];
      }
    }
  
    return null;
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  changeStateForWinner(squares){
    const colorForWinner = {'background' :'yellow'};
    let cellColors = this.state.cellColors.slice();

        for(let j=0; j<squares.length; j++){
        cellColors.splice(squares[j], 1, colorForWinner);
      }
   
      this.setState({
        cellColors:cellColors,
      })
    };

   render() {   
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    let winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to start';

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}> {desc} </button>
        </li>
      )
    });

    let status;

    if (winner) {
      status = 'Winner: ' + winner; 
       
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} style = {this.state.cellColors}  resultTable = {this.state.resultTable} computerClick = {this.computerClick} onClick={i => this.handleClick(i)}  />
          <Players playingFor = {this.state.playingFor} onClick = {this.chosePlayer} />

        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
};


ReactDOM.render(
  <Game />,
  document.getElementById('root')
)

// TO DO 
// add fuctionaliti to choose the player X or O -- DONE
// funtionality for computer player


