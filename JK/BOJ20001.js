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
  .split(/\r?\n/)
  .map((s) => s.trim());

let idx = 0;

for (let i = 0; i < input.length; i++) {
  const order = input[i];

  if (order === "고무오리 디버깅 끝") break;

  if (order === "문제") {
    idx++;
  }

  if (order === "고무오리") {
    if (idx === 0) idx += 2;
    else idx--;
  }
}

console.log(idx !== 0 ? "힝구" : "고무오리야 사랑해");
