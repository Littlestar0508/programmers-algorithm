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

const [N, K] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1).map(Number);

const dp = Array(K + 1).fill(0);
dp[0] = 1;

for (let i = 0; i < arr.length; i++) {
  for (let j = arr[i]; j <= K; j++) {
    dp[j] += dp[j - arr[i]];
  }
}

console.log(dp[K]);
