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

const [H, W] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let sum = 0;

for (let i = 1; i < W - 1; i++) {
  const left = [...arr.slice(0, i)];
  const right = [...arr.slice(i + 1, arr.length)];

  const leftMax = Math.max(...left);
  const rightMax = Math.max(...right);

  const wall = Math.min(leftMax, rightMax);

  if (wall > arr[i]) sum += wall - arr[i];
}

console.log(sum);
