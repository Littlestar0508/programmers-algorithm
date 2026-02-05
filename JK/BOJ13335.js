const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim()
  .split(/\r?\n/);

const [n, w, L] = input[0].split(" ").map(Number);
const truck = input[1].split(" ").map(Number);

let time = 0;
let idx = 0;
let sum = 0;
let bridge = Array(w).fill(0);

while (idx < n) {
  time += 1;

  const out = bridge.shift();
  sum -= out;

  if (sum + truck[idx] <= L) {
    bridge.push(truck[idx]);
    sum += truck[idx];
    idx++;
  } else {
    bridge.push(0);
  }
}

console.log(time + w);
