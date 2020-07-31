import { BoardValue } from "./types";

export function getCurrentTurn(board: BoardValue[]): number {
  return board.filter((value) => value !== undefined).length + 1;
}

export function turnIsX(turn: number): boolean {
  return turn % 2 !== 0;
}
