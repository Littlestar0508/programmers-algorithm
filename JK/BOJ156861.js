const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim()
  .split(/\r?\n/);

const [N, M] = input[0].split(" ").map(Number);

const arr = [];

for (let i = 1; i < input.length; i++) {
  arr[i - 1] = input[i].split(" ").map(Number);
}

const chicken = [];
const home = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 2) chicken.push([i, j]);
    if (arr[i][j] === 1) home.push([i, j]);
  }
}

let min = Infinity;
const chk = Array.from(chicken.length).fill(false);
const selected = [];

function Combination(idx) {
  if (selected.length === M) {
    min = Math.min(min, CalculateMin());
    return;
  }

  for (let i = idx; i < chicken.length; i++) {
    if (chk[i]) continue;
    chk[i] = true;
    selected.push(chicken[i]);
    Combination(i + 1);
    selected.pop();
    chk[i] = false;
  }
}

function CalculateMin() {
  let totalDist = 0;

  for (let i = 0; i < home.length; i++) {
    let dist = Infinity;

    for (let j = 0; j < selected.length; j++) {
      dist = Math.min(dist, CalculateDist(home[i], selected[j]));
    }

    totalDist += dist;
  }

  return totalDist;
}

function CalculateDist(x, y) {
  const distX = Math.abs(x[0] - y[0]);
  const distY = Math.abs(x[1] - y[1]);

  return distX + distY;
}

Combination(0);

console.log(min);
