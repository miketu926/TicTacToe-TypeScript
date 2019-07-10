import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { array } from 'prop-types';

type ONGOING_GAME = -1;
const ONGOING_GAME = -1;

enum Player {
  None = 0,
  One = 1,
  Two = 2
}

interface IState {
  board: Player[],
  nextPlayerTurn: Player
  gameIsWon: Player | ONGOING_GAME
}

// class App extends React.Component <{}, IState> {

const App: React.FC = () => {

  const [board, setBoard] = useState([Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None])
  const [nextPlayerTurn, setNextPlayerTurn] = useState(Player.One)
  const [gameIsWon, setGameIsWon] = useState(ONGOING_GAME);

  const checkIfGameIsOver = (board: Player[]) => {
    if (board[0] === board[1] && board[1] === board[2] && board[2] !== Player.None) return board[2];
    if (board[3] === board[4] && board[4] === board[5] && board[5] !== Player.None) return board[5];
    if (board[6] === board[7] && board[7] === board[8] && board[8] !== Player.None) return board[8];
    if (board[0] === board[3] && board[3] === board[6] && board[6] !== Player.None) return board[6];
    if (board[1] === board[4] && board[4] === board[7] && board[7] !== Player.None) return board[7];
    if (board[2] === board[5] && board[5] === board[8] && board[8] !== Player.None) return board[8];
    if (board[0] === board[4] && board[4] === board[8] && board[8] !== Player.None) return board[8];
    if (board[2] === board[4] && board[4] === board[6] && board[6] !== Player.None) return board[6];

    let set = new Set(board);
    if (set.has(0)) return ONGOING_GAME;

    return Player.None;
  }

  const handleClick = (index: number) => {
    if (board[index] !== Player.None || gameIsWon !== ONGOING_GAME) return;

    const newBoard = board.slice();
    newBoard[index] = nextPlayerTurn;

    setBoard(newBoard);
    setNextPlayerTurn(3 - nextPlayerTurn);

    setGameIsWon(checkIfGameIsOver(newBoard));
  }

  const renderCell = (index: number) => {
    return <div className="cell" onClick={() => handleClick(index)} data-player={board[index]} />
  }

  const renderBoard = () => {
    return <div className="board-container">{board.map((cell, i) => renderCell(i))}</div>
  }

  const renderStatus = () => {

    const winningText = gameIsWon !== Player.None ? `Player ${gameIsWon} won` : "The game is a draw"
    return <div className="game-status">
      {'player 1 is green'} <br />
      {'player 2 is red'} <br />
      {gameIsWon === ONGOING_GAME ? 'game is ongoing' : winningText}
    </div >
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Tic Tac Toe using TypeScript <br />
          With Docker deployment <br />
          by Mike Tu
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {renderStatus()}
      {renderBoard()}
    </div>
  );
}

export default App;
