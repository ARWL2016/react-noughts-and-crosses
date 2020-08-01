/**
 *    Board array index positions:
 *    0 | 1 | 2
 *    3 | 4 | 5
 *    6 | 7 | 8
 */

import {
  Square,
  SliceNum,
  Row,
  Column,
  Diagonal,
  Symbol,
  BoardValue,
  Winner,
} from "./types";

export class Move {
  public boardMap: Square[];
  public currentSymbol: Symbol;
  public turn: number = 1;

  get otherSymbol(): Symbol {
    return this.currentSymbol === "X" ? "O" : "X";
  }

  readonly symbolValues = {
    X: 5,
    O: 1,
  };

  constructor(board: BoardValue[], turn: number, currentSymbol: Symbol) {
    this.boardMap = this.createBoard(board);
    this.turn = turn;
    this.currentSymbol = currentSymbol;
  }

  private createBoard(source: BoardValue[]): Square[] {
    const boardMap = [];

    for (let i = 0; i < 9; i++) {
      boardMap.push({
        location: i,
        value: source[i],
      });
    }

    return boardMap;
  }

  private getRow(rowNumber: SliceNum): Row {
    const start = rowNumber * 3 - 3;
    return this.boardMap.slice(start, start + 3) as Row;
  }

  private getColumn(colNumber: SliceNum): Column {
    const columnMap = {
      1: [0, 3, 6],
      2: [1, 4, 7],
      3: [2, 5, 8],
    };

    return columnMap[colNumber].map((num) => this.boardMap[num]) as Column;
  }

  private getDiagonal(startSquare: 0 | 2): Diagonal {
    if (startSquare === 0) {
      return [this.boardMap[0], this.boardMap[4], this.boardMap[8]];
    } else {
      return [this.boardMap[2], this.boardMap[4], this.boardMap[6]];
    }
  }

  get sides() {
    return [
      this.boardMap[1],
      this.boardMap[3],
      this.boardMap[5],
      this.boardMap[7],
    ];
  }

