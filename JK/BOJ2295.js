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
  .map(Number);

const N = input[0];

const arr = [];
for (let i = 1; i < input.length; i++) {
  arr.push(input[i]);
}

const set = new Set();

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    set.add(arr[i] + arr[j]);
  }
}

let ans = -1;

arr.sort((a, b) => a - b);
const setArr = new Array(...set).sort((a, b) => a - b);

for (let i = arr.length - 1; i > 0; i--) {
  for (let j = 0; j <= i; j++) {
    const k = arr[i];
    const z = arr[j];

    const target = k - z;

    let start = 0;
    let end = setArr.length - 1;

    while (start <= end) {
      let mid = Math.floor((start + end) / 2);

      if (target === setArr[mid]) {
        console.log(k);
        return;
      } else if (target < setArr[mid]) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
  }
}
