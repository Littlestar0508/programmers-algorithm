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

const [n, m] = input.split(" ").map(Number);

const selected = [];
const answer = [];

const dfs = (depth) => {
  if (depth === m) {
    answer.push(selected.join(" "));
    return;
  }

  for (let i = 0; i < n; i++) {
    selected[depth] = i + 1;
    dfs(depth + 1);
  }
};

dfs(0);

console.log(answer.join("\n"));
