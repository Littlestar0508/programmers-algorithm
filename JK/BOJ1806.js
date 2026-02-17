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

for (let i = 1; i < arr.length; i++) {
  arr[i] = arr[i] + arr[i - 1];
}

let len = Infinity;
let start = 0;
let end = 0;

while (start <= end && end < N) {
  const sum = start === 0 ? arr[end] : arr[end] - arr[start - 1];

  if (sum >= M) {
    len = Math.min(len, end - start + 1);
    start++;
  } else {
    end++;
  }
}

console.log(len === Infinity ? 0 : len);
