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

const arr = [];

for (let i = 0; i < +input; i++) {
  arr.push(i + 1);
}

let idx = 0;

while (idx < arr.length - 1) {
  if (idx % 2 !== 0) {
    arr.push(arr[idx]);
  }

  idx++;
}

console.log(arr[idx]);
