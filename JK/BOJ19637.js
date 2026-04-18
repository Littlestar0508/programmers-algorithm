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
const interval = Array(1000000000);
let idx = 1;

for (let i = 1; i < 1 + N; i++) {
  let [name, score] = input[i].split(" ");
  score = Number(score);
  if (interval[score] !== undefined) continue;
  for (let j = idx + 1; j <= Number(score); j++) {
    interval[j] = name;
  }

  idx = score;
}

interval[0] = input[1].split(" ")[0];

for (let i = 1 + N; i < input.length; i++) {
  console.log(interval[Number(input[i])]);
}
