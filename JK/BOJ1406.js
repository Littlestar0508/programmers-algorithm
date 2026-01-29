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

const init = input[0];
const n = +input[1];

const left = init.split("");
const right = [];

for (let i = 2; i < 2 + n; i++) {
  const cmd = input[i];

  if (cmd === "L") {
    if (left.length) right.push(left.pop());
  } else if (cmd === "D") {
    if (right.length) left.push(right.pop());
  } else if (cmd === "B") {
    if (left.length) left.pop();
  } else {
    left.push(cmd[2]);
  }
}

console.log(left.join("") + right.reverse().join(""));
