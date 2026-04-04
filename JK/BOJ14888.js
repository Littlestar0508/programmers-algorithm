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

const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);
const order = input[2].split(" ").map(Number);

const calculate = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => (a < 0 ? -Math.floor(Math.abs(a) / b) : Math.floor(a / b)) || 0,
];

let min = Infinity;
let max = -Infinity;

function dfs(depth, result) {
  if (depth === N - 1) {
    max = Math.max(max, result);
    min = Math.min(min, result);
    return;
  }

  for (let i = 0; i < order.length; i++) {
    if (order[i] === 0) continue;

    order[i]--;
    dfs(depth + 1, calculate[i](result, nums[depth + 1]));
    order[i]++;
  }
}

dfs(0, nums[0]);

console.log(max);
console.log(min);
