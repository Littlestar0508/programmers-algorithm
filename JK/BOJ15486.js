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

for (let i = 1; i < input.length; i++) {
  arr.push(input[i].split(" ").map(Number));
}

const answer = Array(N + 1).fill(0);
let max = 0;

for (let i = 0; i < N; i++) {
  max = Math.max(max, answer[i]);

  if (i + arr[i][0] <= N)
    answer[i + arr[i][0]] = Math.max(answer[i + arr[i][0]], max + arr[i][1]);
}

console.log(Math.max(...answer));
