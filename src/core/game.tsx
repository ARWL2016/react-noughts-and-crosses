import { fillArray } from "./utils";

type Row = [number, number, number];
type Column = Row;
type Diagonal = Row;
type SliceNum = 1 | 2 | 3;

export class Game {
  // private game = fillArray(9, 0);
  private game = [0, 5, 0, 1, 1, 1, 5, 0, 5];

  readonly strategy = [4, 0, 2, 6, 8, 1, 3, 5, 7]; // default order of play

  constructor() {
    const r = this.getRow(1);
    console.log(r);
    const c = this.getColumn(2);
    console.log({ c });
    const d = this.getDiagonal(0);
    console.log({ d });
    const v = this.getGeneralStrategyValues()
    console.log(v);
  }

  getRow(rowNumber: SliceNum): Row {
    const start = rowNumber * 3 - 3;
    return this.game.slice(start, start + 3) as Row;
  }

  getColumn(colNumber: SliceNum): Column {
    const columnMap = {
      1: [0, 3, 6],
      2: [1, 4, 7],
      3: [2, 5, 8],
    };

    return columnMap[colNumber].map((num) => this.game[num]) as Column;
  }

  getDiagonal(startSquare: 0 | 2): Diagonal {
    if (startSquare === 0) {
      return [this.game[0], this.game[4], this.game[8]];
    } else {
      return [this.game[2], this.game[4], this.game[6]];
    }
  }

  getSides() {
    return [this.game[1], this.game[3], this.game[5], this.game[7]];
  }

  getWinArray() {
    return [
      this.getRow(1),
      this.getRow(2),
      this.getRow(3),
      this.getColumn(1),
      this.getColumn(2),
      this.getColumn(3),
      this.getDiagonal(0),
      this.getDiagonal(2),
    ];
  }

  getGeneralStrategyValues() {
      return this.strategy.map(v => this.game[v]);
  }
}
