import React from "react";
import "./Board.scss";
import { getCurrentTurn } from "../../core/utils";
import Square from "../Square/Square";
import { Players, RestartLabel, GameState, Score, BoardValue } from "../../core/types";

interface Props {
  players: Players;
  score: Score;
  board: BoardValue[];
  newGameLabel: RestartLabel;
  gameState: GameState;
  winAnimation: number[] | undefined;
  onNewGameClick: () => void;
  onPlayerClick: (id: number) => void;
  onSquareClick: (ev: any, index: string) => void;
}

const Board = (props: Props) => {
  const {
    players,
    score,
    board,
    newGameLabel,
    gameState,
    winAnimation
  } = props;
  const displayScore = score.join(" : ");
  const turn = getCurrentTurn(board);

  const showWin = (index: number): boolean => {
    return Boolean(winAnimation && winAnimation.includes(index));
  }

  return (
    <div id="main">
      <h1>ARTIFICAL INTELLIGENCE</h1>

      <button
        className={`playerSelect ${turn % 2 !== 0 ? "underline" : ""}`}
        id="player1"
        onClick={() => props.onPlayerClick(0)}
      >
        {players[0]} - X
      </button>

      <div id="scoreBoard">{displayScore}</div>
      <button
        className={`playerSelect ${turn % 2 === 0 ? "underline" : ""}`}
        id="player2"
        onClick={() => props.onPlayerClick(1)}
      >
        O - {players[1]}
      </button>

      <table>
        <tbody>
          <tr>
            {[0,1,2].map(v => (
              <td key={v}>
                <Square value={board[v]} index={v.toString()} gameState={gameState} showWin={showWin(v)} onSquareClick={props.onSquareClick}/>
              </td>
            ))}
          </tr>

          <tr>
          {[3,4,5].map(v => (
              <td key={v}>
                <Square value={board[v]} index={v.toString()} gameState={gameState} showWin={showWin(v)} onSquareClick={props.onSquareClick}/>
              </td>
            ))}
          </tr>

          <tr>
          {[6,7,8].map(v => (
              <td key={v}>
                <Square value={board[v]} index={v.toString()} gameState={gameState} showWin={showWin(v)} onSquareClick={props.onSquareClick}/>
              </td>
            ))}
          </tr>

        </tbody>
      </table>

      <button className="newGame" onClick={props.onNewGameClick}>
        {newGameLabel}
      </button>
    </div>
  );
};

export default Board;
