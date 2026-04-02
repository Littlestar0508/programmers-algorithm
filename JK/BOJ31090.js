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

for (let i = 1; i < input.length; i++) {
  const N = Number(input[i]);

  const div = N % 100;
  if ((N + 1) % div === 0) console.log("Good");
  else console.log("Bye");
}
