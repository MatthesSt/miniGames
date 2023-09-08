<template>
  <main
    class="d-flex justify-content-center align-items-center flex-column"
    style="height: 100vh; background-color: #28a068"
  >
    <div class="d-grid" :style="`grid-template-columns:repeat(${6},1fr)`">
      <div class="tile" v-for="n in 36" @click.stop="selectedTile = n">
        <div
          v-if="(getTileX(n)as Index | 5) != 5 && (getTileY(n)as Index | 5) != 5"
        >
          <div
            class="row w-100 h-100"
            :style="`background-color:${selectedTile == n ? 'lightgreen' : ''}`"
          >
            {{ currentBoard[n] }}
            <!-- <div
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
            </div> -->
          </div>
        </div>
        <div
          v-else-if="(getTileX(n)as Index | 5) == 5 && (getTileY(n)as Index | 5) == 5"
        ></div>
        <div v-else class="flex-column">
          <template v-if="(getTileX(n)as Index | 5) == 5">
            {{ possiblePermutations[`r${getTileY(n)}`].length }}
            <input
              :disabled="solving"
              class="w-75"
              type="number"
              v-model="inputValues[`r${getTileY(n)}0`]"
            />
            <input
              :disabled="solving"
              class="w-75"
              type="number"
              v-model="inputValues[`r${getTileY(n)}1`]"
            />
          </template>
          <template v-if="(getTileY(n)as Index | 5) == 5">
            {{ possiblePermutations[`c${getTileX(n)}`].length }}
            <input
              :disabled="solving"
              class="w-75"
              type="number"
              v-model="inputValues[`c${getTileX(n)}0`]"
            />
            <input
              :disabled="solving"
              class="w-75"
              type="number"
              v-model="inputValues[`c${getTileX(n)}1`]"
            />
          </template>
        </div>
      </div>
    </div>
    <div>
      <div v-if="selectedTile" class="mt-4">
        <div class="d-flex flex-wrap">
          <button
            class="btn btn-primary w-50 border"
            @click.stop="currentBoard[selectedTile] = 0"
          >
            0
          </button>
          <button
            class="btn btn-primary w-50 border"
            @click.stop="currentBoard[selectedTile] = 1"
          >
            1
          </button>
          <button
            class="btn btn-primary w-50 border"
            @click.stop="currentBoard[selectedTile] = 2"
          >
            2
          </button>
          <button
            class="btn btn-primary w-50 border"
            @click.stop="currentBoard[selectedTile] = 3"
          >
            3
          </button>
        </div>
      </div>
      <!-- <button class="btn btn-primary mt-4" @click.stop="solve">Solve</button> -->
    </div>
  </main>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";

const solving = ref(false);

const selectedTile = ref(-1);

const currentBoard = ref(Array(36).fill(null));

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

watch(selectedTile, () => {
  console.log({ selectedTile: selectedTile.value });
});

const possiblePermutations = computed(() => ({
  r0: getPermutationOfLine("r0").filter((e) => permutationFilter(e, 0, true)),
  r1: getPermutationOfLine("r1").filter((e) => permutationFilter(e, 6, true)),
  r2: getPermutationOfLine("r2").filter((e) => permutationFilter(e, 12, true)),
  r3: getPermutationOfLine("r3").filter((e) => permutationFilter(e, 18, true)),
  r4: getPermutationOfLine("r4").filter((e) => permutationFilter(e, 24, true)),
  c0: getPermutationOfLine("c0").filter((e) => permutationFilter(e, 0, false)),
  c1: getPermutationOfLine("c1").filter((e) => permutationFilter(e, 1, false)),
  c2: getPermutationOfLine("c2").filter((e) => permutationFilter(e, 2, false)),
  c3: getPermutationOfLine("c3").filter((e) => permutationFilter(e, 3, false)),
  c4: getPermutationOfLine("c4").filter((e) => permutationFilter(e, 4, false)),
}));

function permutationFilter(permutation: number[], offset = 0, row: boolean) {
  for (const num of row ? [0, 1, 2, 3, 4] : [0, 6, 12, 18, 24]) {
    if (
      currentBoard.value[num + 1 + offset] != null &&
      permutation[num] != currentBoard.value[num + 1 + offset]
    )
      return false;
  }
  return true;
}

function getPermutationOfLine(input: string) {
  const sum = inputValues.value[`${input}0` as keyof typeof inputValues.value];
  const bombs =
    inputValues.value[`${input}1` as keyof typeof inputValues.value];
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

// function getProbability(n: number, value: number) {
//   const rowPermutations = getPermutationOfLine(
//     inputValues.value[`r${getTileY(n)}0`],
//     inputValues.value[`r${getTileY(n)}1`]
//   );
//   const colPermutations = getPermutationOfLine(
//     inputValues.value[`c${getTileX(n)}0`],
//     inputValues.value[`c${getTileX(n)}1`]
//   );

//   let result = 1;

//   result *=
//     rowPermutations.flat().reduce((a, c) => a + +(c == value), 0) /
//     rowPermutations.flat().length;
//   result *=
//     colPermutations.flat().reduce((a, c) => a + +(c == value), 0) /
//     colPermutations.flat().length;

//   return Math.floor(result * 100);
// }

function getTileX(n: number) {
  return (~~(n - 1) % 6) as Index;
}
function getTileY(n: number) {
  return ~~((n - 1) / 6) as Index;
}

// function solve() {
//   solving.value = true;
// }
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
