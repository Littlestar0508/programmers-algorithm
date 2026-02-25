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
const total = Number(input[2]);

let start = 0;
let end = Math.max(...arr);

let answer = 0;

const total_sum = arr.reduce((acc, cur) => (acc += cur), 0);

if (total_sum < total) console.log(Math.max(...arr));
else {
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += mid > arr[i] ? arr[i] : mid;
    }

    if (sum > total) {
      end = mid - 1;
    } else {
      answer = Math.max(answer, mid);
      start = mid + 1;
    }
  }

  console.log(answer);
}
