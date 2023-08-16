<template>
  <main>
    <div class="boardWrapper">
      <div class="row" v-for="(row, xIndex) in board">
        <div
          v-for="(col, yIndex) in row"
          :style="`${col.player == 1 ? 'color: white' : 'color: black'}`"
          :class="`${
            currentMoves.find((e) => e[0] == xIndex && e[1] == yIndex)
              ? 'possibleMove'
              : ''
          }`"
          class="tile"
          @click.stop="selectedTile = [xIndex, yIndex, col.player]"
        >
          {{ getUnicodePiece(col.type) }}
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { getBoardFromFen } from "./board";
import { getUnicodePiece } from "./utils";
import { checkMoves } from "./moves";

const currentMoves = computed(() =>
  checkMoves(
    selectedTile.value[0],
    selectedTile.value[1],
    board.value,
    selectedTile.value[2]
  )
);
const selectedTile = ref<[number, number, number]>([-1, -1, 0]);

const board = ref(getBoardFromFen());
</script>
<style scoped lang="scss">
$tileSize: 75px;
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
  background-color: #a59b9b;
}
.tile {
  rotate: 270deg;
  width: $tileSize;
  height: $tileSize;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.row {
  rotate: 180deg;
}

.row:nth-child(odd) .tile:nth-child(even) {
  background: #854000;
}
.row:nth-child(even) .tile:nth-child(odd) {
  background: #854000;
}
.possibleMove {
  background-color: #2998ff4d !important;
}
</style>
