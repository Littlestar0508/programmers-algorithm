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
  .split(/\r?\n/)
  .map(Number);

const [n, ...arr] = input;
const stack = [];
let idx = 0;
let elem = 1;
const answer = [];
let impossible = false;

while (idx < n) {
  const target = arr[idx];

  if (stack[stack.length - 1] === target) {
    stack.pop();
    answer.push("-");
    idx++;
  } else if (stack[stack.length - 1] !== target && elem <= n) {
    stack.push(elem);
    answer.push("+");
    elem++;
  } else {
    impossible = true;
    break;
  }
}

if (impossible) {
  console.log("NO");
} else {
  console.log(answer.join("\n"));
}
