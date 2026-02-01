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

const n = Number(input[0]);
const bulb = input[1].split(" ").map(Number);
const student = Number(input[2]);

for (let i = 3; i < 3 + student; i++) {
  const [gender, num] = input[i].split(" ").map(Number);

  if (gender === 1) {
    for (let j = 1; j * num <= n; j++) {
      bulb[j * num - 1] = 1 - bulb[j * num - 1];
    }
  }

  if (gender === 2) {
    let start = num - 1;
    let end = num - 1;

    while (start - 1 >= 0 && end + 1 < n && bulb[start - 1] === bulb[end + 1]) {
      start--;
      end++;
    }

    for (let i = start; i <= end; i++) {
      bulb[i] = 1 - bulb[i];
    }
  }
}

let write = "";
for (let i = 0; i < n; i++) {
  write += bulb[i] + (i % 20 === 19 || i === n - 1 ? "\n" : " ");
}

console.log(write);
