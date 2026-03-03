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

const rgb = [];

for (let i = 1; i < input.length; i++) {
  rgb.push(input[i].split(" ").map(Number));
}

for (let i = 1; i < N; i++) {
  rgb[i][0] = Math.min(rgb[i - 1][1], rgb[i - 1][2]) + rgb[i][0];
  rgb[i][1] = Math.min(rgb[i - 1][0], rgb[i - 1][2]) + rgb[i][1];
  rgb[i][2] = Math.min(rgb[i - 1][0], rgb[i - 1][1]) + rgb[i][2];
}

console.log(Math.min(...rgb[rgb.length - 1]));
