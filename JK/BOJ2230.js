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

const [N, M] = input[0].split(" ").map(Number);
const arr = [];

for (let i = 1; i < input.length; i++) {
  arr.push(Number(input[i]));
}

arr.sort((a, b) => a - b);

let diff = Infinity;
let start = 0;
let end = 0;

while (start <= end && end < N) {
  const curDiff = arr[end] - arr[start];
  if (curDiff < M) {
    end++;
  } else {
    diff = Math.min(diff, curDiff);
    start++;
  }

  if (curDiff === M) {
    break;
  }
}

console.log(diff);
