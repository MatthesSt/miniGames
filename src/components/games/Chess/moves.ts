import { ref, computed } from "vue";
import type { Tile, Position, Move, Player } from "./types";

export const currentPlayer = computed(() =>
  moveHistory.value.length % 2 ? -1 : 1
);

export const moveHistory = ref<Move[]>([]);

export function checkedKing(board: Tile[][], checkedPlayer: Player): boolean {
  let kingPos: Position = [-1, -1];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].type == "King" && board[i][j].player == checkedPlayer) {
        kingPos = [i, j];
        break;
      }
    }
  }
  let kingPlayer = board[kingPos[0]][kingPos[1]].player;
  let possibleMoves: Move[] = board.flatMap((e, x) =>
    e.flatMap((t, y) =>
      board[x][y].player != kingPlayer
        ? [...getPossibleMovesFromTile(x, y, board)]
        : []
    )
  );

  return !!possibleMoves.find(
    (e) => e.to[0] == kingPos[0] && e.to[1] == kingPos[1]
  );
}

function getAllLegalMoves(board: Tile[][], player: Player): Move[] {
  return board.flatMap((e, x) =>
    e.flatMap((t, y) =>
      board[x][y].player == player
        ? [...getPossibleMovesFromTile(x, y, board)]
        : []
    )
  );
}

export function getPossibleMovesFromTile(
  xIndex: number,
  yIndex: number,
  board: Tile[][]
): Move[] {
  if (xIndex == -1 || yIndex == -1) return [];
  const tile = board[xIndex][yIndex];
  const piece = tile.type;
  let legalMoves = {
    Rook: checkLegalMovesRook,
    Knight: checkLegalMovesKnight,
    Bishop: checkLegalMovesBishop,
    Queen: (...args: [number, number, Tile[][]]) => [
      ...checkLegalMovesBishop(...args),
      ...checkLegalMovesRook(...args),
    ],
    King: checkLegalMovesKing,
    Pawn: checkLegalMovesPawn,
    "": () => [],
  }[piece](xIndex, yIndex, board);
  return legalMoves;
}

function checkLegalMovesPawn(
  xIndex: number,
  yIndex: number,
  board: Tile[][],
  player: Player | 0 = board[xIndex][yIndex].player
): Move[] {
  if (board[xIndex]?.[yIndex]?.type !== "Pawn") return [];
  let possibleMoves: Position[] = [];
  console.log(board[xIndex]?.[yIndex]?.player, xIndex, yIndex);
  if (board[xIndex][yIndex - player].player === 0) {
    possibleMoves.push([xIndex, yIndex - player]);
    if (
      yIndex === 3.5 + player * 2.5 &&
      board[xIndex][yIndex - player * 2].player === 0
    ) {
      possibleMoves.push([xIndex, yIndex - player * 2]);
    }
  }

  if (board[xIndex + 1]?.[yIndex - player]?.player === -player) {
    possibleMoves.push([xIndex + 1, yIndex - player]);
  }
  if (board[xIndex - 1]?.[yIndex - player]?.player === -player) {
    possibleMoves.push([xIndex - 1, yIndex - player]);
  }

  return possibleMoves.map((e) => ({ from: [xIndex, yIndex], to: e }));
}
function checkLegalMovesBishop(
  xIndex: number,
  yIndex: number,
  board: Tile[][]
): Move[] {
  const legalMoves: Position[] = [];
  const player = board[xIndex][yIndex].player;

  //up left
  for (let distance = 1; distance < board.length; distance++) {
    if (board[xIndex + -1 * distance]?.[yIndex + -1 * distance]?.player) {
      if (
        board[xIndex + -1 * distance]?.[yIndex + -1 * distance]?.player !=
        player
      )
        legalMoves.push([xIndex + -1 * distance, yIndex + -1 * distance]);
      break;
    }
    legalMoves.push([xIndex + -1 * distance, yIndex + -1 * distance]);
  }
  //up right
  for (let distance = 1; distance < board.length; distance++) {
    if (board[xIndex + -1 * distance]?.[yIndex + 1 * distance]?.player) {
      if (
        board[xIndex + -1 * distance]?.[yIndex + 1 * distance]?.player != player
      )
        legalMoves.push([xIndex + -1 * distance, yIndex + 1 * distance]);
      break;
    }
    legalMoves.push([xIndex + -1 * distance, yIndex + 1 * distance]);
  }
  //down right
  for (let distance = 1; distance < board.length; distance++) {
    if (board[xIndex + 1 * distance]?.[yIndex + 1 * distance]?.player) {
      if (
        board[xIndex + 1 * distance]?.[yIndex + 1 * distance]?.player != player
      )
        legalMoves.push([xIndex + 1 * distance, yIndex + 1 * distance]);
      break;
    }
    legalMoves.push([xIndex + 1 * distance, yIndex + 1 * distance]);
  }
  //down left
  for (let distance = 1; distance < board.length; distance++) {
    if (board[xIndex + 1 * distance]?.[yIndex + -1 * distance]?.player) {
      if (
        board[xIndex + 1 * distance]?.[yIndex + -1 * distance]?.player != player
      )
        legalMoves.push([xIndex + 1 * distance, yIndex + -1 * distance]);
      break;
    }
    legalMoves.push([xIndex + 1 * distance, yIndex + -1 * distance]);
  }
  return legalMoves.map((e) => ({ from: [xIndex, yIndex], to: e }));
}

