<template>
  <main class="bg-secondary d-flex flex-wrap">
    <div
      @click.stop="router.push(`/game/Snake`)"
      class="gameSelect"
      role="button"
      v-for="game in games"
    >
      {{ game }}
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";
import router from "../router";

const games = ref(["SNAKE"]);
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
