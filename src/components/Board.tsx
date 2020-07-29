import React from "react";
import "./Board.scss";

const Board = (props: any) => {
    const { players, score } = props;
    const displayScore = score.join(' : ')

    return (
        <div id="main">
        <h1>ARTIFICAL INTELLIGENCE</h1>

        <button className="playerSelect" id="player1" onClick={() => props.onPlayerClick(0)}>
            { players[0] } - X
        </button>

        <div id="scoreBoard">{displayScore}</div>
        <button className="playerSelect" id="player2" onClick={() => props.onPlayerClick(1) }>
            O - { players[1] }
        </button>

        <table>
            <tbody onClick={props.onBoardButtonClick}>
            <tr>
                <td>
                <button className="boardButton" id="btn0" data-num="0"></button>
                </td>
                <td>
                <button className="boardButton" id="btn1" data-num="1"></button>
                </td>
                <td>
                <button className="boardButton" id="btn2" data-num="2"></button>
                </td>
            </tr>
            <tr>
                <td>
                <button className="boardButton" id="btn3" data-num="3"></button>
                </td>
                <td>
                <button className="boardButton" id="btn4" data-num="4"></button>
                </td>
                <td>
                <button className="boardButton" id="btn5" data-num="5"></button>
                </td>
            </tr>
            <tr>
                <td>
                <button className="boardButton" id="btn6" data-num="6"></button>
                </td>
                <td>
                <button className="boardButton" id="btn7" data-num="7"></button>
                </td>
                <td>
                <button className="boardButton" id="btn8" data-num="8"></button>
                </td>
            </tr>
            </tbody>
        </table>

        <button id="newGame" onClick={props.onNewGameClick}>New Game</button>
        </div>
    );
};

export default Board;
