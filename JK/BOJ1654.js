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

const [K, N] = input[0].split(" ").map(Number);
const arr = [];

for (let i = 1; i < input.length; i++) {
  arr.push(Number(input[i]));
}

let start = 1;
let end = Math.max(...arr);

let max = -1;

while (start <= end) {
  let mid = Math.floor((start + end) / 2);
  let sum = arr.reduce((acc, cur) => {
    return (acc += Math.floor(cur / mid));
  }, 0);

  if (sum >= N) {
    max = Math.max(max, mid);
    start = mid + 1;
  } else if (sum < N) {
    end = mid - 1;
  }
}

console.log(max);
