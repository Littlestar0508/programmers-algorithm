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
  .split(" ")
  .map(Number);

const str = [];
const visited = Array(input[0]).fill(false);

const dfs = (depth, index, arr) => {
  if (depth === input[1]) {
    str.push(arr.join(" "));
    return;
  }

  for (let i = 0; i < input[0]; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    arr.push(i + 1);
    dfs(depth + 1, i + 1, arr);
    visited[i] = false;
    arr.pop();
  }
};

dfs(0, 0, []);

console.log(str.join("\n"));
