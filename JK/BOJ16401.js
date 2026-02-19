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

const [M, N] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let start = 1;
let end = Math.max(...arr);
let ans = 0;

while (start <= end) {
  let mid = Math.floor((start + end) / 2);
  let sum = 0;

  for (snack of arr) {
    sum += Math.floor(snack / mid);
  }

  if (sum < M) {
    end = mid - 1;
  } else {
    start = mid + 1;
    ans = mid;
  }
}

console.log(ans);
