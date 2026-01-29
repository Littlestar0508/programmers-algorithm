const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim();

let answer = 0;
let [n, arr, target] = input.split(/\r?\n/);

arr = arr.split(" ").map(Number);
n = +n;
target = +target;

arr.sort((a, b) => a - b);

let start = 0;
let end = arr.length - 1;

while (start < end) {
  const sum = arr[start] + arr[end];

  if (sum === target) answer++;
  if (sum <= target) {
    start++;
  } else {
    end--;
  }
}

console.log(answer);
