import { Tile } from "./types";

const UNICODE_PIECES = {
  King: 0x2654,
  Queen: 0x2655,
  Rook: 0x2656,
  Bishop: 0x2657,
  Knight: 0x2658,
  Pawn: 0x2659,
};

export function getUnicodePiece(string: Tile["type"]) {
  if (string == "") return "";
  return String.fromCharCode(UNICODE_PIECES[string]);
}
export function getPieceValue(piece: Tile["type"]) {
  switch (piece) {
    default:
      return 0;
    case "Pawn":
      return 1;
    case "Bishop":
    case "Knight":
      return 3;
    case "King":
      return 4;
    case "Rook":
      return 5;
    case "Queen":
      return 9;
  }
}
