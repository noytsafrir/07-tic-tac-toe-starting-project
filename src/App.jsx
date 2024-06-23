import React, {useState} from 'react'
import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS= {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
  [null, null, null], 
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'; //To avoid using 2 states together
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard= [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns){
      const {cell, player} = turn;
      const {row, col} = cell;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}


function deriveWinner(gameBoard, player){
  let winner;

  for (const combination of WINNING_COMBINATIONS){
    const firstCellSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondCellSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdCellSymbol = gameBoard[combination[2].row][combination[2].col];
    if(firstCellSymbol && firstCellSymbol === secondCellSymbol && firstCellSymbol === thirdCellSymbol){
      winner = player[firstCellSymbol];
    }

  }
  return winner;
}


function App() {
  const [player, setPlayer] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X'); //we dont need more stat to update the UI we can do it with the other state
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, player);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectCell(rowIndex, colIndex){
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
    setGameTurns((prevGameTurns) => {

      const currentPlayer = deriveActivePlayer(prevGameTurns);

      const updatedGameTurns = [
        { cell: { row: rowIndex, col: colIndex }, player: currentPlayer},
        ...prevGameTurns,
      ];
      return updatedGameTurns;
    });

  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      [symbol]: newName
    }));
  }


  return <main>
    <div id="game-container">
      <ol id="players" className= "highlight-player">
        <Player  
          initialName={PLAYERS.X} 
          symbol="X" 
          isActive = {activePlayer === 'X'}
          onChangeName = {handlePlayerNameChange}
          />
        <Player  
          initialName={PLAYERS.O} 
          symbol="O" 
          isActive = {activePlayer === 'O'}
          onChangeName = {handlePlayerNameChange}
          />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart= {handleRestart}/> }
      <GameBoard onSelectCell={handleSelectCell} board={gameBoard}/>
    </div>
    <Log turns = {gameTurns}/>
  </main>
}

export default App
