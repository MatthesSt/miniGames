<template>
  <main
    class="d-flex justify-content-center align-items-center flex-column"
    style="height: 100vh; background-color: #28a068"
  >
    <div class="d-grid" :style="`grid-template-columns:repeat(${6},1fr)`">
      <div class="tile" v-for="n in 36">
        <div
          v-if="(getTileX(n)as Index | 5) != 5 && (getTileY(n)as Index | 5) != 5"
        >
          <div class="row w-100 h-100">
            <div
              class="col-6 p-0 d-flex justify-content-center align-items-center"
            >
              {{ getProbability(n, 0) }}
            </div>
            <div
              class="col-6 p-0 d-flex justify-content-center align-items-center"
            >
              {{ getProbability(n, 1) }}
            </div>
            <div
              class="col-6 p-0 d-flex justify-content-center align-items-center"
            >
              {{ getProbability(n, 2) }}
            </div>
            <div
              class="col-6 p-0 d-flex justify-content-center align-items-center"
            >
              {{ getProbability(n, 3) }}
            </div>
          </div>
        </div>
        <div
          v-else-if="(getTileX(n)as Index | 5) == 5 && (getTileY(n)as Index | 5) == 5"
        ></div>
        <div v-else class="flex-column">
          <input
            :disabled="solving"
            class="w-75"
            type="number"
            v-if="(getTileX(n)as Index | 5) == 5"
            v-model="inputValues[`r${getTileY(n)}0`]"
          />
          <input
            :disabled="solving"
            class="w-75"
            type="number"
            v-if="(getTileX(n)as Index | 5) == 5"
            v-model="inputValues[`r${getTileY(n)}1`]"
          />
          <input
            :disabled="solving"
            class="w-75"
            type="number"
            v-if="(getTileY(n)as Index | 5) == 5"
            v-model="inputValues[`c${getTileX(n)}0`]"
          />
          <input
            :disabled="solving"
            class="w-75"
            type="number"
            v-if="(getTileY(n)as Index | 5) == 5"
            v-model="inputValues[`c${getTileX(n)}1`]"
          />
        </div>
      </div>
    </div>
    <div>
      <button class="btn btn-primary mt-4" @click.stop="solve">Solve</button>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";

const solving = ref(false);

type Index = 0 | 1 | 2 | 3 | 4;

const inputValues = ref({
  r00: 4,
  r01: 1,
  r10: 9,
  r11: 1,
  r20: 1,
  r21: 4,
  r30: 6,
  r31: 1,
  r40: 6,
  r41: 1,
  c00: 6,
  c01: 2,
  c10: 5,
  c11: 1,
  c20: 6,
  c21: 1,
  c30: 6,
  c31: 2,
  c40: 3,
  c41: 2,
});

function getPermutationOfRow(sum: number, bombs: number) {
  const nums = [0, 1, 2, 3];
  const result = [];
  for (let a of nums) {
    for (let b of nums) {
      for (let c of nums) {
        for (let d of nums) {
          for (let e of nums) {
            if (
              a + b + c + d + e == sum &&
              [a, b, c, d, e].filter((e) => e == 0).length == bombs
            )
              result.push([a, b, c, d, e]);
          }
        }
      }
    }
  }
  // [
  //   ...new Set(result.map((e) => e.sort((a, b) => a - b).toString())),
  // ].map((e) => e.split(",").map((e) => +e))
  return result;
}
// function safeTileProbability(n: number) {
//   const greaterOneProbability = getGreaterOneProbability(n);
//   const bombProbabilty = getBombProbability(n);

//   const probability = greaterOneProbability - bombProbabilty;
//   const result = probability > 0 ? probability : 0;

//   return result;
// }

function getProbability(n: number, value: number) {
  const rowPermutations = getPermutationOfRow(
    inputValues.value[`r${getTileY(n)}0`],
    inputValues.value[`r${getTileY(n)}1`]
  );
  const colPermutations = getPermutationOfRow(
    inputValues.value[`c${getTileX(n)}0`],
    inputValues.value[`c${getTileX(n)}1`]
  );

  let result = 1;

  result *=
    rowPermutations.flat().reduce((a, c) => a + +(c == value), 0) /
    rowPermutations.flat().length;
  result *=
    colPermutations.flat().reduce((a, c) => a + +(c == value), 0) /
    colPermutations.flat().length;

  return Math.floor(result * 100);
}

function getTileX(n: number) {
  return (~~(n - 1) % 6) as Index;
}
function getTileY(n: number) {
  return ~~((n - 1) / 6) as Index;
}

function solve() {
  solving.value = true;
}
</script>
<style lang="scss" scoped>
$size: 75px;
.tile {
  width: $size;
  height: $size;
  border: 1px solid black;
  background-color: #188060;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
}
</style>
