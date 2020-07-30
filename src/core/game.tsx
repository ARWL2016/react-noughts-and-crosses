/**
 *    Board array index positions:
 *    0 | 1 | 2
 *    3 | 4 | 5
 *    6 | 7 | 8
 */

type Row = [Square, Square, Square];
type Column = Row;
type Diagonal = Row;
type SliceNum = 1 | 2 | 3;

type BoardValue = "X" | "O" | undefined;
type Symbol = "X" | "O";

interface Square {
  location: number;
  value: BoardValue; 
}

type GameState = "in progress" | "complete";

export class Game {
  // public board: BoardValue[] = new Array(9);
  public board: Square[] = this.createBoard();
  public currentSymbol: Symbol = "X";
  public turn: number = 1;
  public gameState: GameState = "in progress";

  get turnIsEven(): boolean {
    return this.turn % 2 === 0;
  }

  get turnIsOdd(): boolean {
    return this.turn % 2 !== 0;
  }

  get otherSymbol(): Symbol {
    return this.currentSymbol === 'X' ? 'O' : 'X';
  }

  

  readonly symbolValues = {
    X: 5,
    O: 1,
  };

  constructor(game?: any) {
    if (game) {
      this.board = game.board;
      this.currentSymbol = game.currentSymbol;
      this.turn = game.turn;
      this.gameState = game.gameState;
    }
  }

  createBoard(): Square[] {
    let board = [];

    for (let i = 0; i < 9; i++) {
      board.push({
        location: i,
        value: undefined,
      });
    }

    return board;
  }

  move(index: number) {
    this.board[index].value = this.currentSymbol;

    if (this.turn < 9 && this.gameState === "in progress") {
      this.turn++;
      this.currentSymbol = this.currentSymbol === "X" ? "O" : "X";
    }
  }

  getRow(rowNumber: SliceNum): Row {
    const start = rowNumber * 3 - 3;
    return this.board.slice(start, start + 3) as Row;
  }

  getColumn(colNumber: SliceNum): Column {
    const columnMap = {
      1: [0, 3, 6],
      2: [1, 4, 7],
      3: [2, 5, 8],
    };

    return columnMap[colNumber].map((num) => this.board[num]) as Column;
  }

  getDiagonal(startSquare: 0 | 2): Diagonal {
    if (startSquare === 0) {
      return [this.board[0], this.board[4], this.board[8]];
    } else {
      return [this.board[2], this.board[4], this.board[6]];
    }
  }

  get sides() {
    return [this.board[1], this.board[3], this.board[5], this.board[7]];
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

  computerAI = () => {
    let location = this.canIWinThisTurn(); 

    if (location !== false) {
      return this.move(location);
    } 

    location = this.canYouWinNextTurn();

    if (location !== false) {
      return this.move(location);
    }

    location = this.applyDefaultStrategy();

    if (location !== false) {
      return this.move(location);
    }



  }

  canIWinThisTurn(): number | false {

    for (let i = 0; i < this.winArray.length;  i++) {
      if (
        this.evalArray(this.winArray[i]) ===
        this.symbolValues[this.currentSymbol] * 2
      ) {
        return this.findEmptyLocation(this.winArray[i]);
      }
    }
    return false;
  }

  canYouWinNextTurn(): number | false {
    for (let i = 0; i < this.winArray.length; i++) {
      if (
        this.evalArray(this.winArray[i]) === this.symbolValues[this.otherSymbol] * 2
      ) {
        return this.findEmptyLocation(this.winArray[i]);
      }
    }
    return false;
  }

  findEmptyLocation(arr: Row): number {
    const square = arr.find(x => x.value === undefined);
    return square!.location;
  }

  evalArray(arr: Row): number {
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

  applyDefaultStrategy(): number | false {
    const strategy = [4, 0, 2, 6, 8, 1, 3, 5, 7]; // default order of play

    const loc =  strategy.find(index => this.board[index].value === undefined);

    if (loc !== undefined) {
      return loc;
    }
    return false;
     

  }
}
