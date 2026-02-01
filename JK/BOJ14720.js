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

const arr = input[1].split(" ").map(Number);

const milk = new Map();
let idx = 1;

for (let i = 0; i < arr.length; i++) {
  const cur = arr[i];

  if (milk.size === 0 && cur === 0) {
    milk.set(idx, cur);
    idx++;
  }

  if (milk.size > 0) {
    if (cur === 0 && milk.get(idx - 1) === 2) {
      milk.set(idx, cur);
      idx++;
    }

    if (cur === 1 && milk.get(idx - 1) === 0) {
      milk.set(idx, cur);
      idx++;
    }

    if (cur === 2 && milk.get(idx - 1) === 1) {
      milk.set(idx, cur);
      idx++;
    }
  }
}

console.log(milk.size);
