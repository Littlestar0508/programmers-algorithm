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

const [N, K] = input[0].split(" ").map(Number);

const moloco = [];
const company = [];
const diff = [];
let accept = 0;

for (let i = 1; i < input.length; i++) {
  const [a, b] = input[i].split(" ").map(Number);

  moloco.push(a);
  company.push(b);

  diff.push(a - b);

  if (a - b >= 0) accept++;
}

diff.sort((a, b) => Math.abs(a) - Math.abs(b));

if (accept >= K) console.log(0);
else {
  let cnt = K - accept;

  for (let i = 0; i < diff.length; i++) {
    if (diff[i] < 0) cnt--;
    if (cnt === 0) {
      console.log(Math.abs(diff[i]));
      break;
    }
  }
}
