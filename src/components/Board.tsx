import React from "react";
import "./Board.scss";
import { getCurrentTurn } from "../core/utils";

const Board = (props: any) => {
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

  console.log(board);

  const isDisabled = (index: number): boolean => {
    return board[index] !== undefined || gameState === "complete";
  };

  const showWinAnimation = (index: number): string => {
    if (winAnimation && winAnimation.includes(index)) {
      return 'winAnimation';
    } 
    return '';
  };

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
        <tbody onClick={props.onBoardButtonClick}>
          <tr>
            <td>
              <button className={showWinAnimation(0)} id="0" disabled={isDisabled(0)}>
                {board[0]}
              </button>
            </td>
            <td>
              <button className={showWinAnimation(1)} id="1" disabled={isDisabled(1)}>
                {board[1]}
              </button>
            </td>
            <td>
              <button className={showWinAnimation(2)} id="2" disabled={isDisabled(2)}>
                {board[2]}
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className={showWinAnimation(3)} id="3" disabled={isDisabled(3)}>
                {board[3]}
              </button>
            </td>
            <td>
              <button className={showWinAnimation(4)} id="4" disabled={isDisabled(4)}>
                {board[4]}
              </button>
            </td>
            <td>
              <button className={showWinAnimation(5)} id="5" disabled={isDisabled(5)}>
                {board[5]}
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className={showWinAnimation(6)} id="6" disabled={isDisabled(6)}>
                {board[6]}
              </button>
            </td>
            <td>
              <button className={showWinAnimation(7)} id="7" disabled={isDisabled(7)}>
                {board[7]}
              </button>
            </td>
            <td>
              <button className={showWinAnimation(8)} id="8" disabled={isDisabled(8)}>
                {board[8]}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button id="newGame" onClick={props.onNewGameClick}>
        {newGameLabel}
      </button>
    </div>
  );
};

export default Board;
