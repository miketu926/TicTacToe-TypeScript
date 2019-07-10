import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

enum Player {
  None = 0,
  One = 1,
  Two = 2
}

interface IState {
  board: Player[]
}

// class App extends React.Component <{}, IState> {

const App: React.FC = () => {

  const [board, setBoard] = useState([Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None, Player.None])
  const [nextPlayerTurn, setNextPlayerTurn] = useState(Player.One)

  const handleClick = (index: number) => {

    const newBoard = board.slice();
    newBoard[index] = nextPlayerTurn;

    setBoard(newBoard);
    setNextPlayerTurn(3 - nextPlayerTurn);
  }

  const renderCell = (index: number) => {
    return <div className="cell" onClick={() => handleClick(index)} />
  }

  const renderBoard = () => {
    return <div className="board-container">{board.map((cell, i) => renderCell(i))}</div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Tic Tac Toe using TypeScript By Mike Tu
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

      {renderBoard()}

    </div>
  );
}

export default App;
