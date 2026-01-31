const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim();

const board = Array.from({ length: +input }, () => Array(+input).fill(0));
const queens = [];
let answer = 0;

const chk = (x, y) => {
  for (const [a, b] of queens) {
    if (a === x || b === y) return false;
    if (Math.abs(x - a) === Math.abs(y - b)) return false;
  }

  return true;
};

const dfs = (depth) => {
  if (+input === depth) {
    answer++;
    return;
  }

  for (let i = 0; i < +input; i++) {
    if (!chk(depth, i)) continue;
    queens.push([depth, i]);
    dfs(depth + 1);
    queens.pop();
  }
};

dfs(0);

console.log(answer);
