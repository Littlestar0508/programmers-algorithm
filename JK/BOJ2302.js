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
  .split(/\r?\n/)
  .map(Number);

const [N, M, ...arr] = input;
arr.push(N + 1);

const DP = [];

DP.push(1);
DP.push(1);
DP.push(2);

for (let i = 3; i <= N; i++) {
  DP[i] = DP[i - 1] + DP[i - 2];
}

let ans = 1;

for (let i = 0; i < arr.length; i++) {
  let cur;
  if (i === 0) {
    cur = arr[i] - 1;
  } else {
    cur = arr[i] - arr[i - 1] - 1;
  }

  ans *= DP[cur];
}

console.log(ans);
