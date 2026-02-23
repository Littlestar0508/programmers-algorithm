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
arr.sort((a, b) => a - b);

let right = arr.length - 1;
let left = 0;
let sum = Infinity;

let ml = 0;
let mr = 0;

while (left < right) {
  let cur_sum = arr[left] + arr[right];

  if (sum > Math.abs(cur_sum)) {
    ml = left;
    mr = right;
    sum = Math.abs(cur_sum);
  }

  if (cur_sum >= 0) {
    right--;
  } else {
    left++;
  }
}

console.log(arr[ml], arr[mr]);
