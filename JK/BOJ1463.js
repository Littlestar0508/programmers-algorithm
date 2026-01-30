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

input = +input;

const ans = [0, 0];

for (let i = 2; i <= input; i++) {
  ans.push(ans[i - 1] + 1);

  if (i % 3 === 0) {
    ans[i] = Math.min(ans[i], ans[i / 3] + 1);
  }

  if (i % 2 === 0) {
    ans[i] = Math.min(ans[i], ans[i / 2] + 1);
  }
}

console.log(ans[input]);
