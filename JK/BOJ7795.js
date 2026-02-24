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
let idx = 1;

for (let i = 0; i < N; i++) {
  let answer = 0;
  idx++;
  const A = input[idx++].split(" ").map(Number);
  const B = input[idx++].split(" ").map(Number);

  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);

  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      if (A[i] > B[j]) answer++;
    }
  }

  console.log(answer);
}
