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

let left = 0;
let right = 0;
let min = Infinity;

while (right < arr.length && left <= right) {
  if (arr[right] - arr[left] >= M) {
    min = Math.min(min, arr[right] - arr[left]);
    left++;
  }

  if (arr[right] - arr[left] < M) right++;
}

console.log(min);
