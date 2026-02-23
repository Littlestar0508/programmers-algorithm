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

let min = Infinity;

let left = 0;
let right = N - 1;

while (left < right) {
  const sum = arr[left] + arr[right];

  if (Math.abs(min) > Math.abs(sum)) min = sum;

  if (sum < 0) {
    left++;
  } else {
    right--;
  }
}

console.log(min);
