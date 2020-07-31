import React, { useState, useEffect, useCallback } from "react";
import "./App.scss";
import Board from "./components/Board";

import { Players, Score, RestartLabel, BoardValue, Symbol, GameState, Winner } from "./core/types";
import { getCurrentTurn, turnIsX } from "./core/utils";
import { Move } from "./core/move";

function App() {
  const [players, setPlayers] = useState<Players>(["Human", "Skynet"]);
  const [score, setScore] = useState<Score>([0, 0]);
  const [newGameLabel, setNewGameLabel] = useState<RestartLabel>("New game");

  const [board, setBoard] = useState<BoardValue[]>(new Array(9));
  const [gameState, setGameState] = useState<GameState>("in progress");
  const [winAnimation, setWinAnimation] = useState<number[] | undefined>();
  const [winner, setWinner] = useState<Winner | undefined>();

  const handleMove = useCallback(
    (target) => {
      if (target.id) {
        const currentTurn = getCurrentTurn(board);
        const currentSymbol: BoardValue = turnIsX(currentTurn) ? "X" : "O";
        const currentBoard = [...board];
        currentBoard[target.id] = currentSymbol;

        setBoard(currentBoard);
      }
    },
    [board]
  );

  useEffect(() => {
    const currentTurn = getCurrentTurn(board);
    const currentSymbol: Symbol = turnIsX(currentTurn) ? "X" : "O";
    const move = new Move(board, currentTurn, currentSymbol);
    const winner = move.evaluateWin();

    if (winner || currentTurn > 9) {
      setWinner(winner as Winner);
    } else if (
      (players[0] === "Skynet" && currentSymbol === "X") ||
      (players[1] === "Skynet" && currentSymbol === "O")
    ) {
      const delay = Math.random() * 1000;
      setTimeout(() => {
        const location = move.computerAI();
  
        if (location !== undefined) {
          handleMove({ id: location.toString() });
        }
      }, delay);
      
    }
  }, [board, players, handleMove]);

  useEffect(() => {
    if (winner && gameState !== 'complete') {
      setNewGameLabel('Play again?');
      setGameState('complete');

      if (winner) {
        const newScore = [...score];
        if (winner.winner === 'X') {
          newScore[0]++;
        } else {
          newScore[1]++;
        }
        setScore(newScore as Score);
        setWinAnimation(winner.row);
      }
    }

  }, [winner, score, gameState])

  const handlePlayerClick = (idx: number) => {
    const playerToSet = players[idx];

    const newPlayers = [...players] as Players;
    newPlayers[idx] = playerToSet === "Human" ? "Skynet" : "Human";
    setPlayers(newPlayers);
    setScore([0, 0]);
  };

  const handleNewGameClick = () => {
    setBoard(new Array(9));
    setGameState('in progress');
    setWinAnimation(undefined);
    setWinner(undefined);
    setNewGameLabel("New game");
  };

  return (
    <div className="container">
      <Board
        players={players}
        score={score}
        board={board}
        gameState={gameState}
        newGameLabel={newGameLabel}
        winAnimation={winAnimation}
        onBoardButtonClick={(ev: any) => handleMove(ev.target)}
        onNewGameClick={handleNewGameClick}
        onPlayerClick={handlePlayerClick}
      />
    </div>
  );
}

export default App;
