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
  .split(/\r?\n/)
  .map(Number);

const [N, ...arr] = input;

const answer = [];

answer.push(1);
answer.push(2);
answer.push(4);
answer.push(7);

for (let i = 4; i < 11; i++) {
  const nextAns = answer[i - 1] + answer[i - 2] + answer[i - 3];
  answer.push(nextAns);
}

for (let i = 0; i < N; i++) {
  console.log(answer[arr[i] - 1]);
}
