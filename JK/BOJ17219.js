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

const [N, M] = input[0].split(" ").map(Number);

const map = new Map();

for (let i = 1; i < N + 1; i++) {
  const [key, value] = input[i].split(" ");

  map.set(key, value);
}

for (let i = N + 1; i < N + M + 1; i++) {
  const order = input[i];

  console.log(map.get(order));
}
