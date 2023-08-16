export const PIECES = [
  "Rook",
  "Knight",
  "Bishop",
  "Queen",
  "King",
  "Pawn",
] as const;

export type UnitName = (typeof PIECES)[number] | "";

export interface Tile {
  type: UnitName | "";
  player: 1 | 2 | 0;
}

export type Position = [number, number];
