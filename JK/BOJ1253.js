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

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

let answer = 0;

arr.sort((a, b) => a - b);

for (let i = 0; i < arr.length; i++) {
  let start = i === 0 ? 1 : 0;
  let end = i === arr.length - 1 ? arr.length - 2 : arr.length - 1;

  while (start < end) {
    let sum = arr[start] + arr[end];

    if (sum === arr[i]) {
      answer++;
      break;
    }
    if (sum < arr[i]) {
      start++;
      if (start === i) start++;
    } else if (sum > arr[i]) {
      end--;
      if (end === i) end--;
    }
  }
}

console.log(answer);
