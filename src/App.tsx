import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { Game } from "./core/game";

type Player = "Human" | "Skynet";
type Players = [Player, Player];
type Score = [number, number];
type RestartLabel = "New game" | "Play again?";

function App() {
  const [players, setPlayers] = useState<Players>(["Human", "Skynet"]);
  const [score, setScore] = useState<Score>([0, 0]);
  const [newGameLabel, setNewGameLabel] = useState<RestartLabel>("New game");
  const [game, setGame] = useState<Game>(new Game());

  const handlePlayerClick = (idx: number) => {
    const playerToSet = players[idx];

    const newPlayers = [...players] as Players;
    newPlayers[idx] = playerToSet === "Human" ? "Skynet" : "Human";
    setPlayers(newPlayers);
  };

  const handleBoardButtonClick = (target: any) => {
    // ev.persist();
    console.log(target.id);
    if (target.id) {
      const clone = new Game(game);
      clone.move(target.id);

      if (
        (players[0] === "Skynet" && clone.turnIsOdd) ||
        (players[1] === "Skynet" && clone.turnIsEven)
      ) {
        clone.computerAI();
      }

      console.log(clone);
      console.log(game);

      setGame(clone);
    }
  };

  const resetScore = () => {
    setScore([0, 0]);
  };

  const handleNewGameClick = () => {
    setGame(new Game());

    resetScore();
    // remove win animation
    setNewGameLabel("New game");
    if (players[0] === "Human") {
      // computerAI();
    }
  };

  return (
    <div className="container">
      <Board
        players={players}
        score={score}
        game={game}
        onBoardButtonClick={(ev: any) => handleBoardButtonClick(ev.target)}
        onNewGameClick={handleNewGameClick}
        onPlayerClick={handlePlayerClick}
      />
    </div>
  );
}

export default App;
