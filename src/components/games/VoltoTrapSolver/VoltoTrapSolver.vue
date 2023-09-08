<template>
  <main
    class="d-flex justify-content-center align-items-center flex-column"
    style="height: 100vh; background-color: #28a068"
  >
    <div class="d-grid" :style="`grid-template-columns:repeat(${6},1fr)`">
      <div class="tile" v-for="n in 36" @click.stop="selectedTile = n">
        <div
          v-if="(getTileX(n)as Index | 5) != 5 && (getTileY(n)as Index | 5) != 5"
          class="w-100 h-100 position-relative"
          :style="`background-color:${selectedTile == n ? 'lightgreen' : ''}`"
        >
          <div
            style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-weight: bold;
              font-size: 1.4rem;
            "
          >
            {{ currentBoard[n] }}
          </div>
          <div style="position: absolute; top: 5px; left: 5px">
            {{ getProbability(n)[0] }}
          </div>
          <div style="position: absolute; top: 5px; right: 5px">
            {{ getProbability(n)[1] }}
          </div>
          <div style="position: absolute; bottom: 5px; left: 5px">
            {{ getProbability(n)[2] }}
          </div>
          <div style="position: absolute; bottom: 5px; right: 5px">
            {{ getProbability(n)[3] }}
          </div>
        </div>
        <div
          v-else-if="(getTileX(n)as Index | 5) == 5 && (getTileY(n)as Index | 5) == 5"
        ></div>
        <div v-else class="flex-column">
          <template v-if="(getTileX(n)as Index | 5) == 5">
            {{
              getPermutationsOfLine(`r${getTileY(n)}`).filter((e) =>
                permutationFilter(e, getTileY(n) * 6, true)
              ).length
            }}
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
            {{
              getPermutationsOfLine(`c${getTileX(n)}`).filter((e) =>
                permutationFilter(e, getTileX(n), false)
              ).length
            }}
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
    <div class="w-50 d-flex justify-content-between mt-4">
      <div v-if="selectedTile">
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
          <button
            class="btn btn-primary w-50 border"
            @click.stop="currentBoard[selectedTile] = null"
          >
            null
          </button>
        </div>
      </div>
      <button class="btn btn-primary mt-4" @click.stop="solve">Solve</button>
    </div>
  </main>
</template>
<script setup lang="ts">
import { ref } from "vue";

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

function permutationFilter(
  permutation: number[],
  offset: number,
  row: boolean
) {
  for (const num of row ? [0, 1, 2, 3, 4] : [0, 6, 12, 18, 24]) {
    if (
      currentBoard.value[num + 1 + offset] != null &&
      permutation[num / (row ? 1 : 6)] != currentBoard.value[num + 1 + offset]
    )
      return false;
  }
  return true;
}

function getPermutationsOfLine(input: string) {
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
  return result;
}

function getProbability(n: number) {
  return [
    getProbabilityForNumber(n, 0),
    getProbabilityForNumber(n, 1),
    getProbabilityForNumber(n, 2),
    getProbabilityForNumber(n, 3),
  ].map((e, _, arr) =>
    Math.floor(e * (100 / arr.reduce((acc, cur) => acc + cur, 0)))
  );
}

function getProbabilityForNumber(n: number, num: 0 | 1 | 2 | 3) {
  const rowPermutations = getPermutationsOfLine(`r${getTileY(n)}`).filter((e) =>
    permutationFilter(e, getTileY(n) * 6, true)
  );
  const colPermuations = getPermutationsOfLine(`c${getTileX(n)}`).filter((e) =>
    permutationFilter(e, getTileX(n), false)
  );

  const rowProbability =
    rowPermutations.reduce((acc, cur) => acc + +(cur[getTileX(n)] == num), 0) /
    rowPermutations.length;
  const colProbability =
    colPermuations.reduce((acc, cur) => acc + +(cur[getTileY(n)] == num), 0) /
    colPermuations.length;

  if (rowProbability == 0 || colProbability == 0) return 0;
  if (rowProbability == 1 || colProbability == 1) return 1;

  return rowProbability > colProbability ? rowProbability : colProbability;
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
input {
  border: none;
  padding: 0;
}
</style>
