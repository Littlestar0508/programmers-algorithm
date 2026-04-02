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

let answer = [];

for (let i = 1; i < input.length; i++) {
  let [N, K] = input[i].split(" ");

  let n = BigInt(N);
  let k = BigInt(K);

  while (k > 0n && n > 0n) {
    n /= 2n;
    k--;
  }

  answer.push(((n + 1n) / 2n).toString());
}

console.log(answer.join("\n"));
