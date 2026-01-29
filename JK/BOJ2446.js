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

const n = +input;

for (let i = n; i > 0; i--) {
  let str = "";
  for (let j = 0; j < n - i; j++) {
    str += " ";
  }

  for (let j = 0; j < 2 * i - 1; j++) {
    str += "*";
  }
  console.log(str);
}

for (let i = 2; i <= n; i++) {
  let str = "";

  for (let j = 0; j < n - i; j++) {
    str += " ";
  }

  for (let j = 0; j < 2 * i - 1; j++) {
    str += "*";
  }

  console.log(str);
}
