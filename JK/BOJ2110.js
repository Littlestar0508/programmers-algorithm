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

const [N, C] = input[0].split(" ").map(Number);
const arr = [];
for (let i = 1; i < input.length; i++) {
  arr.push(Number(input[i]));
}

arr.sort((a, b) => a - b);

let start = 1;
let end = arr[arr.length - 1];

while (start <= end) {
  let mid = Math.floor((start + end) / 2);

  let count = 1;
  let prev = arr[0];

  for (const cur of arr) {
    if (cur - prev < mid) continue;
    prev = cur;
    count++;
  }

  if (count < C) end = mid - 1;
  else start = mid + 1;
}

console.log(end);
