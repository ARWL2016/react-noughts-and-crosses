import React from "react";
import "./Board.scss";

const Board = (props: any) => {
  const { players, score } = props;
  const displayScore = score.join(" : ");

 
  const board = props.game.board;
   console.log(props.game);

  return (
    <div id="main">
      <h1>ARTIFICAL INTELLIGENCE</h1>

      <button
        className="playerSelect"
        id="player1"
        onClick={() => props.onPlayerClick(0)}
      >
        {players[0]} - X
      </button>

      <div id="scoreBoard">{displayScore}</div>
      <button
        className="playerSelect"
        id="player2"
        onClick={() => props.onPlayerClick(1)}
      >
        O - {players[1]}
      </button>

      <table>
        <tbody onClick={props.onBoardButtonClick}>
          <tr>
            <td>
              <button className="boardButton" id="0" data-num="0">
                {board[0].value}
              </button>
            </td>
            <td>
              <button className="boardButton" id="1" data-num="1">
                {board[1].value}
              </button>
            </td>
            <td>
              <button className="boardButton" id="2" data-num="2">
                {board[2].value}
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="boardButton" id="3" data-num="3">
                {board[3].value}
              </button>
            </td>
            <td>
              <button className="boardButton" id="4" data-num="4">
                {board[4].value}
              </button>
            </td>
            <td>
              <button className="boardButton" id="5" data-num="5">
                {board[5].value}
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="boardButton" id="6" data-num="6">
                {board[6].value}
              </button>
            </td>
            <td>
              <button className="boardButton" id="7" data-num="7">
                {board[7].value}
              </button>
            </td>
            <td>
              <button className="boardButton" id="8" data-num="8">
                {board[8].value}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button id="newGame" onClick={props.onNewGameClick}>
        New Game
      </button>
    </div>
  );
};

export default Board;
