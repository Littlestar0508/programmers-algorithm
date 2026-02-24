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

const [N, K] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let right = 0;
let odd = 0;
let answer = 0;

for (let left = 0; left < N; left++) {
  while (right < N) {
    if (arr[right] % 2 === 1) {
      if (odd === K) break;
      odd++;
    }
    right++;
  }

  answer = Math.max(answer, right - left - odd);
  if (arr[left] % 2 === 1) odd--;
}

console.log(answer);
