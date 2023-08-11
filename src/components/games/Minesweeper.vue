<template>
  <main class="d-flex flex-column justify-content-center align-items-center">
    <div class="row w-100 mb-4">
      <h1 class="col-6 offset-3 text-center">Minesweeper</h1>
      <div class="col-3 d-flex align-items-center fw-bold" v-if="started">
        {{ timer }}
      </div>
    </div>
    <div
      v-if="started"
      class="fieldContainer"
      :style="`
        width:${width * 50}px;
        grid-template-columns: repeat(${width}, 1fr)
      `"
    >
      <template v-for="(col, xIndex) in field">
        <div
          @click="clickTile(tile, xIndex, yIndex)"
          @contextmenu.prevent="
            () => (tile.isOpen ? {} : (tile.isFlag = !tile.isFlag))
          "
          class="tile"
          :class="tile.isOpen ? 'open' : ''"
          v-for="(tile, yIndex) in col"
        >
          {{ getTileContent(xIndex, yIndex) }}
        </div>
      </template>
    </div>
    <div v-else>
      <div class="row g-0">
        <label class="col-2 offset-4" for="width">Width:</label>
        <input type="number" v-model="width" class="col-2" />
        <label class="col-2 offset-4" for="height">Height:</label>
        <input type="number" v-model="height" class="col-2" />
        <button @click="startGame" class="btn btn-primary mt-4 col-6 offset-3">
          Start
        </button>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";

const width = ref(11);
const height = ref(11);

const started = ref(false);
type Tile = { isBomb: boolean; isFlag: boolean; isOpen: boolean };
const field = ref<Tile[][]>([]);
const timer = ref(0);
const timerStarted = ref(false);

function startGame() {
  generateField();
  generateBombs();
  started.value = true;
}
function generateBombs() {
  const bombs = Math.floor((width.value * height.value) / 7);
  for (let i = 0; i < bombs; i++) {
    const x = Math.floor(Math.random() * width.value);
    const y = Math.floor(Math.random() * height.value);
    field.value[x][y].isBomb = true;
  }
  for (let i = -1; i <= 1; i++) {
    if (width.value / 2 + i < 0 || width.value / 2 + i >= width.value) continue;
    for (let j = -1; j <= 1; j++) {
      if (height.value / 2 + j < 0 || height.value / 2 + j >= height.value)
        continue;
      field.value[Math.floor(width.value / 2 + i)][
        Math.floor(height.value / 2 + j)
      ].isBomb = false;
    }
  }
}

function generateField() {
  field.value = Array.from({ length: height.value }, () =>
    Array.from({ length: width.value }, () => ({
      isBomb: false,
      isFlag: false,
      isOpen: false,
    }))
  );
}
function getNearBombCount(x: number, y: number) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    if (x + i < 0 || x + i >= width.value) continue;
    for (let j = -1; j <= 1; j++) {
      if (y + j < 0 || y + j >= height.value) continue;
      if (field.value[x + i][y + j].isBomb) count++;
    }
  }
  return count;
}

function getTileContent(xIndex: number, yIndex: number) {
  const tile = field.value[xIndex][yIndex];
  if (tile.isFlag) return "🚩";
  if (!tile.isOpen) return "";
  if (tile.isBomb) return "💣";
  return getNearBombCount(xIndex, yIndex);
}
function clickTile(tile: Tile, xIndex: number, yIndex: number) {
  if (!timerStarted.value) {
    timerStarted.value = true;
    let interval = setInterval(() => {
      if (started.value) timer.value++;
      else clearInterval(interval);
    }, 1000);
  }
  if (tile.isFlag) return;
  tile.isOpen = true;
  if (tile.isBomb) {
    alert("Game Over");
    started.value = false;
  }

  if (getNearBombCount(xIndex, yIndex) === 0) {
    for (let i = -1; i <= 1; i++) {
      if (xIndex + i < 0 || xIndex + i >= width.value) continue;
      for (let j = -1; j <= 1; j++) {
        if (yIndex + j < 0 || yIndex + j >= height.value) continue;
        if (field.value[xIndex + i][yIndex + j].isOpen) continue;
        setTimeout(() => {
          clickTile(
            field.value[xIndex + i][yIndex + j],
            xIndex + i,
            yIndex + j
          );
        }, 50);
      }
    }
  }
  if (checkWin())
    setTimeout(() => ((started.value = false), alert("You Win")), 100);
}
function checkWin() {
  return field.value.every((col) =>
    col.every((tile) => tile.isOpen || tile.isBomb)
  );
}
</script>
<style scoped>
main {
  height: 100vh;
}
.fieldContainer {
  display: grid;
  border: 1px solid black;
}
.tile {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  &.open:nth-child(odd) {
    background-color: rgb(141, 105, 37);
  }
  &.open:nth-child(even) {
    background-color: rgb(209, 165, 83);
  }
  &:nth-child(odd) {
    background-color: rgb(60, 155, 23);
  }
  &:nth-child(even) {
    background-color: rgb(147, 236, 112);
  }
}
</style>
