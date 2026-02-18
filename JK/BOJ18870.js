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

const set = Array.from(new Set(arr)).sort((a, b) => a - b);

const binarySearch = (arr, target) => {
  let start = 0;
  let end = arr.length - 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] >= target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return start;
};

let ans = [];

arr.forEach((e) => {
  ans.push(binarySearch(set, e));
});

console.log(ans.join(" "));
