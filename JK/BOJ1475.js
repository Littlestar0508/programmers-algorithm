const fs = require("fs");
const path = require("path");

const input = fs
  .readFileSync(
    process.platform === "linux"
      ? "/dev/stdin"
      : path.join(__dirname, "test.txt"),
  )
  .toString()
  .trim();

const arr = Array.from({ length: 10 }).fill(0);

for (let i = 0; i < input.length; i++) {
  const num = +(input.charCodeAt(i) - 48);

  if (num === 6 || num === 9) {
    arr[6]++;
  } else {
    arr[num]++;
  }
}

arr[6] = Math.ceil(arr[6] / 2);

arr.sort();

console.log(arr[arr.length - 1]);
