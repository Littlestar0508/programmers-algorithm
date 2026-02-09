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
  .split(" ")
  .map(Number);

const str = [];

const dfs = (depth, idx, arr) => {
  if (depth === input[1]) {
    str.push(arr.join(" "));
    return;
  }

  for (let i = idx; i < input[0]; i++) {
    arr.push(i + 1);
    dfs(depth + 1, i, arr);
    arr.pop();
  }
};

dfs(0, 0, []);

console.log(str.join("\n"));
