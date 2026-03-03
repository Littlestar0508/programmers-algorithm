const fs = require("fs");
const path = require("path");

let N = Number(
  fs
    .readFileSync(
      process.platform === "linux"
        ? "/dev/stdin"
        : path.join(__dirname, "test.txt"),
    )
    .toString()
    .trim(),
);

const answer = [];
answer.push(1);
answer.push(2);

for (let i = 2; i < N; i++) {
  const nextAns = answer[i - 1] + answer[i - 2];
  answer.push(nextAns % 10007);
}

console.log(answer[N - 1]);
