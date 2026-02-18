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

const lower = (array, target, start, end) => {
  let ans = -1;
  let mid = Math.floor((start + end) / 2);

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (array[mid] === target) {
      ans = mid;
      end = mid - 1;
    } else if (array[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return ans;
};

const upper = (array, target, start, end) => {
  let ans = -1;
  let mid = Math.floor((start + end) / 2);

  while (start <= end) {
    mid = Math.floor((start + end) / 2);

    if (target === array[mid]) {
      ans = mid;
      start = mid + 1;
    } else if (array[mid] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return ans;
};

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const M = Number(input[2]);
const targetArr = input[3].split(" ").map(Number);

let ans = [];

arr.sort((a, b) => a - b);

targetArr.forEach((e) => {
  const lowerIdx = lower(arr, e, 0, N - 1);
  const upperIdx = upper(arr, e, 0, N - 1);

  if (lowerIdx !== -1 && upperIdx !== -1) {
    ans.push(upperIdx - lowerIdx + 1);
  } else {
    ans.push(0);
  }
});

console.log(ans.join(" "));
