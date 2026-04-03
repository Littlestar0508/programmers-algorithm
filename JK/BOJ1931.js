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

const time = [];
let ans = 0;

for (let i = 1; i < input.length; i++) {
  time.push(input[i].split(" ").map(Number));
}

time.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

let tmp = 0;

for (let i = 0; i < time.length; i++) {
  if (tmp <= time[i][0]) {
    ans++;
    tmp = time[i][1];
  }
}

console.log(ans);
