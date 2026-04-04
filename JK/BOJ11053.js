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
const arr = input[1].split(" ").map(Number);

const dp = Array(N).fill(0);

for (let i = 1; i < arr.length; i++) {
  let max = 0;

  for (let j = 0; j <= i; j++) {
    if (arr[j] < arr[i]) max = Math.max(max, dp[j]);
  }
  dp[i] = max + 1;
}

console.log(dp);
