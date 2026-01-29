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

const arr = input[1].split(" ").map(Number);

const stack = [];
const ans = Array(+input[0]).fill(-1);

for (let i = 0; i < +input[0]; i++) {
  while (stack.length && arr[stack[stack.length - 1]] < arr[i]) {
    ans[stack.pop()] = arr[i];
  }
  stack.push(i);
}

console.log(ans.join(" "));
