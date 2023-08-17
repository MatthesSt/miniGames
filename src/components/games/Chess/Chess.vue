<template>
  <main>
    <div class="boardWrapper">
      <div class="row" v-for="(row, xIndex) in board">
        <div
          v-for="(col, yIndex) in row"
          :style="`
          ${
            col.player == 1
              ? 'color: white;text-shadow: black 1px 1px 1px;'
              : 'color: black;'
          }
         ${
           currentMoves.find(
             (e) => e.to[0] == xIndex && e.to[1] == yIndex && col.player != 0
           )
             ? 'background-color: #d32421c0 ;'
             : ''
         }`"
          :class="
            selectedTile[0] == xIndex && selectedTile[1] == yIndex
              ? 'selected'
              : ''
          "
          class="tile"
          @click.stop="tileClick(xIndex, yIndex)"
        >
          {{ getUnicodePiece(col.type) }}
          <div
            v-if="
              currentMoves.find((e) => e.to[0] == xIndex && e.to[1] == yIndex)
            "
            style="position: absolute; border-radius: 50%; opacity: 0.3"
            :style="`
            width: ${col.player != 0 ? TILESIZE - 5 : TILESIZE / 3}px;
            height: ${col.player != 0 ? TILESIZE - 5 : TILESIZE / 3}px;
            border: ${col.player != 0 ? 8 : TILESIZE / 6}px solid black;
            `"
          ></div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { getBoardFromFen } from "./board";
import { getUnicodePiece } from "./utils";
import {
  getPossibleMovesFromTile,
  applyMove,
  moveHistory,
  currentPlayer,
} from "./moves";
const board = ref(getBoardFromFen());

const TILESIZE = 80;

const currentMoves = computed(() =>
  getPossibleMovesFromTile(
    selectedTile.value[0],
    selectedTile.value[1],
    board.value
  )
);
const selectedTile = ref<[number, number]>([-1, -1]);

function tileClick(xIndex: number, yIndex: number) {
  if (selectedTile.value[0] === -1 && selectedTile.value[1] === -1) {
    selectedTile.value = [xIndex, yIndex];
  } else {
    // conssole.log(checkedKing(board.value));

    const move = currentMoves.value.find(
      (e) => e.to[0] == xIndex && e.to[1] == yIndex
    );
    if (
      move &&
      currentPlayer.value == board.value[move.from[0]][move.from[1]].player
    ) {
      board.value = applyMove(move, board.value);
      moveHistory.value.push(move);
    }
    selectedTile.value = [-1, -1];
  }
}
</script>
<style scoped lang="scss">
$tileSize: 80px;
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 3rem;
}
.boardWrapper {
  rotate: 270deg;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(8, 1fr);
  width: calc(8 * $tileSize);
}
.tile {
  rotate: 270deg;
  width: $tileSize;
  height: $tileSize;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  border-block: 1px solid black;
  user-select: none;
}
.row {
  border: 1px solid black;
  rotate: 180deg;
  border-inline: 1px solid black;
  &:first-child {
    border-bottom: 2px solid black;
  }
  &:last-child {
    border-top: 2px solid black;
  }
}

.row:nth-child(odd) .tile:nth-child(even) {
  background: #769656;
}
.row:nth-child(even) .tile:nth-child(odd) {
  background: #769656;
}
.row:nth-child(odd) .tile:nth-child(odd) {
  background-color: rgb(175, 175, 157);
}
.row:nth-child(even) .tile:nth-child(even) {
  background-color: rgb(175, 175, 157);
}
.selected {
  background-color: #7dd128 !important;
}
</style>
