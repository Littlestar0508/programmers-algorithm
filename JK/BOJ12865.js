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
const dp = Array.from(Array(N + 1), () => Array(K + 1).fill(0));
let answer = 0;

for (let i = 1; i < input.length; i++) {
  const [weight, cost] = input[i].split(" ").map(Number);

  for (let j = 1; j <= K; j++) {
    if (j - weight >= 0)
      dp[i][j] = Math.max(dp[i - 1][j - weight] + cost, dp[i - 1][j]);
    else dp[i][j] = dp[i - 1][j];
  }
}

console.log(dp);
