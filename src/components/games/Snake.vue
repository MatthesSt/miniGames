<template>
  <main>
    <header class="d-flex justify-content-center p-4">
      Score: {{ currentScore }}
    </header>
    <div class="board">
      <template v-for="c in columns">
        <template v-for="r in rows"
          ><div class="tile">{{ c }},{{ r }}</div></template
        >
      </template>
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

const currentScore = ref(0);
const rows = ref(15);
const columns = ref(15);
const tileSize = ref("40px");
const size = computed(
  () => columns.value * +tileSize.value.substring(0, 2) + "px"
);
</script>
<style scoped>
.board {
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  width: v-bind(size);
}
.tile {
  box-sizing: border-box;
  border: 1px solid black;
  height: v-bind(tileSize);
  width: v-bind(tileSize);
  background-color: rgb(94, 238, 37);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
