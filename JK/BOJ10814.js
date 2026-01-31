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
  const [ageA] = a.split(" ");
  const [ageB] = b.split(" ");

  return +ageA - +ageB;
});

console.log(arr.join("\n"));
