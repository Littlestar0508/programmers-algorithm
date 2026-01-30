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
  .split(/\r?\n/)
  .map(Number);

const ans = [];

ans.push([0, 0]);
ans.push([input[1], 0]);
ans.push([input[2], input[1] + input[2]]);

for (let i = 3; i <= input[0]; i++) {
  const max1 = Math.max(ans[i - 2][0], ans[i - 2][1]) + input[i];
  const max2 = ans[i - 1][0] + input[i];

  ans.push([max1, max2]);
}

console.log(Math.max(ans[input[0]][0], ans[input[0]][1]));
