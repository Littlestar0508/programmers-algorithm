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
const timeline = [];

answer.push(0);
answer.push(0);
timeline.push(0);
timeline.push(0);

for (let i = 2; i <= N; i++) {
  answer.push(answer[i - 1] + 1);
  timeline.push(i - 1);

  if (i % 3 === 0 && answer[i] > answer[i / 3] + 1) {
    answer[i] = answer[i / 3] + 1;
    timeline[i] = i / 3;
  }

  if (i % 2 === 0 && answer[i] > answer[i / 2] + 1) {
    answer[i] = answer[i / 2] + 1;
    timeline[i] = i / 2;
  }
}

console.log(answer[N]);

const output = [];
output.push(N);

for (let i = 0; i < answer[N]; i++) {
  const nextN = output[output.length - 1];
  output.push(timeline[nextN]);
}

console.log(output.join(" "));
