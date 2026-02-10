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

const [N, S] = input[0].split(" ").map(Number);
const [...arr] = input[1].split(" ").map(Number);

let count = 0;

const dfs = (depth, sum) => {
  if (depth === N) {
    if (sum === S) {
      count++;
    }
    return;
  }

  dfs(depth + 1, sum);
  dfs(depth + 1, sum + arr[depth]);
};

dfs(0, 0);

if (S === 0) count--;

console.log(count);
