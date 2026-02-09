const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim()
  .split(/\r?\n/);

let answer = Infinity;
const [N, M] = input[0].split(" ").map(Number);
const arr = [];

for (let i = 1; i < input.length; i++) {
  arr[i - 1] = input[i].split(" ").map(Number);
}

const chicken = [];
const house = [];

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr[0].length; j++) {
    if (arr[i][j] === 1) house.push([i, j]);
    if (arr[i][j] === 2) chicken.push([i, j]);
  }
}

const visited = Array(chicken.length).fill(false);

const calc_min = () => {
  let sum = 0;

  house.forEach((h) => {
    let min = Infinity;

    chicken.forEach((c, idx) => {
      if (visited[idx]) {
        min = Math.min(min, Math.abs(h[0] - c[0]) + Math.abs(h[1] - c[1]));
      }
    });

    sum += min;
  });

  return sum;
};

const dfs = (depth, index) => {
  if (depth === M) {
    answer = Math.min(answer, calc_min());
    return;
  }

  for (let i = index; i < chicken.length; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    dfs(depth + 1, i);
    visited[i] = false;
  }
};

dfs(0, 0);

console.log(answer);