function checkLegalMovesRook(
  xIndex: number,
  yIndex: number,
  board: Tile[][]
): Move[] {
  const legalMoves: Position[] = [];
  const player = board[xIndex][yIndex].player;

  //down
  for (let row = xIndex + 1; row < board.length; row++) {
    if (board[row][yIndex].player) {
      if (board[row][yIndex].player != player) legalMoves.push([row, yIndex]);
      break;
    }
    legalMoves.push([row, yIndex]);
  }
  //up
  for (let row = xIndex - 1; row >= 0; row--) {
    if (board[row][yIndex].player) {
      if (board[row][yIndex].player != player) legalMoves.push([row, yIndex]);
      break;
    }
    legalMoves.push([row, yIndex]);
  }
  //left
  for (let cell = yIndex - 1; cell >= 0; cell--) {
    if (board[xIndex][cell].player) {
      if (board[xIndex][cell].player != player) legalMoves.push([xIndex, cell]);
      break;
    }
    legalMoves.push([xIndex, cell]);
  }
  //right
  for (let cell = yIndex + 1; cell < board[0].length; cell++) {
    if (board[xIndex][cell].player) {
      if (board[xIndex][cell].player != player) legalMoves.push([xIndex, cell]);
      break;
    }
    legalMoves.push([xIndex, cell]);
  }

  return legalMoves.map((e) => ({ from: [xIndex, yIndex], to: e }));
}

function checkLegalMovesKnight(
  xIndex: number,
  yIndex: number,
  board: Tile[][]
): Move[] {
  const legalMoves: Position[] = [];
  const player = board[xIndex][yIndex].player;
  const offsets = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [1, -2],
    [2, -1],
    [-1, -2],
    [-2, -1],
  ];
  for (const [rowOffset, cellOffset] of offsets) {
    if (board?.[xIndex + rowOffset]?.[yIndex + cellOffset]?.player != player) {
      legalMoves.push([xIndex + rowOffset, yIndex + cellOffset]);
    }
  }
  return legalMoves.map((e) => ({ from: [xIndex, yIndex], to: e }));
}

function checkLegalMovesKing(
  xIndex: number,
  yIndex: number,
  board: Tile[][]
): Move[] {
  const legalMoves: Position[] = [];
  const player = board[xIndex][yIndex].player;
  const offsets = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  for (const [rowOffset, cellOffset] of offsets) {
    if (board[xIndex + rowOffset]?.[yIndex + cellOffset]) {
      if (board[xIndex + rowOffset]?.[yIndex + cellOffset]?.player != player)
        legalMoves.push([xIndex + rowOffset, yIndex + cellOffset]);
      continue;
    }
    legalMoves.push([xIndex + rowOffset, yIndex + cellOffset]);
  }
  //große Rochade schwarz
  // if (
  //   player == 2 &&
  //   !moveHistory.value.find(m => m.from[0] == 7 && m.from[1] == 4) &&
  //   !moveHistory.value.find(m => m.from[0] == 7 && m.from[1] == 0) &&
  //   board[7][1].type == '' &&
  //   board[7][2].type == '' &&
  //   board[7][3].type == '' &&
  //   King2Checked.value?.length == 0 &&
  //   legalMoves.find(m => m[0] == 7 && m[1] == 3)
  // ) {
  //   legalMoves.push([7, 2]);
  // }

  //kleine Rochade schwarz
  // if (
  //   player == 2 &&
  //   !moveHistory.value.find(m => m.from[0] == 7 && m.from[1] == 4) &&
  //   !moveHistory.value.find(m => m.from[0] == 7 && m.from[1] == 7) &&
  //   board[7][5].type == '' &&
  //   board[7][6].type == '' &&
  //   King2Checked.value?.length == 0 &&
  //   legalMoves.find(m => m[0] == 7 && m[1] == 5)
  // ) {
  //   legalMoves.push([7, 6]);
  // }
  //große Rochade weiß
  // if (
  //   player == 1 &&
  //   !moveHistory.value.find(m => m.from[0] == 0 && m.from[1] == 4) &&
  //   !moveHistory.value.find(m => m.from[0] == 0 && m.from[1] == 0) &&
  //   board[0][1].type == '' &&
  //   board[0][2].type == '' &&
  //   board[0][3].type == '' &&
  //   King1Checked.value?.length == 0 &&
  //   legalMoves.find(m => m[0] == 0 && m[1] == 3)
  // ) {
  //   legalMoves.push([0, 2]);
  // }
  //kleine Rochade weiß
  // if (
  //   player == 1 &&
  //   !moveHistory.value.find(m => m.from[0] == 0 && m.from[1] == 4) &&
  //   !moveHistory.value.find(m => m.from[0] == 0 && m.from[1] == 7) &&
  //   board[0][5].type == '' &&
  //   board[0][6].type == '' &&
  //   King1Checked.value?.length == 0 &&
  //   legalMoves.find(m => m[0] == 0 && m[1] == 5)
  // ) {
  //   legalMoves.push([0, 6]);
  // }

  return legalMoves.map((e) => ({ from: [xIndex, yIndex], to: e }));
}

export function applyMove(move: Move, board: Tile[][]): Tile[][] {
  return board.map((e, x) =>
    e.map((e, y) =>
      move.from[0] == x && move.from[1] == y
        ? { type: "", player: 0 }
        : move.to[0] == x && move.to[1] == y
        ? board[move.from[0]][move.from[1]]
        : e
    )
  );
}
