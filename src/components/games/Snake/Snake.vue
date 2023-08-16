<template>
  <main>
    <header class="d-flex justify-content-center p-4">
      Score: {{ currentScore }}
    </header>
    <div class="board" :style="`width:${columns * tileSize}px`">
      <template v-for="c in columns">
        <template v-for="r in rows"
          ><div
            class="tile"
            :style="`height:${tileSize}px;width:${tileSize}px`"
          >
            {{ c }},{{ r }}
          </div></template
        >
      </template>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";

const currentScore = ref(0);
const rows = ref(15);
const columns = ref(15);
const tileSize = ref(40);
</script>
<style scoped>
.board {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
  outline: 1px solid black;
}
.tile {
  border: 1px solid black;
  background-color: rgb(94, 238, 37);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
