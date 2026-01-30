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

const stack = [];
let answer = 0;
let sum = 1;
let chk = true;

for (let i = 0; i < input.length; i++) {
  const char = input[i];

  if (char === "(") {
    stack.push("(");
    sum *= 2;
  }

  if (char === "[") {
    stack.push("[");
    sum *= 3;
  }

  if (char === ")") {
    if (stack[stack.length - 1] !== "(") {
      chk = false;
      break;
    } else if (input.charAt(i - 1) === "(") {
      answer += sum;
    }

    stack.pop();
    sum /= 2;
  }

  if (char === "]") {
    if (stack[stack.length - 1] !== "[") {
      chk = false;
      break;
    } else if (input.charAt(i - 1) === "[") {
      answer += sum;
    }

    stack.pop();
    sum /= 3;
  }
}

if (!chk || stack.length !== 0) {
  console.log(0);
} else {
  console.log(answer);
}
