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
const arr = input[1].split(" ").map(Number);

let start = 1;
let end = Math.max(...arr);
let ans = 0;

while (start <= end) {
  let mid = Math.floor((start + end) / 2);
  let sum = 0;

  arr.forEach((e) => {
    sum += e - mid >= 0 ? e - mid : 0;
  });

  if (sum >= M) {
    ans = Math.max(ans, mid);
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}

console.log(ans);
