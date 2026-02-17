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

let answer = 0;
let start = 0;
let end = 0;
let sum = arr[0];

while (start < N && end < N) {
  if (sum === M) answer++;

  if (sum <= M) {
    end++;
    sum += arr[end];
  } else {
    sum -= arr[start];
    start++;
  }
}

console.log(answer);
