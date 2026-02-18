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

const binarySearch = (array, target, start, end) => {
  let mid = 0;

  while (start <= end) {
    mid = Math.floor((start + end) / 2);
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
};

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const M = Number(input[2]);
const targetArr = input[3].split(" ").map(Number);

const ans = [];

arr.sort((a, b) => a - b);

targetArr.forEach((item, idx) => {
  if (binarySearch(arr, item, 0, N - 1) !== -1) {
    ans.push(1);
  } else {
    ans.push(0);
  }
});

console.log(ans.join("\n"));
