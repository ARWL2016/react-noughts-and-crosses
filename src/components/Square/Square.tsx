import React from "react";
import { BoardValue, GameState } from "../../core/types";

interface Props {
  value: BoardValue;
  gameState: GameState;
  showWin: boolean;
  index: string;
  onSquareClick: (ev: any, index: string) => void;
}

const Square = (props: Props) => {
  const { value, gameState, showWin, onSquareClick, index } = props;

  const isDisabled = (value: BoardValue): boolean => {
    return value !== undefined || gameState === "complete";
  };

  return (
    <button className={`${showWin ? "winAnimation" : ""}`} id={value} disabled={isDisabled(value)} onClick={(ev) => onSquareClick(ev, index)}>
      {value}
    </button>
  );
};

export default Square;
