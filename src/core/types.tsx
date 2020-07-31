export type Player = "Human" | "Skynet";
export type Players = [Player, Player];
export type Score = [number, number];
export type RestartLabel = "New game" | "Play again?";

export type Row = [Square, Square, Square];
export type Column = Row;
export type Diagonal = Row;
export type SliceNum = 1 | 2 | 3;

export type BoardValue = "X" | "O" | undefined;
export type Symbol = "X" | "O";

export interface Square {
  location: number;
  value: BoardValue; 
}

export interface Winner {
  row: number[];
  winner: Symbol;
}

export type GameState = "in progress" | "complete";