const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim();

const N = Number(input);

const DP = Array(N + 1).fill(-1);

DP[3] = 1;
DP[5] = 1;

for (let i = 6; i < DP.length; i++) {
  let tmp = [];
  if (DP[i - 3] !== -1) tmp.push(DP[i - 3] + 1);
  if (DP[i - 5] !== -1) tmp.push(DP[i - 5] + 1);
  if (tmp.length > 0) DP[i] = Math.min(...tmp);
}

console.log(DP[N]);
