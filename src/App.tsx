import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import { fillArray } from './core/utils';
import { Game } from './core/game';

type Player = 'Human' | 'Skynet';
type Players = [Player, Player];
type GameSymbol = 'X' | 'O';
type Score = [number, number];
type GameState = 'in progress' | 'complete';
type GameBoard = (5 | 0)[];

const VAL_X = 5;
const VAL_O = 1;



function App() {
  const [currentSymbol, setCurrentSymbol] = useState<GameSymbol>('X');
  const [players, setPlayers] = useState<Players>(['Human', 'Skynet']);
  const [score, setScore] = useState<Score>([0, 0]);
  const [turn, setTurn] = useState<number>(1);
  const [gameState, setGameState] = useState<GameState>('in progress');
  const [currentValue, setCurrentValue] = useState(VAL_X);
  const [nonCurrentValue, setNonCurrentValue] = useState(VAL_O);

  const [gameBoard, setGameBoard] = useState<GameBoard>(fillArray(9, 0));
  const [generalStrategy, setGeneralStrategy] = useState<GameBoard>(fillArray(9, 0));

  
  
  useEffect(() => {
    const game = new Game();
    console.log('using effect');
  }, [])

  const handlePlayerClick = (idx: number) => {
    const playerToSet = players[idx];

    const newPlayers = [...players] as Players;
    newPlayers[idx] = playerToSet === 'Human' ? 'Skynet' : 'Human';
    setPlayers(newPlayers);
  }



  const handleBoardButtonClick = (target: any) => {

    // ev.persist();
    console.log(target.id) 
    if (target.id) {

    }
  }

  const resetScore = () => {
    setScore([0, 0]);
  }

  const handleNewGameClick = () => {
    setTurn(1);
    setGameState('in progress');
    setCurrentValue(VAL_X);
    setNonCurrentValue(VAL_O);
    setGameBoard(fillArray(9, 0));
    setGeneralStrategy(fillArray(9, 0));
    
  }

  return (
    <div className="container">
      <Board 
        players={players}
        score={score}
        onBoardButtonClick={(ev: any) => handleBoardButtonClick(ev.target)} 
        onNewGameClick={handleNewGameClick}
        onPlayerClick={handlePlayerClick} /> 
    </div>
  );
}

export default App;
