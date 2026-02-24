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
const set = new Set();
let left = 0;
let answer = 0;

for (let right = 0; right < N; right++) {
  while (set.has(arr[right])) {
    set.delete(arr[left]);
    left++;
  }

  set.add(arr[right]);

  answer += right - left + 1;
}

console.log(answer);
