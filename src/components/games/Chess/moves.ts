import type { Tile, Position } from "./types";

export function checkMoves(
  xIndex: number,
  yIndex: number,
  board: Tile[][],
  player: number
) {
  if (xIndex == -1 || yIndex == -1) return [];
  let possibleMoves: Position[] = [];
  possibleMoves.push(...checkPawnMoves(xIndex, yIndex, board, player));
  console.log(possibleMoves);
  return possibleMoves;
}

function checkPawnMoves(
  xIndex: number,
  yIndex: number,
  board: Tile[][],
  player: number
): Position[] {
  let possibleMoves: Position[] = [];
  console.log(board[xIndex]?.[yIndex]?.player, xIndex, yIndex);
  if (player === 1 && board[xIndex][yIndex - 1]) {
    if (board[xIndex][yIndex - 1].player === 0) {
      if (yIndex === 6 && board[xIndex][yIndex - 2].player === 0) {
        possibleMoves.push([xIndex, yIndex - 2]);
      }
      possibleMoves.push([xIndex, yIndex - 1]);
    }
  }
  if (player === 2 && board[xIndex][yIndex + 1]) {
    if (board[xIndex][yIndex + 1].player === 0) {
      if (yIndex === 1 && board[xIndex][yIndex + 2].player === 0) {
        possibleMoves.push([xIndex, yIndex + 2]);
      }
      possibleMoves.push([xIndex, yIndex + 1]);
    }
  }
  return possibleMoves;
}
