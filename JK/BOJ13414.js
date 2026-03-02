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

const set = new Map();

for (let i = 1; i < input.length; i++) {
  if (set.has(input[i])) {
    set.delete(input[i]);
  }

  set.set(input[i]);
}

let idx = 0;
let answer = [];

set.forEach((_, key) => {
  if (idx < N) answer.push(key);
  idx++;
});

console.log(answer.join("\n"));
