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

let [N, ...arr] = input;
let answer = Infinity;
const M = Number(N) / 2;
arr = arr.map((item) => item.split(" ").map(Number));
const visited = Array(Number(N)).fill(false);

const dfs = (depth, index) => {
  if (depth === M) {
    let start = 0;
    let link = 0;

    arr.forEach((item, i) => {
      if (visited[i]) {
        item.forEach((inner, idx) => {
          if (visited[idx]) start += inner;
        });
      } else {
        item.forEach((inner, idx) => {
          if (!visited[idx]) link += inner;
        });
      }
    });

    const min = Math.abs(start - link);

    answer = Math.min(min, answer);

    return;
  }

  for (let i = index; i < Number(N); i++) {
    if (visited[i]) continue;
    visited[i] = true;
    dfs(depth + 1, i + 1);
    visited[i] = false;
  }
};

dfs(0, 0);

console.log(answer);
