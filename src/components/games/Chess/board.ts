import type { Tile } from "./types";

const FEN_STARTPOSITION =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export function getBoardFromFen(fen: string = FEN_STARTPOSITION): Tile[][] {
  const board: Tile[][] = [];
  const fenBoard = fen.split(" ")[0];
  for (let fenRow of fenBoard.split("/")) {
    const row: Tile[] = [];
    for (let fenChar of fenRow) {
      if (fenChar == "r") row.push({ player: -1, type: "Rook" });
      else if (fenChar == "n") row.push({ player: -1, type: "Knight" });
      else if (fenChar == "b") row.push({ player: -1, type: "Bishop" });
      else if (fenChar == "q") row.push({ player: -1, type: "Queen" });
      else if (fenChar == "k") row.push({ player: -1, type: "King" });
      else if (fenChar == "p") row.push({ player: -1, type: "Pawn" });
      else if (fenChar == "R") row.push({ player: 1, type: "Rook" });
      else if (fenChar == "N") row.push({ player: 1, type: "Knight" });
      else if (fenChar == "B") row.push({ player: 1, type: "Bishop" });
      else if (fenChar == "Q") row.push({ player: 1, type: "Queen" });
      else if (fenChar == "K") row.push({ player: 1, type: "King" });
      else if (fenChar == "P") row.push({ player: 1, type: "Pawn" });
      else {
        const num = parseInt(fenChar);
        for (let i = 0; i < num; i++) row.push({ player: 0, type: "" });
      }
    }
    board.push(row);
  }
  return board.map((e, i, arr) => arr.flatMap((a) => a[i]));
}
