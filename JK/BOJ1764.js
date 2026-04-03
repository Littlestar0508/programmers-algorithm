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

const comp = new Set();
const readSort = [];

for (let i = 1; i < N + 1; i++) {
  comp.add(input[i]);
}

for (let i = N + 1; i < input.length; i++) {
  if (comp.has(input[i])) readSort.push(input[i]);
}

readSort.sort((a, b) => a.localeCompare(b));

console.log(readSort.length);
console.log(readSort.join("\n"));
