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

const [T, W] = input[0].split(" ").map(Number);
const arr = [];

arr[0] = 0;
for (let i = 1; i < input.length; i++) {
  arr.push(Number(input[i]));
}

const DP = Array.from({ length: 3 }, () =>
  Array.from({ length: T + 1 }, () => Array(W + 1).fill(-Infinity)),
);

DP[1][0][0] = 0;

for (let i = 1; i <= T; i++) {
  for (let j = 0; j <= W; j++) {
    DP[1][i][j] = DP[1][i - 1][j];
    if (j > 0) DP[1][i][j] = Math.max(DP[1][i][j], DP[2][i - 1][j - 1]);
    if (arr[i] === 1) DP[1][i][j] += 1;

    DP[2][i][j] = DP[2][i - 1][j];
    if (j > 0) DP[2][i][j] = Math.max(DP[2][i][j], DP[1][i - 1][j - 1]);
    if (arr[i] === 2) DP[2][i][j] += 1;
  }
}

let ans = 0;

for (let i = 0; i <= W; i++) {
  ans = Math.max(ans, DP[1][T][i], DP[2][T][i]);
}

console.log(ans);
