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

const arr = [];
const chk = Array.from(N + 1).fill(false);
const answer = new Set();

for (let i = 1; i < input.length; i++) {
  arr.push(Number(input[i]));
}

for (let i = 1; i <= N; i++) {
  if (chk[i]) continue;
  const selected = [];
  dfs(i, i, selected);
}

function dfs(idx, cur, selected) {
  if (chk[cur]) {
    if (idx === cur) answer.add(...selected);
    return;
  }

  chk[cur] = true;
  selected.push(cur);
  dfs(idx, arr[cur - 1], selected);
  selected.pop();
  chk[cur] = false;
}

const log = Array.from(answer);
console.log(log.length);
console.log(log.join("\n"));
