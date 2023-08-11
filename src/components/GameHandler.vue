<template>
  <component
    v-if="selectedGame"
    :is="Games[selectedGame as (keyof typeof Games)]"
  ></component>
  <div v-if="!selectedGame" class="bg-secondary d-flex flex-wrap">
    <div
      @click.stop="selectedGame = game"
      class="gameSelect"
      role="button"
      v-for="game in Object.keys(Games)"
    >
      {{ game }}
    </div>
  </div>
</template>
<script setup lang="ts">
import * as Games from "./games";
import { ref } from "vue";

const selectedGame = ref<string | null>(null);
</script>
<style scoped>
.gameSelect {
  height: 100px;
  width: 100px;
  background-color: rgb(94, 238, 37);
  border-radius: 10px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
