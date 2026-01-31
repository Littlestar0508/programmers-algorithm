const fs = require("fs");
const path = require("path");

let input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim();

const [n, ...arr] = input.split(/\r?\n/);

arr.sort((a, b) => {
  const [x1, y1] = a.split(" ").map(Number);
  const [x2, y2] = b.split(" ").map(Number);

  if (y1 === y2) return x1 - x2;
  else return y1 - y2;
});

console.log(arr.join("\n"));
