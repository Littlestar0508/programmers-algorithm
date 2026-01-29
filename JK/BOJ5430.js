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

const n = +input[0];
let answer = [];

for (let i = 1; i < input.length; i += 3) {
  let reverse = false;
  let error = false;
  const order = input[i];
  const length = input[i + 1];
  const arr = input[i + 2]
    .replace(/[\[\]]/g, "")
    .split(",")
    .map(Number);

  if (!+length) arr.pop();

  for (let j = 0; j < order.length; j++) {
    if (order.charAt(j) === "R") {
      reverse = !reverse;
    }

    if (order.charAt(j) === "D") {
      if (!arr.length) {
        answer.push("error");
        error = true;
        break;
      }
      if (reverse) arr.pop();
      if (!reverse) arr.shift();
    }
  }

  if (!error) {
    if (reverse) {
      const add = [...arr.reverse()];
      answer.push(add);
    } else {
      answer.push([...arr]);
    }
  }
}

console.log(answer.join("\n"));
