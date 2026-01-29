const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim();

const arr = input.split(/\r?\n/).map(Number);

let max = -Infinity;
let index = -1;

for (const e of arr) {
  if (e > max) {
    max = e;
    index = arr.indexOf(e);
  }
}

console.log(max);
console.log(index + 1);