  get winArray() {
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

  public computerAI = (): number => {
    const fns = [  
      this.canIWinThisTurn.bind(this),
      this.canYouWinNextTurn.bind(this),
      this.preventTrap.bind(this),
      // this.applyHardCodedMoves.bind(this),
      this.applyDefaultStrategy.bind(this),
    ];

    let location;
    let i = 0;

    while (!location && i < 4) {
      location = fns[i++]();
    }

    return location as number;
  };

  public evaluateWin(): Winner | void {
    for (let i = 0; i < this.winArray.length; i++) {
      if (this.winArray[i].every((v) => v.value === "X")) {
        return {
          row: this.winArray[i].map((square) => square.location),
          winner: "X",
        };
      } else if (this.winArray[i].every((v) => v.value === "O")) {
        return {
          row: this.winArray[i].map((square) => square.location),
          winner: "O",
        };
      }
    }
  }

  private canIWinThisTurn(): number | false {
    for (let i = 0; i < this.winArray.length; i++) {
      if (
        this.evalArray(this.winArray[i]) ===
        this.symbolValues[this.currentSymbol] * 2
      ) {
        return this.findEmptyLocation(this.winArray[i]);
      }
    }
    return false;
  }

  private canYouWinNextTurn(): number | false {
    for (let i = 0; i < this.winArray.length; i++) {
      if (
        this.evalArray(this.winArray[i]) ===
        this.symbolValues[this.otherSymbol] * 2
      ) {
        return this.findEmptyLocation(this.winArray[i]);
      }
    }
    return false;
  }

  private preventTrap(): number | false {
    const singles: Row[] = this.winArray.filter((row: Row) => {
      return this.evalArray(row) === this.symbolValues[this.otherSymbol];
    });

    let dangerSquares: number[] = [];

    singles.forEach(row => {
      row.forEach(square => {
        if (square.value === undefined) {
          dangerSquares.push(square.location);
          dangerSquares.sort();
        }
      })
    });


    for (let i = 0; i < dangerSquares.length - 1; i++) {
      if (dangerSquares[i] === dangerSquares[i + 1]) {
        return dangerSquares[i];
      }
    }
    
    return false;
  }

  private findEmptyLocation(arr: Row): number {
    const square = arr.find((x) => x.value === undefined);
    return square!.location;
  }

  private evalArray(arr: Row): number {
    return arr
      .map((s): number => {
        if (!s.value) {
          return 0;
        } else {
          return this.symbolValues[s.value as Symbol];
        }
      })
      .reduce((a, b) => a + b);
  }

  private equalArrays(arr1: BoardValue[], arr2: BoardValue[]): boolean {
    if (arr1.length !== arr2.length) return false;

    let areEqual = true;

    arr1.forEach((num, idx) => {
      if (num !== arr2[idx]) {
        areEqual = false;
      }
    });

    return areEqual;
  }

  // private applyHardCodedMoves(): number | false {
  //   const [row1, row2, row3, col1, col2, col3, diag1, diag2] = this.winArray;

  //   if (
  //     this.turn === 5 &&
  //     this.boardMap[1].value === "O" &&
  //     this.boardMap[6].value === undefined
  //   ) {
  //     return 6;
  //   }
  //   if (
  //     this.turn === 4 &&
  //     (this.equalArrays(
  //       diag1.map((s) => s.value),
  //       ["X", "O", "X"]
  //     ) ||
  //       this.equalArrays(
  //         diag2.map((s) => s.value),
  //         ["X", "O", "X"]
  //       ))
  //   ) {
  //     return 1;
  //   }

  //   if (
  //     this.turn === 4 &&
  //     this.evalArray(row1) === 6 &&
  //     this.evalArray(row3) === 5
  //   ) {
  //     return 8;
  //   }
  //   if (
  //     this.turn === 4 &&
  //     this.evalArray(row1) === 5 &&
  //     this.evalArray(row3) === 6
  //   ) {
  //     return 0;
  //   }
  //   if (
  //     this.turn === 4 &&
  //     this.evalArray(col1) === 6 &&
  //     this.evalArray(col3) === 5
  //   ) {
  //     return 2;
  //   }
  //   if (
  //     this.turn === 4 &&
  //     this.evalArray(col1) === 5 &&
  //     this.evalArray(col3) === 6
  //   ) {
  //     return 6;
  //   }

  //   const sideValues = this.sides.map((side) => side.value);

  //   if (
  //     this.turn === 4 &&
  //     (this.equalArrays(sideValues, ["O", undefined, "X", "X"]) ||
  //       this.equalArrays(sideValues, ["O", "X", undefined, "X"]) ||
  //       this.equalArrays(sideValues, ["X", "X", "O", undefined]) ||
  //       this.equalArrays(sideValues, [undefined, "X", "O", "X"]))
  //   ) {
  //     return 6;
  //   }

  //   if (
  //     this.turn === 4 &&
  //     (this.equalArrays(sideValues, ["X", "O", "X", undefined]) ||
  //       this.equalArrays(sideValues, [undefined, "O", "X", "X"]) ||
  //       this.equalArrays(sideValues, ["X", undefined, "X", "O"]) ||
  //       this.equalArrays(sideValues, ["X", "X", undefined, "O"]))
  //   ) {
  //     return 2;
  //   }

  //   if (this.turn === 2) {
  //     for (let i in this.sides) {
  //       if (this.sides[i].value === "X") {
  //         // pick opposite side
  //         return 8 - this.sides[i].location;
  //       }
  //     }
  //   }

  //   return false;
  // }

  private applyDefaultStrategy(): number | false {
    const strategy = [4, 0, 2, 6, 8, 1, 3, 5, 7]; // default order of play

    const loc = strategy.find(
      (index) => this.boardMap[index].value === undefined
    );

    if (loc !== undefined) {
      return loc;
    }
    return false;
  }
}
