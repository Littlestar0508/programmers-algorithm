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

const N = Number(input[0]);

const arr = [];

for (let i = 1; i < input.length; i++) {
  arr.push(input[i].split(" ").map(Number));
}

arr.push(arr[0]);

let sumX = 0;
let sumY = 0;

for (let i = 0; i < arr.length - 1; i++) {
  const curX = arr[i][0] * arr[i + 1][1];
  const curY = arr[i][1] * arr[i + 1][0];

  sumX += curX;
  sumY += curY;
}

console.log((Math.abs(sumX - sumY) / 2).toFixed(1));
