export const PIECES = [
  "Rook",
  "Knight",
  "Bishop",
  "Queen",
  "King",
  "Pawn",
] as const;

export type UnitName = (typeof PIECES)[number] | "";

export type Player = 1 | -1;
export interface Tile {
  type: UnitName | "";
  player: Player | 0;
}

export type Position = [number, number];

export type Move = { from: Position; to: Position };
